const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const template = require('art-template');
const dateFormat = require('dateFormat');
const morgan = require('morgan');
const config = require('config');


// 创建网站服务器
const server = express();
server.listen(3000, () => console.log('server connect success'));

// 数据库连接
require('./model/connect');


// 处理post请求
server.use(bodyParser.urlencoded({ extended: false }))


// 配置session 其中{secret:'secret key'}是session的加密方式
server.use(session({
	// 设置session的加密方式
    secret: 'secret key',

    // 保存未设置初始化
    saveUninitialized: false,
    
    cookie: {
    	// 设置cookie的过期时间
        maxAge: 24 * 60 * 60 * 1000
    }
}));


// 当渲染后缀为art的模板时 设置所使用的模板引擎
server.engine('art', require('express-art-template'));
// 配置express框架模板所在位置
server.set('views', path.join(__dirname, 'template'));
// 配置express框架模板的默认后缀
server.set('view engine', 'art');


// 在模板默认值中导入变量
template.defaults.imports.dateFormat = dateFormat;


// 获取系统环境变量 返回值是对象
if (process.env.NODE_ENV === 'development') {
    console.log('开发环境');

    // 在开发环境中，将客户端发送到服务器的请求信息，打印到控制台中
    // server.use(morgan('dev'));

} else {
    console.log('生产环境');
}


// 开放静态资源文件
server.use(express.static(path.join(__dirname, 'public')));


// 拦截请求，判断用户登录状态
server.use('/admin', require('./middleware/loginState'));


// 引入路由模块
const home = require('./router/home');
const admin = require('./router/admin');


// 为路由匹配请求路径
server.use('/home', home);
server.use('/admin', admin);


// 错误中间件
server.use((err, req, res, next) => {
    if (typeof err === 'string' && (err.includes('{') || err.includes('['))) {
        // JSON.parse():将字符串对象转换为对象类型
        err = JSON.parse(err);
        let result = [];
        for (let prop in err) {
            if (prop != path) {
                result.push(prop + '=' + err[prop]);
            }
        }
        return res.redirect(`${err.path}?${result.join('&')}`);
    }
    res.send(err);
});