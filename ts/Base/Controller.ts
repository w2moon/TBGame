

namespace tbgame {
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
        Cancel = "Cancel",
        Use = "Use",
        Deck = "Deck",
        Grave = "Grave",
        Back = "Back",
        Option = "Option",

    }
    /**
     * 控制器
     */
    export class Controller extends Entity {
        player:Player;
        constructor(){
            super();
        }

        setPlayer(player:Player){
            this.player = player
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