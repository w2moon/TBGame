
namespace tbgame{
    interface RegionDictionary{
        [index:string]:Region;
    }

    const PlayerEvent = {
        WillStartGame:"WillStartGame",
        RecycleGrave:"RecycleGrave",
        Draw:"Draw",
    }

    /**
     * 角色定义
     */
    export class Player extends Entity{
        controller:Controller;
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

            this.regions = {};
            this.regions.deck = new Region();
            this.regions.hand = new Region();
            this.regions.grave = new Region();
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
            log.i(this.getProperty("name")+"洗牌");
            this.regions.deck.init(this.cards);
            
            // log.i(this.getProperty("name")+"卡牌onPrepare");
            // _.each(this.deck,(card)=>{
            //    // card.onPrepare();
            // });

           // log.i(this.getProperty("name")+"抽起手卡牌");
           // let cards:Array<Card>;
            
            /*
            log.i(this.getProperty("name")+"等待确认卡牌");
            this.controller.chooseCard(cards,1,()=>{
                log.i(this.getProperty("name")+"确认卡牌完毕");
                cb();
            });
            */
           this.emit(PlayerEvent.WillStartGame);
            cb();
            
        }

        /**
         * 抽一张牌
         * @param cb 抽牌完成
         */
        draw(cb:()=>void){
            log.i(this.getProperty("name")+"抽牌");
            let deck = this.regions.deck;
            let hand = this.regions.hand;

            if(deck.size() <= 0){
                log.i(this.getProperty("name")+"抽牌堆为空，墓地进入抽牌堆");
                let grave = this.regions.grave;

                grave.moveTo(deck);
                
                if(deck.size() <= 0){
                    log.i(this.getProperty("name")+"无牌可抽");
                }
                this.emit(PlayerEvent.RecycleGrave);
            }

            let card = deck.top();
            deck.remove(card);
            hand.add(card);
            
            this.emit(PlayerEvent.Draw,card);
            cb();
        }

        play(){

        }

    }
}