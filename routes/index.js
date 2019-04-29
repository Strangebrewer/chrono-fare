import path from 'path';
import express from 'express';
const router = express.Router();
import user_routes from './user';

router.use('/user', user_routes);

router.use(function (req, res) {
  if (process.env.NODE_ENV === 'production')
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

export default router;