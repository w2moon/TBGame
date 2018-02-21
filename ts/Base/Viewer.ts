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
    }
}