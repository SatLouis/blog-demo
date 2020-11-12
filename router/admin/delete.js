const { User } = require('../../model/User');

module.exports = async (req, res) => {
    const { id } = req.query;
    await User.findOneAndDelete({ _id: id });
    res.redirect('/admin/user');
};