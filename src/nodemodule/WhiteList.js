var list = ['baidu','google'];
module.exports  = function () {

    return function isNoIn(str) {//不在里面吗？
        for (var i = 0 ;i < list.length ;i++){
            if(str.indexOf(list[i]) >= 0){
                return false;
            }
        }
        return true;
    }
}