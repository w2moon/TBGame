/// <reference path="Entity.ts" />

namespace TBGame {
    /**
     * 控制器
     */
    export class Controller extends Entity {
        constructor(){
            super();
        }

        chooseCard(cards:Array<Card>,num:number,cb:(choosedCards:Array<Card>)=>void){

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