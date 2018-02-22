
namespace tbgame{
    enum TurnState{
        /** 抽牌阶段 */
        Draw,
        /** 出牌阶段 */
        Play,
        /** 弃牌阶段 */
        Drop,
    }
    /**
     * 回合
     */
    export class Turn extends Entity {
        curPlayer:Player;
        state:TurnState;
        constructor(){
            super();
        }

        start(player:Player,finish:()=>void,num:number){
            
            log.i(player.getProperty("name")+"回合开始");
            this.curPlayer = player;

            log.i(player.getProperty("name")+"抽牌阶段");
            this.state = TurnState.Draw;
            player.draw(()=>{});

            log.i(player.getProperty("name")+"出牌阶段");
            this.state = TurnState.Play;
            player.play();

            finish();
        }
    }
}