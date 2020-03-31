const { ObjectId } = require('mongoose').Types;
const Post = require('../../models/post');

// 유효한 post_id인지 체크
exports.checkObjectId = (req, res, next) => {
  const { post_id } = req.params;

  if (!ObjectId.isValid(post_id)) {
    return res.status(400).send({ message: '게시물을 찾을 수 없습니다.' });
  }

  next();
};

// 이메일 인증 체크
exports.checkEmailVerification = (req, res, next) => {
  const { isEmailVerified } = req.user;

  if (!isEmailVerified) {
    return res.status(401).send({ message: '이메일 인증을 완료하세요.' });
  }

  next();
};

// 게시글 작성자 체크
exports.checkAuthor = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const post = await Post.findOne({ _id: req.params.post_id });
    
    if (!_id.equals(post.authorId)) {
      return res.status(401).send({ message: '작성자가 아닙니다.' });
    }
  } catch (error) {
    return res.status(500).send(error);
  }

  next();
};

// 게시글 작성
exports.write = async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.user.nickName,
    authorId: req.user._id,
  });

  try {
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// 게시글 목록 불러오기
exports.list = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const posts = await Post.paginate({}, { page, limit });
    res.json(posts);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// 게시글 내용 불러오기
exports.read = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id });
    res.json(post);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// 게시글 수정
exports.update = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id });

    post.title = req.body.title;
    post.content = req.body.content;
    post.updatedDate = new Date();

    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// 게시글 삭제
exports.remove = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.post_id });
    res.status(204).end();
  } catch (error) {
    return res.status(500).send(error);
  }
};