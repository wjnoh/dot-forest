const Post = require('../../models/post');

exports.write = (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
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
  Post.remove({ _id: req.params.post_id }, (error) => {
    if (error) return res.status(500).send(error);

    res.status(204).end();
  });
};