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
                constructor:Storage,
                init:function () {

                }
            }

            Storage.extend = Storage.fn.extend = function () {
                var options, name, src, copy, copyIsArray, clone,target = arguments[0] || {},
                    i = 1,length = arguments.length,deep = false;
                // Handle a deep copy situation
                // 如果一个参数是boolean型，可能是深度拷贝
                if ( typeof target === "boolean" ) {
                    deep = target;
                    target = arguments[1] || {};
                    // skip the boolean and the target
                    // 跳过boolean和target，从第3个开始
                    i = 2;
                }
                // Handle case when target is a string or something (possible in deep copy)
                // target不是对象也不是函数，则强制设置为空对象
                if ( typeof target !== "object" && !Storage.isFunction(target) ) {
                    target = {};
                }

                // extend Storage itself if only one argument is passed
                // 如果只传入一个参数，则认为是对Storage扩展
                if ( length === i ) {
                    target = this;
                    i--;
                }

                for ( ; i < length; i++ ) {
                    // Only deal with non-null/undefined values
                    // 只处理非空参数
                    if ( (options = arguments[ i ]) != null ) {
                        // Extend the base object
                        for ( name in options ) {
                            src = target[ name ];
                            copy = options[ name ];
                            // Prevent never-ending loop
                            // 避免循环引用
                            if ( target === copy ) {
                                continue;
                            }
                            // Recurse if we're merging plain objects or arrays
                            // 深度拷贝且值是纯对象或数组，则递归
                            if ( deep && copy && ( Storage.isPlainObject(copy) || (copyIsArray = Storage.isArray(copy)) ) ) {
                                // 如果copy是数组
                                if ( copyIsArray ) {
                                    copyIsArray = false;
                                    // clone为src的修正值
                                    clone = src && Storage.isArray(src) ? src : [];
                                    // 如果copy的是对象
                                } else {
                                    // clone为src的修正值
                                    clone = src && Storage.isPlainObject(src) ? src : {};
                                }
                                // Never move original objects, clone them
                                // 递归调用Storage.extend
                                target[ name ] = Storage.extend( deep, clone, copy );
                                // Don't bring in undefined values
                                // 不能拷贝空值
                            } else if ( copy !== undefined ) {
                                target[ name ] = copy;
                            }

                        }

                    }

                }
                return target;
            }

            Storage.extend({
                isArray:isArray,
                isPlainObject: isPlainObject
            });
            return Storage;
        }
    )()


    window.Storage = window.storage = Storage;

})()