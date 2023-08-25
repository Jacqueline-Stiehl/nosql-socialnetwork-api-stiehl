//Schema only
const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    //use Mongoose's objectId data type
    default: new ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
