(function () {
    "use strict";
   
    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function("return this")();

    /** Detect free variable `exports`. */
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;


    /**
     * 对arr中的每个对象调用funcName函数,并在每个对象都调用完成后调用cb
     * funcName一般是个异步函数
     * @param {Array<Object>} arr 每个对象都要包含叫做funcName的函数
     * @param {string} funcName 形如(finish)=>void的函数名称，内部调用finish表示函数执行完成
     * @param {()=>void} cb 回调函数
     */
    function waitGroupCallByName(arr, funcName, cb) {
        /*
        //大家一起进行选择
        let waitNum = arr.length;
        function finish() {
            waitNum--;
            if (waitNum <= 0) {
                cb();
            }
        }
        for (var i = 0, len = arr.length; i < len; ++i) {
            arr[i][funcName].call(arr[i], finish);

        }
        */

        /**
         * 每个人选完下一个人才能选
         */
        let len = arr.length;
        function next(idx){
            if(idx>=len){
                cb();
                return;
            }
            let obj = arr[idx];
            obj[funcName].call(obj,function(){
                next(idx+1);
            });
        }
        next(0);
        
    }

    /**
     * 对arr中的每个对象调用func函数,并在每个对象都调用完成后调用cb
     * func一般是个异步函数
     * @param {Array<Object>} arr 每个对象都要包含叫做funcName的函数
     * @param {(Object,finish)=>void} func 内部调用finish表示函数执行完成
     * @param {()=>void} cb 回调函数
     */
    function waitGroupCallByFunction(arr, func, cb) {
        /*
        let len = arr.length;
        let args = Array.prototype.splice.call(arguments,3);
        function next(idx){
            if(idx>=len){
                cb();
                return;
            }
            let obj = arr[idx];
            func.apply(null,[obj,function(){
                next(idx+1);
            }].concat(args));
        }
        next(0);
        */
       let len = arr.length;
        function next(idx){
            if(idx>=len){
                cb();
                return;
            }
            let obj = arr[idx];
            func(obj,function(){
                next(idx+1);
            });
        }
        next(0);
    }

    /**
     * 把时间转换成字符串
     * @param {string} 时间格式 hh:mm:ss:S
     * @param {Date} date 
     */
    function dateFormat(fmt, date) { 
        var o = {
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S+": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o){
            if(k == "S+"){
                if (new RegExp("(" + k + ")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1,  (("000" + o[k]).substr(("" + o[k]).length)));
                }
            }
            else{
                if (new RegExp("(" + k + ")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            
                
        }
            
        return fmt;
    }

    /**
     * 把字符串s补到长度num，如果s大于num则不会补充
     * @param {string} s 要补空格的字符串
     * @param {number} num 长度
     * @return 处理后的字符串
     */
    function fixSpace(s,num){
        var str = s;
        var len = num - s.length;
        for(var i=0;i<len;++i){
            str += " ";
        }
        return str;
    }

    var util = {
        waitGroupCallByName,
        waitGroupCallByFunction,
        dateFormat,
        fixSpace,
    };

    function addGlobal(name, obj) {
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
            // Expose Lodash on the global object to prevent errors when Lodash is
            // loaded by a script tag in the presence of an AMD loader.
            // See http://requirejs.org/docs/errors.html#mismatch for more details.
            // Use `_.noConflict` to remove Lodash from the global object.
            root[name] = obj;
            // Define as an anonymous module so, through path mapping, it can be
            // referenced as the "underscore" module.
            define(name, function () {
                return obj;
            });
        }
        // Check for `exports` after `define` in case a build optimizer adds it.
        else if (freeModule) {
            // Export for Node.js.
            (freeModule.exports = obj)[name] = obj;
            // Export for CommonJS support.
            freeExports[name] = obj;
            root[name] = obj;
        }
        else {
            // Export to the global object.
            root[name] = obj;
        }
    }

    
    addGlobal("util", util);
    addGlobal("addGlobal", addGlobal);
})();
