declare namespace util{
    export function waitGroupCallByName(arr:Array<any>,funcName:string,cb:()=>void):void;
    export function waitGroupCallByFunction(arr:Array<any>,func:(obj:any,finish:()=>void,...optionalParams: any[])=>void,cb:()=>void,...optionalParams: any[]):void;
    export function waitCallNum(num:number,func:(finish:()=>void)=>void,cb:()=>void):void;
    export function dateFormat(fmt:string, date:Date):string;
    export function fixSpace(s:string,num:number):string;
    export function wait(time:number,cb:()=>void):()=>void;
    export class QueueFunction{
        add(cb:(finish:()=>void)=>void):void;
    }
}
