import express from "express"

import {protect} from '../middleware/authMiddleware.js'
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    defaultUser
} from '../controllers/userController.js';

const router = express.Router();
//  register user
router.post('/', registerUser)
//  login user
router.post('/auth', authUser)
// logout user
router.post('/logout', logoutUser)
router.route('/profile').get( protect, getUserProfile).put(protect,updateUserProfile)
router.post('/trial',defaultUser)


export default router