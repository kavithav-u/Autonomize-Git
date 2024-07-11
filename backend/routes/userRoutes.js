const express = require('express');
const router = express.Router();
const { addUser, searchUsers, softDeleteUserByUsername, updateUserFields, getAllUsersSorted } = require('../controller/userController');

// Add user
router.post('/add', addUser);

// Search users
router.get('/search', searchUsers);

// Soft delete user by username
router.delete('/delete/:username', softDeleteUserByUsername);

// Update user details
router.put('/update/:username', updateUserFields);

// Get all users sorted by specific fields
router.get('/all', getAllUsersSorted);

module.exports = router;
