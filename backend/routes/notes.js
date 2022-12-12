const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get All the Notes using  POST "/api/notes/fetchallnotes" -  Require Login
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // fetch all notes with User ID
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2 : Add a new notes using POST "/api/notes/addnote" -  Require Login
router.post(
  "/addnote",
  fetchuser,
  [
    // Validator
    body("title", "Enter A valid name").isLength({ min: 3 }),
    body("description", "Description must be 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // JS Distructuring
      const { title, description, tag } = req.body;

      // If the error return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 : Update a existing notes using PUT "/api/notes/updatenote" -  Require Login
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  //Distruturing
  const { title, description, tag } = req.body;

  try {
    //Create A newNote Object
    const newNote = {};
    // Updating Note With Enter User The Update Details
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated and update it

    // Check the user it is this or someone else
    // req.params.id is - you pass the parameter /updatenote/ : id
    let note = await Note.findById(req.params.id);

    //Someone else then send the errro
    if (!note) {
      return error.status(404).send("NOT FOUND");
    }

    // this note and user check - note.user.toString (Note ki id)
    if (note.user.toString() !== req.user.id) {
      return error.status(401).send("Not Allowed");
    }

    // new:true New Content added - Update
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4 : Delete a existing notes using DELETE "/api/notes/deletenote" -  Require Login
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // find the note to be updated and update it

  // Check the user it is this or someone else
  // req.params.id is - you pass the parameter /updatenote/ : id
  //Someone else then send the errro

  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return error.status(404).send("NOT FOUND");
    }

    // this note and user check - note.user.toString (Note ki id)
    // ALlow deletion only if user own this note
    if (note.user.toString() !== req.user.id) {
      return error.status(401).send("Not Allowed");
    }

    // new:true New Content added - Update
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note Has Been Deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
