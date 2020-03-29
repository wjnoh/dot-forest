const express = require('express');
const router = express.Router();
const postsCtrl = require('./postsCtrl');

router.post('/', postsCtrl.write);
router.get('/', postsCtrl.list);
router.get('/:post_id', postsCtrl.read);
router.put('/:post_id', postsCtrl.update);
router.delete('/:post_id', postsCtrl.remove);

module.exports = router;