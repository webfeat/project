var process = require('child_process');
var fs = require('fs');
var isNotIn = require('./WhiteList');
isNotIn = isNotIn();
function generateUUid (){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function writeToScript(url,type) {
    console.log("日志开始：" + url)
    var promise = new Promise(function (resolve,reject) {
        var imageUrl = 'src/dist3/img/'+ generateUUid();
        var settings = '';
        if(type === 'long' && isNotIn(url)){
            settings = 'page.settings = {resourceTimeout:2000};';
        }
        var script = `  var webPage = require('webpage');
            var page = webPage.create();
            page.zoomFactor = 1;
            ${settings}
            page.viewportSize =  { width: 1920, height: 1080 };
            page.open('${url}', function start(status,ddd) {
                console.log(status);
                page.render('${imageUrl}' + '.jpeg', {format: 'jpeg', quality: '1000'});
                phantom.exit();
            });`;

        fs.writeFile('src/nodemodule/PhantomPhoto.js',script,function (err) {
            console.log("写文件开始");
            if(err){
                reject('拒绝访问');
            }
            resolve(imageUrl + '.jpeg');
        })
    })
    return promise;

}

module.exports = {
    execShot:function (url,type) {
       var pros = new Promise(function (resolve,reject) {

           var promise = writeToScript(url,type);

           promise.then(function (data) {
               console.log("写文件结束");

               var temp = new Promise(function (res,rej) {
                   process.exec('phantomjs src/nodemodule/PhantomPhoto.js',function (error,stdout,stderr) {
                       fs.writeFile('log.json',JSON.stringify(error),function (error) {
                           fs.writeFile('log2.json',JSON.stringify(stdout),function (error) {
                               fs.writeFile('log3.json',JSON.stringify(stderr),function (error) {
                                   console.log('完成');
                                   res(data);
                               })
                           })
                       })
                   });
               });

               temp.then(function (data) {
                   resolve(data);
               })

           })


       }) 
        return pros;
    }
}