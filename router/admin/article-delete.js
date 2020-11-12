const { Article } = require('../../model/Article');

module.exports = async (req, res) => {
    const { id } = req.query;
    await Article.findOneAndDelete({ _id: id });
    res.redirect('/admin/article');
};