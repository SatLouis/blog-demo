const { Article } = require('../../model/Article');

module.exports = async (req, res, next) => {
    const { id, message } = req.query;
    if (id) {

        let article = await Article.findOne({ _id: id }).populate('author');
        article = JSON.parse(JSON.stringify(article));
        res.render('admin/article-edit', {
            message,
            article,
            button: '修改',
            link: '/admin/article-modify?id=' + id,
        });
        
    } else {
        res.render('admin/article-edit', {
            message,
            button: '提交',
            link: '/admin/article-add',
        });
    }
};