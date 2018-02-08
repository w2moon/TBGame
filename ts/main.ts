
    let cards:Array<tbgame.Card> = [];
    function createAttackCard():tbgame.Card{
        let card = new tbgame.Card();
        card.setProperty("name","sword");
        card.setProperty("type","attack");
        card.setProperty("cost",1);
        card.setProperty("attack",5);
        return card;
    }

    function createDefenseCard():tbgame.Card{
        let card = new tbgame.Card();
        card.setProperty("name","shield");
        card.setProperty("type","skill");
        card.setProperty("cost",1);
        card.setProperty("defense",5);
        return card;
    }
    for(let i=0;i<5;++i){
        cards.push(createAttackCard());
        cards.push(createDefenseCard());
    }
   
    interface TemplateGameMode{
        winCondition:{
            and:{
                and:{
                    filter:{
                        array:{
                            group:{
                                propertyName:"group",
                            }
                        }
                    }
                    
                }
            },
            or:{

            }
        },
    }
    
    let gameMode = new tbgame.GameMode();
    gameMode.name = "SlayTheSpire";
    //定义胜利条件

    //定义逻辑语义
    //循环(each,while,break)，加，减，乘，除，函数定义，变量定义，条件控制（if ）,判断（等于 大于 小于 非） 类型（数字 字符串 对象）
    
    
    var player = new tbgame.Player();
    player.controller = new tbgame.ControllerPlayer();
    player.setProperty("energy",3);
    player.setProperty("hp",50);
    player.group = "group1";
    player.cards = cards;
    
    var monster1 = new tbgame.Player();
    monster1.controller = new tbgame.ControllerMonsterEasy();
    monster1.setProperty("hp",10);
    monster1.group = "group2";
    monster1.cards = cards;
    
    var monster2 = new tbgame.Player();
    monster2.controller = new tbgame.ControllerMonsterEasy();
    monster2.setProperty("hp",20);
    monster2.group = "group2";
    monster2.cards = cards;
    
    gameMode.addPlayer(player);
    gameMode.addPlayer(monster1);
    gameMode.addPlayer(monster2);
    
    gameMode.start();

   
    console.log(12323)

