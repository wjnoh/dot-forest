const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsCtrl = require('./postsCtrl');

router.post(
  '/',
  passport.authenticate('jwt',{ session:false }),
  postsCtrl.emailVerifyCheck,
  postsCtrl.write,
);
router.get(
  '/',
  postsCtrl.list,
);
router.get(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  postsCtrl.emailVerifyCheck,
  postsCtrl.read,
);
router.put(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  postsCtrl.emailVerifyCheck,
  postsCtrl.authorVerifyCheck,
  postsCtrl.update,
);
router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  postsCtrl.emailVerifyCheck,
  postsCtrl.authorVerifyCheck,
  postsCtrl.remove,
);

module.exports = router;