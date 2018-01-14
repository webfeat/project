var fs = require('fs');

//生成唯一码
function generateUUid (){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

var readFromConfig = function () {
    var promise = new Promise(function (resolve,reject) {
        fs.readFile('E:\\毕业设计\\project\\src\\nodemodule\\config\\config.json',function (err, data) {
            resolve(data);
        })
    })
    return promise;
}

var saveConfig = function (datas) {
    var promise = new Promise(function (resolve,reject) {
        var tempStr = JSON.stringify(datas);
        fs.writeFile('src/nodemodule/config/config.json',tempStr ,{encoding: 'utf8'}, function (err) {
            console.log("配置保存成功");
            resolve({
                state:'成功'
            });
        });
    })
    return promise;
}

var obj = {

    //从配置文件中读取
    readFromConfig :readFromConfig,
    saveToConfig:function (obj) {
        console.info("开始保存配置");
        var promise1 = new Promise(function (res,rej) {
            obj = obj ?obj:{};
            if(obj.fileName){//上传时的uuid
                obj['uuid'] = obj.fileName.substr(0,'65654851-a5cc-4659-814d-f161a9053f00'.length);
                obj.src = 'src/dist3/img/' + obj.src;
            }else{
                obj['uuid'] = generateUUid();
            }
            var pro = readFromConfig();
            pro.then(function (str) {
                var items = [];
                console.log(str);
                if(str){
                    items = JSON.parse(str);
                }
                items.push(obj)
                var tempstr = JSON.stringify(items);
                console.log("保存的配置：" + tempstr);
                fs.writeFile('src/nodemodule/config/config.json',tempstr ,{encoding: 'utf8'}, function (err) {
                    console.log(obj.src);
                    res(JSON.stringify({src:obj.src,uuid:obj.uuid}));
                });
            })
        });
        return promise1;
    },
    deleteByUUid:function (uuid) {
        //删除配置中的东西
        console.log("删除配置开始");
        var pros = new Promise(function (resolve,reject) {
            console.log("读取配置开始");
            var promise = readFromConfig();
            promise.then(function (data) {
                console.log("读取配置完成");

                var datas = JSON.parse(data);
                var temp = {};
                console.log("删除前"+ uuid);
                console.log(datas);
                for(var i = 0 ; i < datas.length ;i++){
                    console.log(datas[i].uuid+ ":" + uuid);
                    if(datas[i].uuid == uuid.substring(0,'706d3690-72a1-4cf4-8726-ca6174fbcb5f'.length)){
                        console.log("相等");
                        datas.splice(i,1);
                    }
                }
                console.log("删除后");
                console.log(datas);
               var def = saveConfig(datas);
                def.then(function (data) {
                    resolve({statu:true,name:uuid+".jpeg"});
                });
            })
        })
        return pros;
    },
    saveConfig : saveConfig
}

module.exports = function () {
    return obj;
};