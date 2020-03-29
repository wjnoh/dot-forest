const express = require('express');
const router = express.Router();

const postRouter = require('./posts');
const userRouter = require('./users');

router.use('/posts', postRouter);
router.use('/users', userRouter);

module.exports = router;