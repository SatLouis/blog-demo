const { Article } = require('../../model/Article');
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
	// 标识：当前访问的是文章管理页面
    req.app.locals.activeIDE = 'article';

    const { page } = req.query;

    // page:指定当前页
    // suze:指定每页的显示数据条数
    // display:指定客户端要显示的页码数量
    // exec:向数据库中发送查询请求
    // 查询所有的文章数据
    let articles = await pagination(Article).find().page(page).size(5).display(3).populate('author').exec();
    // 注
    articles = JSON.parse(JSON.stringify(articles));
    res.render('admin/article', { articles });


};