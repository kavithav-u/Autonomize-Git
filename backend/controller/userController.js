// backend/controllers/userController.js
const User = require('../models/User')
const { fetchGitHubUser } = require('../Services/githubService')

const addUser = async (req, res) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
        const details = await fetchGitHubUser(username);
        user = new User({ username, details });
        await user.save();
    }
    res.json(user);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

async function findMutualFriends(userId) {
  try {

    const user = await User.findById(userId).exec();
    const followers = await User.find({ _id: { $in: user.followers } }).exec();

    // Find users that current user follows back
    const friends = followers.filter(follower => user.following.includes(follower._id));

    // Save friends to the current user's document
    user.friends = friends.map(friend => friend._id);
    await user.save();

    return friends;
  } catch (error) {
    console.error('Error finding mutual friends:', error);
    throw error; 
  }
}
async function searchUsers(username, location) {
    try {
      const query = {};
  
      if (username) {
        query.username = { $regex: username, $options: 'i' }; // Case-insensitive username search
      }
      if (location) {
        query.location = { $regex: location, $options: 'i' }; // Case-insensitive location search
      }
  
      const users = await User.find(query).exec();
      return users;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error; 
    }
  }
  
  async function softDeleteUserByUsername(username) {
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { $set: { deleted: true } },
        { new: true }
      ).exec();
  
      return user;
    } catch (error) {
      console.error('Error soft deleting user:', error);
      throw error; 
    }
  }
  
  async function updateUserFields(username, fieldsToUpdate) {
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { $set: fieldsToUpdate },
        { new: true }
      ).exec();
  
      return user;
    } catch (error) {
      console.error('Error updating user fields:', error);
      throw error; 
    }
  }
  
  async function getAllUsersSorted(sortBy) {
    try {
      const users = await User.find()
        .sort({ [sortBy]: -1 }) // Sort descending based on sortBy field
        .exec();
  
      return users;
    } catch (error) {
      console.error('Error fetching sorted users:', error);
      throw error;
    }
  }
  

module.exports = { addUser,
    getAllUsersSorted,
    updateUserFields,
    softDeleteUserByUsername,
    searchUsers,
    findMutualFriends
 };
