const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

//README requirements:
//GET all thoughts --DONE
//CREATE a new thought --DONE
//still to do: push the created thought's _id to the
//associated user's "thoughts" array field //done in controller?
//see example in README
router.route("/").get(getThoughts).post(createThought);

//README requirements:
//GET a single thought by its _id --DONE
//PUT update a thought by its _id --DONE
//DELETE a thought by its _id --DONE
router
  .route("/:userId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

/////////////////////////////////////////////////////////
//I think the one below is already in userRoutes.js
//router.route("/:userId/friends/:friendId").post().delete();

//finish the requirements in the statement above:
// - `POST` to add a new friend to a user's friend list
// - `DELETE` to remove a friend from a user's friend list

/////////////////////////////////////////////////////////////

router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);
//finish the requirements in the statement above:
//POST to create a reaction stored in a single thought's `reactions` array field --DONE?
//DELETE to pull and remove a reaction by the reaction's `reactionId` value --DONE?

module.exports = router;
