namespace wlscript{

    /**
     * 树型结构的解析树
     * 根节点是个void函数
     * 按深度遍历执行树的每个分支
     * 
     */
    enum NodeType{
        /**
         * 每一个节点都能执行，并且用return返回结果
         */
        FunctionDeclaration,
        /**
         * 函数调用
         */
        FunctionExpression,
        /**
         * 定义一个变量和它的初始值（必须有初始值）
         */
        VariableDeclaration,
        /**
         * 变量获得
         */
        VariableExpression,
        /**
         * 赋值，左边必须是Variable，右边任意，Assign的结果值是自己的值
         */
        Assign,
        /**
         * 加法
         */
        Add,
        /**
         * 遍历，对象或者数字的话为从0到num-1
         */
        Each,
        /**
         * 循环
         */
        Loop,
        /**
         * 跳出遍历或循环
         */
        Break,
        /**
         * 条件
         */
        If,
        /**
         * 等于
         */
        Equal,
        /**
         * 大于
         */
        Greater,
        /**
         * 小于
         */
        Lesser,
        /**
         * 或
         */
        OR,
        /**
         * 并且
         */
        AND,
    }
    interface NodeObject{
        //[index:string]:ScriptObject;
        type:NodeType;
    }

    /**
     * 当前执行环境
     */
    interface Environment{
        parent:Environment;
    }

    /**
     * 顺序执行Array中的每个Node
     */
    interface FunctionDeclaration extends NodeObject{
        name:string;
        isGlobal:boolean;
        nodes:Array<NodeObject>;
    }

    /**
     * Function调用
     */
    interface FunctionExpression extends NodeObject{
        name:string;
        args:Array<NodeObject>;
    }

    /**
     * 变量声明
     */
    interface VariableDeclaration extends NodeObject{
        name:string;
        isGlobal:boolean;
    }

    /**
     * 变量获取
     */
    interface VariableExpression extends NodeObject{
        name:string;
    }

    /**
     * 变量赋值
     */
    interface Assign extends NodeObject{
        left:VariableExpression;
        right:NodeObject;
    }

    interface Add extends NodeObject{
        left:NodeObject;
        right:NodeObject;
    }

    interface Each extends NodeObject{
        node:NodeObject;
    }

    interface Loop extends NodeObject{
        node:NodeObject;
    }

    interface Break extends NodeObject{
    }

    interface If extends NodeObject{
        condition:NodeObject;
        ifbody:Array<NodeObject>;
        elsebody:Array<NodeObject>;
    }
   

    

    

    export function exec(obj:NodeObject){

    }

    interface GroupParam{
        /** 要分组的对象 */
        target:NodeObject;
        /** 根据属性名称分组 */
        name:string;
    }

    /**
     * 把对象按指定属性分组
     */
    export function group(param:GroupParam):NodeObject{
        return;
    }

    interface FilterParam{
        /** 要过滤的对象 */
        target:NodeObject;
        /** 过滤条件 */
        condition:ConditionParam;
    }

    /**
     * 过滤符合条件的对象
     */
    export function filter(param:FilterParam):NodeObject{
        return;
    }

    interface ConditionParam{

    }

    export function condition(param:ConditionParam):boolean{
        return true;
    }

    export function each():void{

    }

    export function loop():void{

    }

    export function ifstate():void{

    }

    export function count():number{
        return 0;
    }
}