declare namespace util{
    export function waitGroupCallByName(arr:Array<any>,funcName:string,cb:()=>void):void;
    export function waitGroupCallByFunction(arr:Array<any>,func:(obj:any,finish:()=>void,...optionalParams: any[])=>void,cb:()=>void,...optionalParams: any[]):void;
    export function dateFormat(fmt:string, date:Date):string;
}
