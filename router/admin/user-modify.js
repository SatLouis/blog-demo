const { User } = require('../../model/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {

	// 接收客户端传递过来的请求参数
    const { username, age, role, state, email, password } = req.body;
    // 用户的id
    const { id } = req.query;

    // 根据id查询的用户信息
    let result = await User.findOne({ _id: id });

    // 密码比对
    const isValid = await bcrypt.compare(password, result.password);
    // 密码比对成功
    if (isValid) {
    	// 将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username,
            age,
            role,
            state,
            email
        });
        res.redirect('/admin/user');
    } else {
    	// 密码比对失败
        let obj = {
            path: '/admin/user-edit',
            message: '密码错误',
            id,
        };
        next(JSON.stringify(obj));
    }
}