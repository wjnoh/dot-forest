const Post = require('../../models/post');

// 이메일 인증 체크
exports.emailVerifyCheck = (req, res, next) => {
  if (!req.user.isEmailVerified) {
    return res.status(401).send({ message: '이메일 인증을 완료하세요.' });
  }

  next();
};

// 게시글 작성자 체크
exports.authorVerifyCheck = (req, res, next) => {
  Post.findOne({ _id: req.params.post_id }, (error, post) => {
    if (error) return res.status(500).send(error);
    if (!post) return res.status(400).send(error);
    
    if (req.user.nickName !== post.author) {
      return res.status(401).send({ message: '작성자가 아닙니다.' });
    }
    
    next();
  });
};

exports.write = (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.user.nickName,
  });

  post.save((error, post) => {
    if (error) return res.status(500).send(error);

    res.json(post);
  });
};

exports.list = (req, res) => {
  Post.find((error, posts) => {
    if (error) return res.status(500).send(error);

    res.json(posts);
  });
};

exports.read = (req, res) => {
  Post.findOne({ _id: req.params.post_id }, (error, post) => {
    if (error) return res.status(500).send(error);
    if (!post) return res.status(400).send(error);

    res.json(post);
  });
};

exports.update = (req, res) => {
  Post.findOne({ _id: req.params.post_id }, (error, post) => {
    if (error) return res.status(500).send(error);
    if (!post) return res.status(400).send(error);

    post.title = req.body.title;
    post.content = req.body.content;
    post.updatedDate = new Date();

    post.save((error) => {
      if (error) return res.status(500).send(error);
      res.json(post);
    });
  });
};

exports.remove = (req, res) => {
  Post.deleteOne({ _id: req.params.post_id }, (error) => {
    if (error) return res.status(500).send(error);

    res.status(204).end();
  });
};