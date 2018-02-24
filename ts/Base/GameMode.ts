
namespace tbgame{
    const MAX_TURN_NUM = 3;
    
    /**
     * 游戏模式，这里管理回合在角色间的流转
     */
    export class GameMode extends Entity {
        players:Array<Player>;
        viewer:Viewer;
        groups:{ [index:string]:Array<Player>};
        /**
         * 当前回合数
         */
        turn:Turn;

        
        constructor(viewer:Viewer){
            super();
            this.players = [];
            this.groups = {};
            this.viewer = viewer;
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

        /**
         * 检测所有角色，如果有一组角色的所有体力都小于0，则这一组失败。
         * 如果只剩一组角色，则游戏结束
         */
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
                        player.gameFinish(win);
                    }
                    
                }

            }
           
            
        }

        /**
         * 游戏开始
         */
        start(){
            log.i("角色开始准备游戏");

            util.waitGroupCallByName(this.players,"prepare",()=>{
                log.i("所有角色准备完毕，游戏开始");
                this.next(1);
                
            });
            
        }

        next(turnNum:number){
            if(turnNum>=MAX_TURN_NUM){
                log.i("回合数超过"+MAX_TURN_NUM+",自动结束");
                return;
            }
            log.i("第"+turnNum+"回合开始");
            util.waitGroupCallByFunction(this.players,this.turn.start,()=>{
                log.i("第"+turnNum+"回合结束");
                this.next(turnNum+1);
            },turnNum);
        }

        /**
         * 回合向前
         * @param num 向前几个回合 
         */
        step(num:number){

        }
    }
}