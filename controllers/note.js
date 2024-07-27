const Note = require('../models/note');

exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      userId: req.user.id
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getNotes = async (req, res) => {
  try {
    // Determine filter conditions
    let filter = { userId: req.user.id };

    // Perform search if search query is provided
    let notes;
    notes = await Note.find(filter);

    // Retrieve the notes by their IDs and ensure they are unique
    const uniqueNoteIds = [...new Set(notes.map(note => note._id))];
    const uniqueNotes = await Note.find({ _id: { $in: uniqueNoteIds } });

    res.json(uniqueNotes);
  } catch (err) {
    res.status(500).send('Server error');
  }
};





exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).send('Note not found.');

    Object.assign(note, req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).send('Note not found.');

    await Note.findByIdAndDelete(req.params.id);
    res.send('Note permanently deleted.');
  } catch (err) {
    console.error('Error permanently deleting note:', err);
    res.status(500).send('Server error');
  }
};







