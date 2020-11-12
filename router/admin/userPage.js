const { User } = require('../../model/User');

module.exports = async (req, res) => {
    req.app.locals.activeIDE='user';

    // 接受客户端传递来的当前页面
    let page = req.query.page || 1;

    // 每一页显示的数据条数
    let pagesize = 10;

    // 查询用户数据的总数
    let count = await User.countDocuments();

    // 总页数
    let total = Math.ceil(count / pagesize);

    // 页码对应的数据查询的开始位置
    let start = (page - 1) * pagesize;

    // 将用户信息从数据库中查询出来
    let users = await User.find().limit(pagesize).skip(start);

    res.render('admin/user', { users, page, total });
};