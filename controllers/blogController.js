const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let blogs = require('../data.json');

const blog_index = (req, res) => {
  res.render('index', { pageTitle: 'Blogs', blogs });
};

const blog_details = (req, res) => {
  const singlePost = blogs.find((blog) => blog.id === req.params.id);
  res.render('details', { pageTitle: singlePost.title, singlePost });
};

const blog_create = (req, res) => {
  res.render('create', { pageTitle: 'New Post' });
};

const blog_create_post = (req, res) => {
  if (req.body) {
    const id = uuidv4();
    const post = { ...req.body, id };
    blogs.push(post);

    fs.writeFile('data.json', JSON.stringify(blogs), (err) => {
      if (err) {
        alert(err);
      }
      console.log('new post added to json');
    });

    res.redirect('/');
  }
};

const blog_delete = (req, res) => {
  const newBlogs = blogs.filter((post) => post.id !== req.params.id);
  blogs = newBlogs;

  fs.writeFile('data.json', JSON.stringify(blogs), (err) => {
    if (err) {
      alert(err);
    }
    console.log('post deleted from json');
  });

  res.json({ redirect: '/' });
};

const blog_edit = (req, res) => {
  const singlePost = req.body;

  const newBlogs = blogs.map((post) =>
    post.id === req.params.id ? { ...singlePost } : post
  );
  blogs = newBlogs;

  fs.writeFile('data.json', JSON.stringify(blogs), (err) => {
    if (err) {
      alert(err);
    }
    console.log('post edited in json');
  });

  res.json({ message: 'post updated' });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create,
  blog_create_post,
  blog_delete,
  blog_edit,
};
