

namespace tbgame {
    const MAX_CHOOSE_CARD_NUM = 10;

    export enum ControllerEvent{
        ChooseCard1 = "ChooseCard1",
        ChooseCard2 = "ChooseCard2",
        ChooseCard3 = "ChooseCard3",
        ChooseCard4 = "ChooseCard4",
        ChooseCard5 = "ChooseCard5",
        ChooseCard6 = "ChooseCard6",
        ChooseCard7 = "ChooseCard7",
        ChooseCard8 = "ChooseCard8",
        ChooseCard9 = "ChooseCard9",
        ChooseCard10 = "ChooseCard10",
        Confirm = "Confirm",
        Deck = "Deck",
        Grave = "Grave",
        Back = "Back",

    }

    function indexToControllerEvent(idx:number):any{
        let num = idx+1;
        return "ChooseCard"+num;
    }

   

    export interface EventKeys{
        [index:string]:Array<string|number>;
    }

    
    /**
     * 控制器
     */
    export class Controller extends Entity {
        player:Player;
        protected _eventKeys:EventKeys;
        private _keyEventMap:any;
        constructor(){
            super();
        }

        initEventKeys(eventKeys:EventKeys):void{
            this._eventKeys = eventKeys;

            this._updateKeyEventMap();
        }
        private _updateKeyEventMap(){
            let keyEventMap:any = {};
            
            for(let event in this._eventKeys){
                let keys = this._eventKeys[event];
                for(let i=0,len=keys.length;i<len;++i){
                    let key = keys[i];
                    if(keyEventMap[key]){
                        log.e("重复的按键定义,只有最后一个按键绑定生效，按键"+key+"已经绑定了事件"+keyEventMap[key]+"又请求绑定"+event);
                    }
                    keyEventMap[key] = event;
                }
            }

            this._keyEventMap = keyEventMap;
        }

        protected _registeChooseCardEvent(events:FunctionMap,func:(idx:number)=>void){
            events[ControllerEvent.ChooseCard1] = ()=> func(1);
            events[ControllerEvent.ChooseCard2] = ()=> func(2);
            events[ControllerEvent.ChooseCard3] = ()=> func(3);
            events[ControllerEvent.ChooseCard4] = ()=> func(4);
            events[ControllerEvent.ChooseCard5] = ()=> func(5);
            events[ControllerEvent.ChooseCard6] = ()=> func(6);
            events[ControllerEvent.ChooseCard7] = ()=> func(7);
            events[ControllerEvent.ChooseCard8] = ()=> func(8);
            events[ControllerEvent.ChooseCard9] = ()=> func(9);
            events[ControllerEvent.ChooseCard10] = ()=> func(10);
        }

        getChooseCardString(cards:Array<Card>){
            let str = "";
            for(let i=0;i<MAX_CHOOSE_CARD_NUM && i < cards.length;++i){
                str += cards[i].name + this.getStringEventKey(indexToControllerEvent(i))+" ";
            }
            return str;
        }

        setPlayer(player:Player){
            this.player = player
        }

        getStringEventKey(event:ControllerEvent){
            let keys = this._eventKeys[event];
            
            if(!keys){
                return "(none)";
            }
            let str = "(";
            for(var i=0,len=keys.length;i<len;++i){
                str += keys[i];
                if(i<len-1){
                    str += "|";
                }
            }

            return str+")";

        }

        pressKey(key:string|number){
            let event = this._keyEventMap[key];
            if(event){
                this.emit(event);
            }
            
        }

        /**
         * 选择出牌操作
         * @param cb 操作结束的回调
         */
        choosePlayOperation(cb:()=>void){
            cb();
        }

        /**
         * 从cards里选出num个牌，在回调函数中给出选择的结果
         * @param cards 要选择的卡牌
         * @param num 要选择的数量
         * @param canCancel 是否能取消
         * @param cb 选择结束的回调
         */
        chooseCardFromCards(cards:Array<Card>,num:number,canCancel:boolean,cb:(canceled:boolean,choosedCards:Array<Card>)=>void){
            cb(false,cards);
        }

        /**
         * 从区域里选出num个牌，在回调函数中给出选择的结果
         * @param region 要选择的卡牌的区域
         * @param num 要选择的数量
         * @param canCancel 是否能取消
         * @param cb 选择结束的回调
         */
        chooseCardFromRegion(region:Region,num:number,canCancel:boolean,cb:(canceled:boolean,choosedCards:Array<Card>)=>void){
            cb(false,region.getCards());
        }
    }

    export class ControllerPlayer extends Controller{
        constructor(){
            super();
        }
    }

    export class ControllerMonsterEasy extends Controller{
        constructor(){
            super();
        }
    }
}