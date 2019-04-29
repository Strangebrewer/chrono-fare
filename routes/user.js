import express from 'express';
const router = express.Router();
import { passport } from '../passport';
import userController from '../controllers/UserController';

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), userController.getCurrentUser)

router.post('/login', userController.login);

export default router;