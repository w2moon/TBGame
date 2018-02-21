namespace tbgame{

    export class CmdAnimation{
        cardFromTo(card:Card,from:Region,to:Region,cb:(result:boolean)=>void):void{
            setTimeout(cb,1000);
        }
    }
}