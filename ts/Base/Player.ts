/// <reference path="Entity.ts" />
namespace tbgame{
    interface RegionDictionary{
        [index:string]:Array<Card>;
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
         * 抽牌堆
         */
        deck:Array<Card>;
        /**
         * 手牌
         */
        hand:Array<Card>;
        /**
         * 墓地
         */
        grave:Array<Card>;

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
            this.regions.deck = [];
            this.regions.hand = [];
            this.regions.grave = [];
        }

        /**
         * 准备开始游戏
         */
        prepare(cb:()=>void){
            //洗牌
            this.deck = _.shuffle(this.cards);

            //对所有牌执行开始阶段逻辑
            _.each(this.deck,(card)=>{
               // card.onPrepare();
            });

            //抽起始牌
            let cards:Array<Card>;
            //由角色确认抽牌
            this.controller.chooseCard(cards,1,function(){

            });
        }

    }
}