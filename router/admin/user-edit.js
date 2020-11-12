const { User } = require('../../model/User');

module.exports = async (req, res) => {
    const { id, message } = req.query;
    if (id) {
        let user = await User.findOne({ _id: id });
        res.render('admin/user-edit', {
        	message,
            user,
            link: '/admin/user-modify?id='+id,
            button: '修改'
        });
    } else {
        res.render('admin/user-edit', {
            message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }
};