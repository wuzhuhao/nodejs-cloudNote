var path = require('path');
var querystring = require('querystring');
var fs = require('fs');
async function route(handle, pathname, request, response) {
	// 获得客户端的Cookie
    var Cookies = {};
    request.headers.cookie && request.headers.cookie.split(';').forEach(function( Cookie ) {
	    var parts = Cookie.split('=');
	    Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
	});
	console.log("username："+Cookies.userName);
	var userName = Cookies['userName'];
	var name = Cookies['name'];
	//获取post数据
	var body;
	console.log("ggg："+"username=newCookie&"+querystring.stringify(body));
    if (typeof handle[pathname] === "function") {
		//testCooie=>login
		body= await initBody(request);
    	if (pathname=='/register'||pathname=='/login'||pathname=='/checkUsername') {
			var result = await handle[pathname](body);
			if (pathname=='/login') {
				if (result.result) {
					userName = result.userName;
					name = result.name;
				}else{
					userName = "";
					name = "";
				}
			}
			sendJson(response,result,result.userName,name);
		}else if (isEmpty(userName)) {
			getStatic(response,"/view/register.html");
		}else{
			//把cookie传送到后台
			body = querystring.parse("userName="+userName+"&"+querystring.stringify(body));
			// var body = initBody(request);
			var result = await handle[pathname](body);
    		sendJson(response,result,userName,name);
		}
    } else {
    	// if (isEmpty(userName)){
    	// 	getStatic(response,"/view/register.html");
    	// 	return;
    	// }
    	getStatic(response,pathname);
    }
}

async function initBody(request){
	return new Promise(function(resolve, reject) {
		var body1 = "";
		//每当接收到请求体数据，累加到post中
		request.on('data', function (chunk) {
			body1 += chunk;
			resolve(querystring.parse(body1));
		});
		setTimeout(function () {
			resolve(querystring.parse(body1));
		}, 3000);
		// resolve(querystring.parse(body1));
		// console.log("initBody："+body1);
		// body1 = 
		// return body1;
	});
}
// 'Set-Cookie': 'userName='+userName+";name1="+name
function sendJson(response,content,userName,name){
	var cookie1 = 'userName='+userName;
	var cookie2 = 'uname=123';
	console.log("ggg："+cookie1);
	console.log("ggg："+cookie2);
	response.setHeader('Set-Cookie', [ cookie1,  cookie2]);
	response.writeHead(200, {
	"Content-Type": "text/json",
		"Access-Control-Allow-Origin":"*"});
	// var content = await route(handle, pathname, body);
	response.write(JSON.stringify(content));
	response.end();
}

function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

function getStatic(response,staticPath){
	var filePath = path.join("./public", staticPath);
	console.log(filePath);
	fs.readFile(filePath, function(err, content){
		if(err){
			console.log("No request handler found for " + staticPath);
			response.writeHead(404, 'Not Found');
			response.end();
		}else{
			response.writeHead(200, 'Ok');
			response.write(content);
			response.end();
		}
	});
}

exports.route = route;