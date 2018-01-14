var md5 = require('md5');
var uuid = require('uuid/v5');
var webPage = require('webpage');
var page = webPage.create();
var ajax = require('axios');
page.viewportSize = { width: 1920, height: 1080 };

module.exports = {
    //删除书签
    deleteBookMark  : function (bookMark) {
        localStorage.removeItem(bookMark.uid);
    }
    ,
    //新增书签
    saveBookMark : function (bookMark) {
        var uid = uuid(bookMark.url,uuid.url);
        bookMark.uid = uid;
        var value = Json.stringify(bookMark)
        localStorage.setItem(uid,value)
    }
    ,
    updateBookMark : function (bookMark) {
        var value = Json.stringify(bookMark)
        localStorage.setItem(bookMark.uid,value);
    }

    //从服务器上读取出书签配置
    , readBookMarkFromService : function () {
        var promise = new Promise(resolve ,reject);
        ajax.get('../assets/system.json').then(function (data) {
            resolve(data);
        }).catch(function (error) {
            reject(error);
        })
        return promise;
    }

    //从本地localstorag读取除书签配置
    , readBoolMarkFromLocastorage : function () {
        var items = Array.from(localStorage);
        var list = [];
        for(var bookmark of items){
            list.push(JSON.parse(bookmark));
        }
        return list;
    }

//获取书签快照
    , getSnapshot : function (url) {
        page.open("url", function start(status) {
            page.render('google_home.jpeg', {format: 'jpeg', quality: '100'});
            phantom.exit();
        });
    }
}










