/// <reference path="Entity.ts" />
namespace TBGame{
    /**
     * 游戏模式，这里管理回合在角色间的流转
     */
    export class GameMode extends Entity {
        players:Array<Player>;
        constructor(){
            super();
            this.players = [];
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
            this.players.push(player);
        }

        /**
         * 游戏开始
         */
        start(){
            let waitNum = this.players.length;
            function finished(){
                waitNum--;
                if(waitNum<=0){
                    //all
                    print("all prepared");
                }
            }
            for(let player of this.players){
                player.prepare(finished);
            }
        }

        /**
         * 回合向前
         * @param num 向前几个回合 
         */
        step(num:number){

        }
    }
}