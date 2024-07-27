const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,

} = require('../controllers/note');

router.post('/', auth, createNote);
router.get('/', auth, getNotes);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);


module.exports = router;