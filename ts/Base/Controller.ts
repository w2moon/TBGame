

namespace tbgame {
    const MAX_CHOOSE_NUM = 10;

    export enum ControllerEvent{
        Choose1 = "Choose1",
        Choose2 = "Choose2",
        Choose3 = "Choose3",
        Choose4 = "Choose4",
        Choose5 = "Choose5",
        Choose6 = "Choose6",
        Choose7 = "Choose7",
        Choose8 = "Choose8",
        Choose9 = "Choose9",
        Choose10 = "Choose10",
        Confirm = "Confirm",
        Deck = "Deck",
        Grave = "Grave",
        Back = "Back",

    }

    /**
     * 把数字转成对应的选项事件
     * @param idx 0对应Choose1事件，1对应Choose2事件
     */
    export function toChooseEvent(idx:number):any{
        let num = idx+1;
        return "Choose"+num;
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

            this.pressKey = this.pressKey.bind(this);
        }

      
        /**
         * 开始监听用户输入
         */
        enableInput():void{
            log.w("Controller的子类需要实现enableInput方法");
        }
        /** 
         * 停止监听用户输入
        */
        disableInput():void{
            log.w("Controller的子类需要实现disableInput方法");
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
        

        private _wrapTargetEventFunc(target:Entity,func:(target:Entity)=>void){
            return ()=>func(target);
        }

       

        protected formatChooseTargetEvent(events:FunctionMap,targets:Array<Entity>,func:(target:Entity)=>void){
            for(let i=0,len=targets.length;i<MAX_CHOOSE_NUM && i<len;++i){
                events[toChooseEvent(i)] = this._wrapTargetEventFunc(targets[i],func);
            }
        }

        getChooseCardString(cards:Array<Card>){
            let str = "";
            for(let i=0;i<MAX_CHOOSE_NUM && i < cards.length;++i){
                str += cards[i].name + this.getStringEventKey(toChooseEvent(i))+" ";
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
         * 选择一个player
         * @param cb 选择了角色，可能为null
        */
       chooseTarget(condition:(player:Player)=>boolean,cb:(player:Player)=>void){
            cb(null);
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