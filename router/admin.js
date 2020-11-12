const admin = require('express').Router();


// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));


// 实现登录功能
admin.post('/login', require('./admin/login'));


//  用户列表路由
admin.get('/user', require('./admin/userPage'));


//  用户页面  新增/修改 用户路由
admin.get('/user-edit', require('./admin/user-edit'));


//  用户页面  新增用户路由
admin.post('/user-edit', require('./admin/user-edit-fn'));


//  用户修改页面  修改功能路由
admin.post('/user-modify', require('./admin/user-modify'));


//  用户页面  删除用户路由  
admin.get('/delete', require('./admin/delete'));


// 用户页面 退出用户
admin.get('/login-out', require('./admin/login-out'));


// 文章列表路由
admin.get('/article', require('./admin/article'));


// 文章编辑页面 添加/修改文章路由 
admin.get('/article-edit', require('./admin/article-edit'));


// 文章编辑页面 添加文章功能路由
admin.post('/article-add', require('./admin/article-add'));


// 文章编辑页面 修改文章功能路由
admin.post('/article-modify', require('./admin/article-modify'));


// 文章列表页面 删除功能路由
admin.get('/article-delete', require('./admin/article-delete'));


module.exports = admin;