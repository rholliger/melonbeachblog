var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mediaSchema = require('./media').mediaSchema;

var mediaElementSchema = new Schema({
  name: String,
  caption: String,
  mediaFile: mediaSchema
});

var articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  createdDate: {
    type: Date,
    'default': Date.now
  },
  publishDate: Date,
  author: String,
  // Category should be a separate collection, so we can search through it or display it in the frontend apart from getting the whole article
  // category: {
  //   type: String,
  //   'default': 'news'
  // },
  category: String,
  content: {
    type: String,
    required: true
  },
  mediaElement: mediaElementSchema
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;

// var newArticle = new Article({
//   title: 'Dies ist ein zweiter Testartikel',
//   slug: 'testartikel2',
//   author: 'Roy Holliger',
//   category: 'News',
//   content: 'Hallo neuer Artikel2',
//   mediaElement: {
//     name: 'Ein Bild2',
//     caption: 'Dies ist ein Bild2',
//     mediaFile: {
//       name: 'File1.jpg',
//       type: 'Image',
//       url: '/uploads/images/file1.jpg'
//     }
//   }
// });

// var firstArticle = new Article({ name: 'Erster Artikel' });

// newArticle.save(function(err, article) {
//   if (err) return console.error(err);
//   console.log(article);
// });