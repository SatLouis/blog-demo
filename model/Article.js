const mongoose = require('mongoose');


// 创建文章集合
const articleSchema =new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 50,
        trim:true,
        required: [true, '请填写文章标题'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim:true,
        required: [true, '请传递作者'],
    },
    publishDate: {
        type: Date,
        default: Date.now,
    },
    cover: {
        type: String,
        default: null,
    },
    content: String
});


// 根据规则创建集合构成函数
const Article = mongoose.model('Article', articleSchema);

module.exports = {
    Article
};