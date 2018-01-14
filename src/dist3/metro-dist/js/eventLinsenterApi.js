$("#fileItem").css({'visibility':'hidden'});
//获取初始化数据
var initDatas = function () {
    return Storage.findAllBookMark();
}

//删除一个标签
var deleteImage = function (_self,src) {
    var temp = _self.parentNode.parentNode;
    openDialog();
    axios.get('/remove?src=' + src.split('/')[src.split('/').length-1]).then(function (da) {
        console.log(da);
        axios.get('/deleteByUUid?uuid='+temp.dataset.uuid).then(function (data) {
            if(data.data.statu == true){
                closeDialog();
                document.getElementById("box").removeChild(temp);
            }else{
                dialog.createWarnning("删除失败");
            }
        });
    }).catch(function (err) {
        console.log(error);
    })
}


//将数据转化为DOM
var insertInto = function (obj) {
    if(typeof  obj.src === 'object'){
        obj.uuid = obj.src['uuid'];
        obj.src = obj.src.src;
    }

    if(obj.src.indexOf('src') <= -1){
        obj.src = 'src'+ (obj.src.substring(0,obj.src.length - 5));
    }

    if(obj.src.indexOf('jpeg') <= -1){
        obj.src = obj.src + '.jpeg';
    }

    var html = `
          <div class="item" data-uuid="${obj.uuid}" data-name="${obj.name}">
                <span class="title">
                    <span class="icon-right" onclick="deleteImage(this,'${obj.src}','${obj.name}')">x</span>
                    <h4>${obj.name}</h4>
                </span>
                    <img src="${obj.src.substr(10,obj.src.length+1)}" style="max-height:13rem;min-width: 22rem "/>
            </div>
        `;
    $("#plus").before($(html));
}
var addRemark = function (url,name,src,filename) {
    axios.get('/addRemark?url=' + url + '&name=' + name + '&src=' + src  + '&fileName=' +filename).then(function (data) {
        closeDialog();
    })
    window.resizeFu();
    closeDialog();
}

//保存到配置文件中
var saveRemark = function (postUrl,url,name) {
    var promise = new Promise(function (reslove,reject) {
        axios.get(postUrl).then(function (response) {
            axios.get('/addRemark?url=' + url + '&name=' + name + '&src=' + response.data ).then(function (data) {
                    reslove(data);
            });
            window.resizeFu();
        })
    });
    return promise;
}
//提交填写的书签
var submitUrl = function () {

    if(!validate()){
       return;
    }
    openDialog();
    var url = $("#url").val();
    var type = $("#type").val()?$("#type").val():'df';
    var name = $("#name").val();
    var postUrl = 'bug?url=' + url;
    if(type == 'up'){//如果类型是上传则调用上传方法
        var promise = uploadFile();
        promise.then(function (data) {
            addRemark(url,name,data.data,data.data);
            insertInto({url:url,src:'/dist3/img/'+ data.data,name:name,uuid:data.data});
            window.resizeFu();
            closeDialog();
        });
    }else if(type == 'df'){//默认从服务器生成
        var promise = saveRemark(postUrl,url,name);
        promise.then(function (data) {
            insertInto({url:url,src:data.data,name:name,uuid:data.data});
            window.resizeFu();
            closeDialog();
        })
    }
}

var selectType = function (elem) {
    if(elem.value === 'up'){
        $("#fileItem").css({'visibility':'visible'});
    }else{
        $("#fileItem").css({'visibility':'hidden'});
    }
}

//打开弹出框
var openDialog = function () {
    metroDialog.open('#dialog');
    //20秒后自动关dialog
    setTimeout(function () {
        closeDialog();
    },60000)
}
//关闭弹出框
var closeDialog = function () {
    metroDialog.close('#dialog');
}
//建立dialog对象
var dialogFn = function (message,type) {
    return {
        createWarnning:function (message) {
            metroDialog.create({
                title: "警告",
                content: message,
                actions: [
                    {
                        title: "确认",
                        onclick: function(el){
                            $(el).data('dialog').close();
                        }
                    }
                ],
                options: { // dialog options
                    width:'10rem',
                    background:'#ce352c',
                    color:'#ffffff'
                }
            });
        },
        createInfo:function (message) {
            metroDialog.create({
                title: "信息",
                content: message,
                actions: [
                    {
                        title: "Ok",
                        onclick: function(el){
                            $(el).data('dialog').close();
                        }
                    }
                ],
                options: { // dialog options
                    with:'100px'
                }
            });
        }
    }
}

var dialog = dialogFn();


//数据校验部分
var validate = function () {
    var url = $("#url").val();
    var name = $("#name").val();
    var file = $("#file")[0].files;
    if(url == '' || url == null || url == undefined){
        dialog.createWarnning("url不能为空");
        return false;
    }else if(name === '' || name == null || name == undefined){
        dialog.createWarnning("名称不能为空");
        return false;
    }else if($("#type").val() == 'up' && file.length <= 0){
        dialog.createWarnning("请先上传图片");
        return false;
    }else if(file && file.length >= 1){
        if(file[0].type.indexOf('image/') <= -1){
            dialog.createWarnning("请先上传图片");
            return false;
        }
    }

    return true;
}

//初始化上传文件的方法
var uploadFile = function () {
    var formData = new FormData();
    formData.append("file",$("#file")[0].files[0]);
    var config = function () {
        return  {
            headers: {
                'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
            }
        };
    }

    var promise = new Promise(function (resolve,reject) {
        axios.post('/fileUpload',formData,config()).then(function (data) {
            resolve(data);
        }).catch(function (error) {
            console.log("err Info:" + error.toString());
        })
    });
    return promise;
}


//初始化任务
openDialog();
var promise = initDatas();
promise.then(function (data) {
    var datas = data.data;
    for(var i = 0 ; i < datas.length ;i++){
        datas[i].name = window.decodeURIComponent(datas[i].name);
        insertInto(datas[i]);
    }
    window.resizeFu();
    closeDialog();
})


