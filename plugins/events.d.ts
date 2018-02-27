declare class EventEmitter   {
    static defaultMaxListeners: number;

    addListener(event: string | symbol, listener: (...args: any[]) => void): ()=>void;
    on(event: string | symbol, listener: (...args: any[]) => void): ()=>void;
    once(event: string | symbol, listener: (...args: any[]) => void): ()=>void;
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    emit(event: string | symbol, ...args: any[]): boolean;
    /**
     * 有回调函数的事件，调用on时的回调函数的第一个参数必须接受一个函数，并在事件处理完成后调用
     * 当所有事件的回调都处理完成后事件才算执行完毕
     * @param event 事件名
     * @param cb 事件处理完成后的回调
     * @param args 参数
     */
    emitCb(event: string | symbol,cb:()=>void, ...args: any[]): boolean;
    eventNames(): Array<string | symbol>;
    listenerCount(type: string | symbol): number;
}