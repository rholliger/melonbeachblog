module.exports.showHomepage = function(req, res) {
    res.render('index', { title: 'MelonBeach Blog' });
}