namespace tbgame{

    

    const WAIT_TIME_LITTLE = 1000;
    const WAIT_TIME_NORMAL = 1000;
    
    export class CmdViewer extends Viewer {

        //region 创建显示对象
        createGameModeViewer(mode:GameMode):Display{
            return null;
        }

        createCardViewer(card:Card):Display{
            return null;
        }

        //endregion

        //region 显示相关界面
        showPlayOperationUI(player:Player){
            log.i(player.name+"显示操作界面"+"---------------------------------------------------");

            let players = gameMode.players;
            _.each(gameMode.players,playerInPlay=>{
                if(playerInPlay == player){
                    return;
                }
                log.i(playerInPlay.name+" "+playerInPlay.toStringProperty());
            })
            log.i(player.name+" "+player.toStringProperty());

            let cards = player.regions.hand.getCards();
            let str = player.regions.hand.toStringInfo()+" " + player.controller.getChooseCardString(cards);
            
            log.i(player.name+str);
            log.i(player.name+player.regions.deck.toStringInfo()+player.controller.getStringEventKey(ControllerEvent.Deck)+" "+player.regions.grave.toStringInfo()+player.controller.getStringEventKey(ControllerEvent.Grave));
            log.i("回合结束"+player.controller.getStringEventKey(ControllerEvent.Confirm));
            log.i("---------------------------------------------------");
        }

        showCardOperationUI(player:Player,card:Card):void{
            log.i(player.name+"显示卡牌界面"+"---------------------------------------------------");
            log.i(card.toStringInfo());
            log.i("使用"+player.controller.getStringEventKey(ControllerEvent.Confirm)+" 取消"+player.controller.getStringEventKey(ControllerEvent.Back));
            log.i("---------------------------------------------------");
        }

        showChooseTargetUI(player:Player){
            log.i(player.name+"显示选择对象界面"+"---------------------------------------------------");
            let players = gameMode.players;
            let str = "";
            for(let i=0;i<players.length;++i){
                str += players[i].name+player.controller.getStringEventKey(toChooseEvent(i))+" ";
            }
            log.i(str);
            log.i("---------------------------------------------------");
        }
        //endregion

        //region 动画

        

        /**
         * 开始游戏的动画
         * @param cb 准备完毕的回调
         */
        animPrepare(cb:()=>void){
            log.i("<动画>开始游戏");
            util.wait(WAIT_TIME_NORMAL,cb);
        }

        /**
         * 指定目标的卡牌打出动画，
         * 注意使用卡牌和卡牌使用后进入弃牌堆的动画是分离的，
         * 进入其他牌堆要使用animMoveCard来完成
         * @param card 打出的卡牌
         * @param target 指定的目标
         * @param cb 动画播放完毕的回调
         */
        animCardPlayToTarget(card:Card,target:Player,cb:()=>void){
            log.i("<动画>对目标"+target.name+"使用卡牌"+card.name);
            util.wait(WAIT_TIME_NORMAL,cb);
        }

        /**
         * 直接使用卡牌
         * @param card 要使用的卡牌
         * @param cb 使用完毕的回调
         */
        animCardPlayDirect(card:Card,cb:()=>void){
            log.i("动画，使用卡牌"+card.name);
            util.wait(WAIT_TIME_NORMAL,cb);
        }

        /**
         * 动画，把card从from区域移动到to区域
         * @param card 要移动的牌
         * @param to 移动到这个区域
         * @param cb 移动完成的回调
         */
        animMoveCard(card:Card,to:Region,cb:()=>void){
            log.i("<动画>把牌"+card.name+"移动到Region"+to.name);
            util.wait(WAIT_TIME_LITTLE,cb);
        }

        /**
         * 动画，把from区域的所有牌移动到to区域
         * @param from 牌移出的区域
         * @param to 牌移到的区域
         * @param cb 移动完成的回调
         */
        animMoveRegion(from:Region,to:Region,cb:()=>void){
            log.i("<动画>从Region"+from.name+"到Region"+to.name);
            util.wait(WAIT_TIME_NORMAL,cb);
        }

        animDead(player:Player,cb:()=>void){
            log.i("<动画>"+player.name+"死亡");
            util.wait(WAIT_TIME_NORMAL,cb);
        }
        //endregion
    }
}