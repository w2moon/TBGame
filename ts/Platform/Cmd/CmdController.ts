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
    let waitPressFuncs:Array<()=>void> = [];
    export function waitPressOnce(cb:()=>void){
        waitPressFuncs.push(cb);
    }
    stdin.on('data',function(key){
        let funcs = waitPressFuncs.slice(0);
        for(let i=0;i<waitPressFuncs.length;++i){
            waitPressFuncs[i]();
        }

       if(eventCb){
            eventCb(key);
       }
    });
    
    
    export class CmdController extends Controller{
        eventsMgr:InputEventsStack;
        showCmdList(){
            
        }

        initEventKeys(eventKeys:EventKeys):void{
            super.initEventKeys(eventKeys);
            this.eventsMgr = new InputEventsStack(this);
            
        }
        enableInput():void{
            if(!eventCb){
                eventCb = this.pressKey;
            }
        }
        disableInput():void{
            eventCb = null;
        }

        showCards(cards:Array<Card>){

        }

        chooseCardOperation(card:Card,cb:()=>void){
            let self = this;
            function finish(){
                self.eventsMgr.pop();
                cb();
            }
            let events:FunctionMap = {};
            events[ControllerEvent.Back] = ()=>{
                log.i("操作返回"+card.name);
                //ui pop
                finish();
            }

            events[ControllerEvent.Confirm] = ()=>{
                log.i("操作使用卡牌"+card.name);
                //ui pop
                this.player.useCard(card,finish);
            }
            this.eventsMgr.push(events);
            gameMode.viewer.showCardOperationUI(this.player,card);
        }

        chooseTarget(condition:(player:Player)=>boolean,cb:(player:Player)=>void){
            let self = this;
            function finish(choosed:Player){
                self.eventsMgr.pop();
                cb(choosed);
            }
            let events:FunctionMap = {};
            events[ControllerEvent.Back] = ()=>{
                log.i("选对象操作取消");
                //ui pop
               finish(null);
            }
            this.formatChooseTargetEvent(events,gameMode.players,(choosed:Player)=>{
               if(!condition(choosed)){
                   log.i("不能选择这个对象"+choosed.name);
                    return;
               }
               log.i("选择了"+choosed.name);
               finish(choosed);
            });
            this.eventsMgr.push(events);
            gameMode.viewer.showChooseTargetUI(player);
        }

        
        choosePlayOperation(cb:()=>void){
            
            /** 
             * 注册操作事件
            */
           let cards = this.player.regions.hand.getCards();
            let events:FunctionMap = {};
            this.formatChooseTargetEvent(events,cards,(card:Card)=>{
                log.i(this.player.name+"选择了卡牌"+card.name);
                this.chooseCardOperation(card,()=>{
                    this.choosePlayOperation(cb);
                });
                
            });
            events[ControllerEvent.Deck] = function() {
                log.i("显示牌库");
                
            };
            events[ControllerEvent.Grave] = function(){
                log.i("显示墓地");
                
            }

            events[ControllerEvent.Confirm] = ()=>{
                log.i("操作结束");
                this.eventsMgr.pop();
                
            }
            this.eventsMgr.push(events,cb);

            /**
             * 显示界面
             */
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
