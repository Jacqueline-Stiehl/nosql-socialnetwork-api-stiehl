//based off of mini project Assignment.js
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("/..utils/dateFormat");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    // **Schema Settings**: I think the above accomplishes this?
    // This will not be a model, but rather will be used as
    //the `reaction` field's subdocument schema in the
    //`Thought` model.
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

// **Schema Settings**:
// This will not be a model, but rather will be used as
//the `reaction` field's subdocument schema in the
//`Thought` model.

// Create a virtual called `reactionCount`
//that retrieves
//the length of the thought's
//`reactions` array field on query.
