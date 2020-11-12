const { Article } = require('../../model/Article');
const formidable = require('formidable');
const path = require('path');

module.exports = (req, res, next) => {
    // 1、创建表单解析对象
    const form = new formidable.IncomingForm();

    // 2、配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../../public/uploadDir');

    // 3、保留上传文件的后缀
    form.keepExtensions = true;

    // 4、解析表单
    form.parse(req, async (err, fields, files) => {
        // 1. err错误对象
        // 2. fields 对象类型保存了普通的表单数据
        // 3. 对象类型 保存了和上传文件相关的数据
        if (!err) {
            const { title, author, content, publishDate } = fields;

            try {
                if (title.length === 0) {
                    throw new Error('标题不能为空');
                };
                await Article.updateOne({ _id: req.query.id }, {
                    title,
                    content,
                    publishDate,
                    cover: files.cover.path.split('public')[1],
                });
                res.redirect('/admin/article');
            } catch (e) {
                let obj = {
                    path: '/admin/article-edit',
                    message: e.message,
                };
                next(JSON.stringify(obj));
            }

        } else {
            console.log(err);
        }

    });
};