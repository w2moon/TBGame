

namespace tbgame {
    /**
     * 控制器
     */
    export class Controller extends Entity {
        constructor(){
            super();
        }

        chooseCard(cards:Array<Card>,num:number,cb:(choosedCards:Array<Card>)=>void){
            cb(cards);
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