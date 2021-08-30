import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdDate: {
      type: String,
      default: new Date().toISOString(),
    },
  },
  { versionKey: false }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
