const express = require('express');
const router = express.Router();
const postRouter = require('./posts');

router.use('/posts', postRouter);

module.exports = router;