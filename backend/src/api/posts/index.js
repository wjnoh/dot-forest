const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsCtrl = require('./postsCtrl');

router.post(
  '/',
  passport.authenticate('jwt', { session:false }),
  postsCtrl.checkEmailVerification,
  postsCtrl.write,
);
router.get(
  '/',
  postsCtrl.list,
);
router.get(
  '/:post_id',
  postsCtrl.checkObjectId,
  passport.authenticate('jwt', { session: false }),
  postsCtrl.checkEmailVerification,
  postsCtrl.read,
);
router.put(
  '/:post_id',
  postsCtrl.checkObjectId,
  passport.authenticate('jwt', { session: false }),
  postsCtrl.checkEmailVerification,
  postsCtrl.checkAuthor,
  postsCtrl.update,
);
router.delete(
  '/:post_id',
  postsCtrl.checkObjectId,
  passport.authenticate('jwt', { session: false }),
  postsCtrl.checkEmailVerification,
  postsCtrl.checkAuthor,
  postsCtrl.remove,
);
router.post(
  '/comments/:post_id',
  postsCtrl.checkObjectId,
  passport.authenticate('jwt', { session: false }),
  postsCtrl.checkEmailVerification,
  postsCtrl.writeComment,
);

module.exports = router;