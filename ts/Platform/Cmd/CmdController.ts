namespace tbgame{
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    export class CmdController extends Controller{
        chooseCard(cards:Array<tbgame.Card>,num:number,cb:(choosedCards:Array<tbgame.Card>)=>void){
            log.i("to choose");
            rl.question('What do you think of Node.js? ', (answer:string) => {
                console.log(`Thank you for your valuable feedback: ${answer}`);
                rl.close();
                cb(cards);
              });
        }
    }
}
