/// <reference path="Entity.ts" />

namespace tbgame{
    export enum PlaceType{
        
        Deck,
        Hand,
        Grave,
        Banish,
    }
    /**
     * 卡牌
     */
    export class Card extends Entity {
        /**
         * 位置
         */
        placeType:PlaceType;

        constructor(events?:any){
            super();
        }

        init(){
            this.placeType = PlaceType.Deck;
        }

        
    }
}