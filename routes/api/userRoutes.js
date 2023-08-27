const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

//README requirements:
//GET all users--DONE
//POST a new user--DONE
router.route("/").get(getUsers).post(createUser);

//README requirements:
//GET a singler user by _id--DONE
//not done yet: and populated thought and friend data; done in controller?
//PUT to update user by _id--DONE
//DELETE user by _id--DONE
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//README requirements:
//BONUS: remove a user's associated thoughts when user is deleted
/////////////////////////////////////////////////////////

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

//finish the requirements in the statement above:
//POST to add a new friend to a user's friend list--DONE
//DELETE to remove a friend from a user's friend list--DONE

module.exports = router;
