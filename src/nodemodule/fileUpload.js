var formidable = require('formidable');
var fs = require('fs');
util = require('util');

//生成唯一码
function generateUUid (){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function uploadRequest( req,res )
{
    console.info("转换图像");
    var promise = new Promise(function (resolve,reject) {
        var form =  new formidable.IncomingForm();
        form.uploadDir = "src/dist3//img";
        form.maxFieldsSize = 2 * 1024 * 1024;

        form.parse(req, function(err, fields, files) {
            var imgPath = files.file.path;
            var imageName = files.file.name;
            var data = fs.readFileSync(imgPath); // 同步读取文件
            fs.writeFile(imageName ,data,function(err){ // 存储文件
                if(err){ return console.log(err) }
                fs.writeFile('filelog.json',JSON.stringify(err),function (error) {
                    fs.writeFile('filelog1.json',JSON.stringify(fields),function (error) {
                        fs.writeFile('filelog2.json',JSON.stringify(files),function (error) {
                            var uuid = generateUUid();
                            console.info("重命名图像" + files.file.path);
                            fs.rename(files.file.path,"src\\dist3\\img\\"+uuid+".jpeg",function (error) {
                                resolve(uuid+".jpeg");
                            })
                        })
                    })
                })
            })
        })
    });
    return promise;
}

module.exports = uploadRequest;