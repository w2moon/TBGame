namespace tbgame{
    export abstract class Logic{
        abstract exec(card:Card,player:Player):void;
    }
    /**
     * keyword分多种？
     * 一种代表它监听某种事件，事件发生后触发的结果写在卡牌里？结果应该也独立，这样才能有卡扎库斯一样的自定义卡，
     * 还有猎人的制作野兽,战吼，亡语
     * 一种代表事件和逻辑的组合 圣盾,嘲讽,虚无,伤口,诅咒
     * 还有无关键字，只有逻辑的
     * 场地关键字怎么实现？感觉像能力，相当于检测牌打出事件并挂个能力
     * 武器牌怎么实现
     * 圣盾还能加给别的牌
     * 沉默取消所有关键字？
     * 发现，过滤个牌池
     * 连击效果
     */
    export class Keyword extends Logic{
        name:string;
        private card:Card;
        private player:Player;
        constructor(card:Card,player:Player){
            super();
        }
        exec():void{

        }

    }
}