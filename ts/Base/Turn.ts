
namespace tbgame{
    
    /**
     * 回合
     */
    export class Turn extends Entity {
        curPlayer:Player;
        private _events:Array<string>;
        constructor(events:Array<string>){
            super();
            this._events = events;
            this.start = this.start.bind(this);
        }

        /**
         * 顺序触发所有_events，最后执行finish
         * @param idx event顺序id
         * @param finish 完成_events里所有事件后要执行的函数
         */
        private _doEvent(idx:number,finish:()=>void){
            if(idx >= this._events.length){
                finish();
                return;
            }
            let event = this._events[idx];
            log.i(this.curPlayer.name+event);
            this.curPlayer.emitCb(event,()=>{
                this._doEvent(idx+1,finish);
            });
        }

        start(player:Player,finish:()=>void,num:number){
            this.curPlayer = player;
            this._doEvent(0,finish);

        }
    }
}