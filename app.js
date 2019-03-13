// 1. / index.html
// 2. 开放 public 目录中的静态资源
// 	  当请求 /public/xxx 的时候，响应读取 public 目录中的具体资源
// 3. /post post.html
// 4. /pinglun
// 		4.1 接受表单提交数据
// 		4.2 存储表单提交的数据
// 		4.3 让表单重定向到 /
// 		    statusCode
// 		    setHeader
		    
var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments = [
	{
		name: '张三',
		message: '今天天气不错',
		dateTime: '2019-03-13'
	},
	{
		name: '张三',
		message: '今天天气不错',
		dateTime: '2019-03-13'
	},
	{
		name: '张三',
		message: '今天天气不错',
		dateTime: '2019-03-13'
	},
	{
		name: '张三',
		message: '今天天气不错',
		dateTime: '2019-03-13'
	},
	{
		name: '张三',
		message: '今天天气不错',
		dateTime: '2019-03-13'
	}
]

// 时间函数
var getTime = function () {
	var d = new Date()
	var year = d.getFullYear()
	var month = d.getMonth() + 1
	var day = d.getDate()
	var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
	var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
	var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()

	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}


http.createServer(function (req, res) {
	var parseObj = url.parse(req.url,true)
	var pathname = parseObj.pathname
	if (pathname === '/') {
		fs.readFile('./views/index.html', function (err, data) {
			if (err) {
				return res.end('404 Not Found')
			}
			var htmlStr = template.render(data.toString(), {
				comments: comments
			})
			res.end(htmlStr)
		})
	} else if (pathname === '/post') {
		fs.readFile('./views/post.html', function (err, data) {
			if (err) {
				return res.end('404 Not Found')
			}
			res.end(data)
		})
	} else if (pathname.indexOf('/public/') === 0) {
		fs.readFile('.' + pathname, function (err, data) {	
			if (err) {
				return res.end('404 Not Found')
			}
			res.end(data)
		})
	} else if (pathname === '/pinglun') {
		var comment = parseObj.query
		comment.dateTime = getTime();
		comments.unshift(comment)

		res.statusCode = 302
		res.setHeader('Location', '/')
		res.end()
	} else {
		fs.readFile('./views/404.html', function (err, data) {
			if (err) {
				return res.end('404 Not Found')
			}
			res.end(data)
		})
	}
})
.listen(3000, function () {
	console.log('running...')
})


