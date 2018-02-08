/// <reference path="Entity.ts" />
namespace tbgame{
    /**
     * 游戏模式，这里管理回合在角色间的流转
     */
    export class GameMode extends Entity {
        players:Array<Player>;
        groups:{ [index:string]:Array<Player>};
        constructor(){
            super();
            this.players = [];
            this.groups = {};
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
            var group = this.groups[player.group];
            if(!group){
                group = [];
                this.groups[player.group] = group;
            }
            group.push(player);
        }

        checkWin(){
            let loseGroup = [];
            let groupNum = 0;
            for(let name in this.groups){
                groupNum++;
                let group = this.groups[name];
                let lose = true;
                for(let i=0;i<group.length;++i){
                    let player = group[i];
                    if(player.getProperty("hp") > 0){
                        lose = false;
                        break;
                    }
                }
                if(lose){
                    loseGroup.push(name);
                }
            }

            if(groupNum - loseGroup.length <= 1){
                //剩余组数小于1则游戏结束
                for(let name in this.groups){
                    let group = this.groups[name];
                    let win = loseGroup.indexOf(name) == -1;
                    for(let i=0;i<group.length;++i){
                        let player = group[i];
                        player.emit("gamefinish",win);
                    }
                    
                }

            }
           
            
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