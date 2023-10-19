const express = require('express');
const { AuthenticatorJWT, isAdmin } = require('../middlewares/authenticator');
const { getAllUsers, getUserById, changePassword, resetPasswordLink, updatePassword, SignUp, Login, addUserByAdmin, deleteUser, updateUser, getAllSellers } = require('../controllers/userController');

const router = express.Router();

router.get('/get', AuthenticatorJWT, isAdmin, getAllUsers);
router.get('/sellers', AuthenticatorJWT, getAllSellers);
router.get('/get/:id', getUserById);
router.post('/signup', SignUp);
router.post('/admin/add-user', addUserByAdmin);
router.post('/login', Login);
router.put('/update', AuthenticatorJWT, updateUser);
router.post('/change/password', AuthenticatorJWT, changePassword);

router.post('/send/forgot-email', resetPasswordLink);
router.post('/update/password', updatePassword);

router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deleteUser);

module.exports = router;