//Schema only
//should this go into Thought model?
//see recording on 8-21-23 at 2:28; I don't think so
//const { Schema, model } = require("mongoose");

//below is based on assignments.js in mini project:
const { Schema, Types } = require("mongoose");
const { dateFormat } = require("../utils/dateFormat");

//reactionId below based on assignmentID in
//mini project
const reactionSchema = new Schema(
  {
    reactionId: {
      //use Mongoose's objectId data type
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
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
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//const Reaction = model("Reaction", reactionSchema);

//module.exports = Reaction;
module.exports = reactionSchema;
