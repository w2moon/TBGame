(function(){
    var mapstrace = require('mapstrace');
   
    function info(err,module,args){
        mapstrace.build(err,false,function(items){
            var item = items[1] || items[0];
            var now = new Date();
            var str = "";
            str += " "+util.dateFormat("hh:mm:ss:S",now)+" ";
            str += module+": "+Array.prototype.slice.call(args).join(" ")+" ";
            str += " | "+item.source + " ("+item.line+","+item.column+") ";
            
            console.log(str);
        });
        
    }
    
    var log = {
    //    i:function(){
    //         info(new Error(),"INFO",arguments);
    //     },
        
    //     w:function(){
    //         info(new Error(),"WARN",arguments);
    //     },
    //     e:function(){
    //         info(new Error(),"ERROR",arguments);
    //     }
        i:console.info,
        w:console.warn,
        e:console.error,
    };
    addGlobal("log",log);
})();