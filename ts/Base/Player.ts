
namespace tbgame{
    interface RegionDictionary{
        [index:string]:Region;
    }

    export enum PlayerEvent  {
        /** 角色即将开始游戏 */
        WillStartGame="WillStartGame",
        RecycleGrave="RecycleGrave",
        Draw="Draw",
    }

    /**
     * 角色定义
     */
    export class Player extends Entity{
        controller:Controller;

        /** 默认抽牌数 */
        drawNum:number;
        group:string;

        /**
         * 生命
         */
        hp:number;
        /**
         * 金币
         */
        gold:number;
        /**
         * 遗物
         */
        items:Array<Item>;
        /**
         * 卡牌
         */
        cards:Array<Card>;


        /**
         * 游戏中属性
         */

        /**
         * 护甲
         */
        shield:number;
        /**
         * 状态
         */
        buffs:Array<Buff>;

        /**
         * 所有区域
         */
        regions:RegionDictionary;

        constructor(){
            super();
            this.hp = 0;
            this.gold = 0;
            this.items = [];
            this.cards = [];

            this.shield = 0;
            this.buffs = [];
            this.drawNum = 5;

            this.regions = {};
            this.regions.deck = new Region();
            this.regions.deck.name = "牌库";
            this.regions.hand = new Region();
            this.regions.hand.name = "手牌";
            this.regions.grave = new Region();
            this.regions.grave.name = "弃牌";

            this._drawOneCard = this._drawOneCard.bind(this);
        }

        /**
         * 游戏结束
         */
        gameFinish(isWin:boolean):void{

        }

        /**
         * 准备开始游戏
         */
        prepare(cb:()=>void){
            log.i(this.name+"洗牌");
            this.regions.deck.init(this.cards);
            
            // log.i(this.name+"卡牌onPrepare");
            // _.each(this.deck,(card)=>{
            //    // card.onPrepare();
            // });

           // log.i(this.name+"抽起手卡牌");
           // let cards:Array<Card>;
            
            /*
            log.i(this.name+"等待确认卡牌");
            this.controller.chooseCard(cards,1,()=>{
                log.i(this.name+"确认卡牌完毕");
                cb();
            });
            */
           //角色将要开始游戏的事件
           this.emitCb(PlayerEvent.WillStartGame,function(){
                cb();
           });
            
            
        }

        /**
         * 抽牌
         * @param num 数量
         * @param cb 抽牌完成
         */
        draw(num:number,cb:()=>void){
            log.i(this.name+"抽"+num+"张牌");
            util.waitCallNum(num,this._drawOneCard,cb);
        }

        private _makeDeckValid(cb:()=>void){
            let deck = this.regions.deck;

            if(deck.size() <= 0){
                log.i(this.name+"抽牌堆为空，墓地进入抽牌堆");
                let grave = this.regions.grave;

                grave.moveTo(deck);
                
                if(deck.size() <= 0){
                    log.i(this.name+"无牌可抽");
                }
                this.emit(PlayerEvent.RecycleGrave);
                gameMode.viewer.animMoveRegion(grave,deck,cb);
            }
            else{
                cb();
            }
        }

        private _drawOneCard(cb:()=>void){

            this._makeDeckValid(()=>{
                let deck = this.regions.deck;
                let hand = this.regions.hand;
                let card = deck.top();
                deck.remove(card);
                hand.add(card);
                log.i(player.name+"抽到牌"+card.name);
                this.emit(PlayerEvent.Draw,card);
                cb();
            });

            
        }

        play(cb:()=>void){
            this.controller.choosePlayOperation(cb);
        }

    }
}