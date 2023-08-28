//based off of postController.js in activity #21
//const { Thought, User } = require("../models");
const Thought = require("../models/Thought");
const reactionSchema = require("../models/Reaction");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id" });
      }

      res.json({
        thought,
        // thought,
        // reaction: await Reaction(req.params.thoughtId),
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //used videoControllers.js in activity #25 to help with one below:
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        //{ $addToSet: { thoughts: thought._id } },
        { $addToSet: { thoughts: req.body } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but no user found with that Id",
        });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that id exists." });
      }
      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //add a reaction to a thought
  //see recording on 8-21-23 at 2:27 for help with this
  async createReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that Id" });
      }

      res.json(thought);
      // res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with that Id found" });
      }
      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that Id" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
