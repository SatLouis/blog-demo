const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const joi = require('joi');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库中不重复
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true,
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0,
    }
});

const User = mongoose.model("User", userSchema);

// async function createUser() {
//     try {
//         // 生成随机字符串
//         // genSalt方法接受一个数值作为参数
//         // 数值越大 生成的随机字符串复杂度越高
//         // 数值越小 生成的随机字符串复杂度越低
//         // 默认值为10
//         // 返回生成的随机字符串
//         let salt = await bcrypt.genSalt(10);

//         // 对密码进行加密
//         // 参数1、要进行加密的明文
//         // 参数2、随机字符串
//         // 返回值是加密后的密码
//         let pass = await bcrypt.hash('123456', salt);

//         let user = await User.create({
//             username: 'dada',
//             email: '126244@qq.com',
//             password: pass,
//             role: 'admin',
//             state: 0,
//         });
//     } catch (e) {
//         console.log(e,e.message);
//     }

// }
// createUser();


function joiValidate(user) {
    const schema = {
        username: joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: joi.number().valid(0, 1).required().error(new Error('状态值非法   ')),
    };
    // 实施验证
    return joi.validate(user, schema);
}


module.exports = { User,joiValidate };