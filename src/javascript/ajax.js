function getXHR(){
    var xhr = null;
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("您的浏览器暂不支持Ajax!");
            }
        }
    }
    return xhr;
}


module.exports =  ajax = function(ajaxObj){
    var url = ajaxObj.url;
    var method = ajaxObj.method;
    var ContentType = ajaxObj.type;
    var xhr = getXHR();
    var sucb = ajaxObj.successCallback;
    var ercb = ajaxObj.errorCallback;

    xhr.setRequestHeader('Content-type',type?type:'txt');
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){//如果等于4，那么整个请求完成
            var result = xhr.responseText;//获取返回结果
            sucb(result);
        }else if(xhr.readyState == 1){
            console.log("正在初始化请求!");
        }else if(xhr.readyState == 2){
            console.log("准备发送")
        }else if(xhr.readyState == 3){
            console.log("数据发送中");
        }
    }

    xhr.timeout = function () {
        console.error("请求超时");
    }
    xhr.onloadstart = function(){
        console.log('onloadStart');
    }
    xhr.onload = function(){
        console.log('onload');
    }

    xhr.open(method, url, true);
    xhr.setRequestHeader('Cache-Control',3600);
    xhr.send();
}