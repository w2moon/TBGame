namespace wlscript{
    interface ScriptObject{
        [index:string]:ScriptObject;
    }

   

    

    

    export function exec(obj:ScriptObject){

    }

    interface GroupParam{
        /** 要分组的对象 */
        target:ScriptObject;
        /** 根据属性名称分组 */
        name:string;
    }

    /**
     * 把对象按指定属性分组
     */
    export function group(param:GroupParam):ScriptObject{
        
    }

    interface FilterParam{
        /** 要过滤的对象 */
        target:ScriptObject;
        /** 过滤条件 */
        condition:ConditionParam;
    }

    /**
     * 过滤符合条件的对象
     */
    export function filter(param:FilterParam):ScriptObject{

    }

    interface ConditionParam{

    }

    export function filter(param:ConditionParam):boolean{

    }
}