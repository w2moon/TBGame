namespace tbgame{
    // const readline = require('readline');
    //readline.emitKeypressEvents(process.stdin);
    // const rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });
    var stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    let eventCb:(key:any)=>void;
    stdin.on('data',function(key){
       if(eventCb){
            eventCb(key);
       }
    });
    
    export class CmdController extends Controller{
        
        showCmdList(){
            
        }

        initEventKeys(eventKeys:EventKeys):void{
            super.initEventKeys(eventKeys);

            
        }

        enableInput(){
            eventCb = this.pressKey.bind(this);
        }
        disableInput(){
            eventCb = null;
        }

        choosePlayOperation(cb:()=>void){
            this.enableInput();
            let eventHandler:()=>void;
            let self = this;
            function finish(){
                if(!eventHandler){
                    return;
                }
                eventHandler();
                eventHandler = null;
                self.disableInput();
                cb();
            }
            let events:FunctionMap = {};
            this._registeChooseCardEvent(events,function(idx:number){
                log.i("选择了第"+idx+"张卡牌");
                
            });
            events[ControllerEvent.Deck] = function() {
                log.i("显示牌库");
                
            };
            events[ControllerEvent.Grave] = function(){
                log.i("显示墓地");
                
            }
            eventHandler = this.onEventsMap(events);
            gameMode.viewer.showPlayOperationUI(this.player);
            
        }
        chooseCardFromCards(cards:Array<Card>,num:number,canCancel:boolean,cb:(canceled:boolean,choosedCards:Array<Card>)=>void){
            
            log.i("to choose");
            // rl.question('What do you think of Node.js? ', (answer:string) => {
            //     console.log(`Thank you for your valuable feedback: ${answer}`);
            //     //rl.close();
            //     cb(false,cards);
            //   });
        }
    }
}
