
namespace tbgame{
    /**
     * 区域,手牌，牌库，坟地，战场，出牌等等区域
     */
    export class Region extends Entity {
        private _cards:Array<Card>;
        constructor(){
            super();

            this._cards = [];
        }

        /** 
         * 返回区域中卡牌的数量
        */
        size():number{
            return this._cards.length;
        }

        getCards():Array<Card>{
            return this._cards;
        }

        toString():string{
            return this.toStringInfo()+":"+this.toStringCards();
        }
        toStringInfo():string{
            return this.name + ":"+this._cards.length;
        }
        toStringCards():string{
            let str = "";
            _.each(this._cards,card=>{
                str += card.name + " ";
            });
            return str;
        }

        /**
         * 把区域中所有牌移到指定区域
         * @param to 要移动到的区域
         */
        moveTo(to:Region){

        }

        /**
         * 获得最顶部的卡牌
         */
        top():Card{
            return this._cards[this._cards.length - 1];
        }

        init(cards:Array<Card>){
            this._cards = _.shuffle(cards);
        }


        /**
         * 获得最顶部的num数量张牌
         * @param num 要获得的卡牌数量
         */
        topCards(num:number):Array<Card>{
            return this._cards.slice(this._cards.length-num);
        }

        /** 
         * 返回最底部的卡牌
        */
        tail():Card{
            return this._cards[0];
        }

        /**
         * 添加卡牌到Region的最前端top的位置
         * @param card 要添加的卡牌
         */
        add(card:Card){
            this._cards.push(card);
        }

        /**
         * 添加卡牌到Region的随机位置
         * @param card 要添加的卡牌
         */
        addRandom(card:Card){
            this._cards.splice(_.random(0,this._cards.length-1),0,card);
        }

        /**
         * 移除指定卡牌
         * @param card 要移除的卡牌
         */
        remove(card:Card){
            let idx = this._cards.indexOf(card);
            if(idx == -1){
                return;
            }
            this._cards.splice(idx,1);
            
        }
    }
}