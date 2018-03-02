namespace tbgame{
    interface InputEventCallback{
        events:FunctionMap;
        cb?:()=>void;
    }

    export class InputEventsStack{
        private _inputEventsStack:Array<InputEventCallback>;
        private _stackEventHandler:()=>void;
        private _curInputEventCallback:InputEventCallback;
        private _controller:Controller;
        constructor(controller:Controller){
            this._controller = controller;
            this._inputEventsStack = [];
        }

        private _useTopEvents(){
            let len = this._inputEventsStack.length;
            if(len<=0) {
                return;
            }
            let inputEventCallback = this._inputEventsStack[len-1];
            if(this._curInputEventCallback ===  inputEventCallback){
                log.w("重复使用最顶部的事件");
                return;
            }
            this._curInputEventCallback = inputEventCallback;
            this._stackEventHandler = this._controller.onEventsMap(inputEventCallback.events);
        }

        /**
         * 设置当前可以接收的输入事件
         * @param events 事件 
         * @param finish 这组事件被取消时会被调用的函数
         */
        push(events:FunctionMap,finish?:()=>void){
            if(this._stackEventHandler){
                this._stackEventHandler();
                this._stackEventHandler = null;
            }
            
            this._inputEventsStack.push({
                events:events,
                cb:finish,
            });
            this._useTopEvents();
            this._controller.enableInput();
            
            
        }
        /** 
         * 弹出当前输入事件，接受剩下的最顶端的事件
        */
        pop(){
            let inputEventCallback = this._inputEventsStack.pop();
            
            this._stackEventHandler();
            this._stackEventHandler = null;
            
            if(this._inputEventsStack.length<=0){
                this._controller.disableInput();
            }
            else{
                this._useTopEvents();
            }

            if(inputEventCallback.cb){
                inputEventCallback.cb();
            }
            
        }
    }
}