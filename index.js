//服务器端口
var PORT = 3000;

//模块引入
var http = require('http');
var url=require('url');
var fs=require('fs');
var mine = require('./config/main').types;
var path = require('path');
var bug = require('./src/nodemodule/bug');
var fileUpLoad = require('./src/nodemodule/fileUpload');
var configUtil = require('./src/nodemodule/configUtil');
var formidable = require('formidable');
//获取url参数：返回对象
var getParameter = function(url) {
    console.log(url);
    var reg  = /^((ht|f)tps?:)\/\/([\w-]+(\.[\w-]+)*\/){1}(([\w-]+(\.[\w-]+)*\/?)*)?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/;
    var obj = reg.exec(url);
    var params = {};
    var r = obj[9];
    if( !r ){
        return null;
    }else{
        var array = r.split('&');
        for(var i = 0 ; i < array.length;i++) {
            var b = array[i].split('=');
            params[b[0].toString()] = b[1];
        }
    }
    return params;
}

//处理url
var subUrlPipe = function (url) {
    //第一种：https://www.baidu.com/
    if(url.indexOf('https') >= 0 || url.indexOf('#') >=0 ){
        url = url.replace('https','http');
        return url;
    }

    //http://pi:port/url
    if(url.indexOf('http') >= 0 && url.indexOf('www') <0 ){
        return url;
    }

    //www.baidu.com
    if(url.indexOf('http') < 0 && url.indexOf('www') >= 0){
        url = 'http://' + url;
        return url;
    }
    return url;
}

//删除文件
var removeFile = function (name) {
    console.log("开始删除文件" + name);
    var promise = new Promise(function (resolv,reject) {
        fs.exists('src/dist3/img/' + name,function (exists) {
            if(exists){
                fs.unlink('src/dist3/img/' + name,function (data) {
                    resolv(data);
                })
            }else{
                reject("文件不存在");
            }
        })
    })
    return promise;
}


//建立服务器
var server = http.createServer(function (request, response) {
    //获取请求路径
    var pathname = url.parse(request.url).pathname;
    console.log("请求路径"+request.url);
    //如果与此路径匹配就执行
    if(pathname.indexOf('bug') > 0){
        //获取url参数
        var params = getParameter("http://127.0.0.1" + request.url);
        //获取快照的url
        var type = '';
        if(params.url.indexOf('https') >= 0){
            type = 'long';
        }
        posrtUrl = subUrlPipe(params.url);
        var promise = bug.execShot(posrtUrl,type);
        promise.then(function (data) {
            response.end(data);
        })
    }else if(pathname.indexOf('remove') >=0){//删除文件
        var params = getParameter("http://127.0.0.1" + request.url);
        console.log("参数");
        console.log(params);
        var pros = removeFile(params.src);
        pros.then(function (data) {
            console.log("删除文件成功");
            response.end("成功");
        }).catch(function (reson) {
            response.end(reson);
        })
    }else if(pathname.indexOf('fileUpload') >= 0){//文件上传
        var promise = fileUpLoad(request,response);
        promise.then(function (data) {
            response.end(data)
        });
    }else if(pathname.indexOf('addRemark') >= 0){
        var params = getParameter("http://127.0.0.1" + request.url);
        var pros = configUtil().saveToConfig(params);
        pros.then(function (data) {
            response.end(data);
        });
    }else if(pathname.indexOf('findAll') >= 0){
        var promise = configUtil().readFromConfig();
        promise.then(function (data) {
            response.end(data);
        });
    }else if(pathname.indexOf('deleteByUUid') >= 0){
        var params = getParameter("http://127.0.0.1" + request.url);
        var promise = configUtil().deleteByUUid(params.uuid);
        promise.then(function (data) {
            console.log(data);
            if(data.statu == true){
                    response.end(JSON.stringify({
                        message:"删除成功",
                        statu:true
                    }));
            }else{
                response.end(JSON.stringify({
                    message:"删除失败",
                    statu:false
                }));
            }
        })
    }else {
        //以src为web路径
        var realPath = path.join("src", pathname);
        console.log(realPath);
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        fs.exists(realPath, function (exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        response.end(err.toString());
                    } else {
                        var contentType = mine[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
        });
    }
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");

var mime = function (req) {
    var str = req.header['content-type']||'';
    console.log(req.header);
    return str.split('j')[0];
}

var handle = function (req,res) {
        var form = formidable.IncomingForm();
        form.parse(res,function (err,fields,files) {
            req.body = fields;
            req.files = files;
            console.log(files);
        });
}
