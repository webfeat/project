(function (Window,undefined) {

    var Storage = (function () {

            var isArray = function () {
                return Object.prototype.toString.call(o)=='[object Array]';
            }

            var isFunction = function (fn) {
                return typeof fn == 'funciton';
            }

            var isPlainObject =function( obj ) {
                var key;
                if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
                    return false;
                }

                if ( obj.constructor &&
                    !hasOwn.call( obj, "constructor" ) &&
                    !hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
                    return false;
                }

                for ( key in obj ) {}

                return key === undefined || hasOwn.call( obj, key );
            }

            var Storage  = function () {
                return new Storage.fn.init();
            }

            Storage.fn = Storage.property = {
                constructor: Storage,
                init: function () {

                }
            }

            Storage.extend = Storage.fn.extend = function () {
                var options, name, src, copy, copyIsArray, clone,target = arguments[0] || {},
                    i = 1,length = arguments.length,deep = false;
                if ( typeof target === "boolean" ) {
                    deep = target;
                    target = arguments[1] || {};
                    i = 2;
                }
                if ( typeof target !== "object" && !Storage.isFunction(target) ) {
                    target = {};
                }

                if ( length === i ) {
                    target = this;
                    i--;
                }

                for ( ; i < length; i++ ) {
                    if ( (options = arguments[ i ]) != null ) {
                        for ( name in options ) {
                            src = target[ name ];
                            copy = options[ name ];
                            if ( target === copy ) {
                                continue;
                            }
                            if ( deep && copy && ( Storage.isPlainObject(copy) || (copyIsArray = Storage.isArray(copy)) ) ) {
                                if ( copyIsArray ) {
                                    copyIsArray = false;
                                    clone = src && Storage.isArray(src) ? src : [];
                                } else {
                                    clone = src && Storage.isPlainObject(src) ? src : {};
                                }
                                target[ name ] = Storage.extend( deep, clone, copy );
                            } else if ( copy !== undefined ) {
                                target[ name ] = copy;
                            }
                        }
                    }
                }
                return target;
            }

            Storage.extend({
                expando: "storage" + ( '1.2' + Math.random() ).replace( /\D/g, "" ),
                isReady: true,
                error: function( msg ) {
                    throw new Error( msg );
                },
                noop: function() {},
                isArray:isArray,
                isPlainObject: isPlainObject
            });

            /******************************开始构建存储对象*****************************/
            //生产UUid
            function generateUUid (){
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
            }

            //查找所有的书签
            function findAllBookMark() {
                var promise = new Promise(function (resolve,reject) {
                    axios.get('/findAll').then(function (data) {
                        resolve(data);
                    });
                })
                return promise;
            }

            //新增一条书签
            function insertNew(obj) {
                try{
                    var uuid = generateUUid();
                    obj.uuid = uuid;
                    var result = toJsonStr(obj);
                    localStorage.setItem(uuid,result);
                }catch (e){
                    console.error("新增失败：-----" + e);
                }
            }

            //修改一条书签
            function updateNew(obj) {
                try{
                    var uuid = obj.uuid;
                    var result = toJsonStr(obj);
                    localStorage.setItem(uuid,result);
                }catch (e){
                    console.error("新增失败：-----" + e);
                }
            }

            //删除一条书签
            function deleteBookMark(uuid) {

            }

            //obj to jsonStr
            function toJsonStr(obj) {
                return JSON.stringify(obj)
            }

            //str to Obj
            function toJsonObj(str) {
                if(str == undefined){
                    return null;
                }
                return JSON.parse(str);
            }

            //扩展方法
            function extendFn(obj) {
                for(var name in obj){
                    Storage[name] = Storage.fn[name] = obj[name];
                }
            }

            Storage.extendFn = Storage.fn.extendFn = extendFn;

            var fns = {
                generateUUid:generateUUid,
                findAllBookMark:findAllBookMark,
                insertNew:insertNew,
                updateNew:updateNew,
                deleteBookMark:deleteBookMark
            }
            Storage.extendFn(fns);

            return Storage;
        }
    )()


    window.Storage = window.storage = Storage;

})()