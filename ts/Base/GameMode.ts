/// <reference path="Entity.ts" />
namespace TBGame{
    /**
     * 游戏模式，这里管理回合在角色间的流转
     */
    export class GameMode extends Entity {
        constructor(){
            super();
        }

        /**
         * 游戏初始化
         */
        init(){

        }

        /**
         * 添加角色
         */
        addPlayer(player:Player){

        }

        /**
         * 游戏开始
         */
        start(){

        }

        /**
         * 回合向前
         * @param num 向前几个回合 
         */
        step(num:number){

        }
    }
}