namespace tbgame{
    export abstract class Viewer extends Entity{
        /**
         * 创建游戏对象的显示
         * @param gameMode 游戏对象 
         * @returns 可显示对象
         */
        abstract createGameModeViewer(gameMode:GameMode):Display;

        /**
         * 创建卡牌的显示
         * @param card 要显示的卡牌
         * @returns 可显示对象
         */
        abstract  createCardViewer(card:Card):Display;


        /** 
         * 显示角色的操作界面
         * @param player 要显示界面的角色
        */
        abstract showPlayOperationUI(player:Player):void;

        /**
         * 显示选择目标界面
         * @param player 
         */
        abstract showChooseTargetUI(player:Player):void;

        /**
         * 显示卡牌操作
         * @param card 要显示操作的卡牌
         */
        abstract showCardOperationUI(player:Player,card:Card):void;

        /**
         * 卡牌逻辑最好不要等待卡牌动画完成，
         * 这样玩家可以不断操作，并且不用等待动画完成，
         * 这样做需要动画之间可以直接衔接，卡牌上记录当前动画状态来完成转换
         * 比如卡牌动画一般有:抽牌，选中，指向，未选中，打出，弃牌
         */



        /**
         * 开始游戏的动画
         * @param cb 准备完毕的回调
         */
        abstract animPrepare(cb:()=>void):void;

        /**
         * 指定目标的卡牌打出动画，
         * 注意使用卡牌和卡牌使用后进入弃牌堆的动画是分离的，
         * 进入其他牌堆要使用animMoveCard来完成
         * @param card 打出的卡牌
         * @param target 指定的目标
         * @param cb 动画播放完毕的回调
         */
        abstract animCardPlayToTarget(card:Card,target:Player,cb:()=>void):void;

        /**
         * 直接使用卡牌
         * @param card 要使用的卡牌
         * @param cb 使用完毕的回调
         */
        abstract animCardPlayDirect(card:Card,cb:()=>void):void;

        /**
         * 动画，把card从from区域移动到to区域
         * @param card 要移动的牌
         * @param to 移动到这个区域
         * @param cb 移动完成的回调
         */
        abstract animMoveCard(card:Card,to:Region,cb:()=>void):void;

        /**
         * 动画，把from区域的所有牌移动到to区域
         * @param from 牌移出的区域
         * @param to 牌移到的区域
         * @param cb 移动完成的回调
         */
        abstract animMoveRegion(from:Region,to:Region,cb:()=>void):void;

        /**
         * 播放角色死亡动画
         * @param player 
         */
        abstract animDead(player:Player,cb:()=>void):void;
    }
}