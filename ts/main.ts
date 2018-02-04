
    let cards:Array<TBGame.Card> = [];
    function createAttackCard():TBGame.Card{
        let card = new TBGame.Card();
        card.setProperty("name","sword");
        card.setProperty("type","attack");
        card.setProperty("cost",1);
        card.setProperty("attack",5);
        return card;
    }

    function createDefenseCard():TBGame.Card{
        let card = new TBGame.Card();
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
   
    
    
    let gameMode = new TBGame.GameMode();
    gameMode.name = "SlayTheSpire";
    
    var player = new TBGame.Player();
    player.controller = new TBGame.ControllerPlayer();
    player.setProperty("energy",3);
    player.setProperty("hp",50);
    player.group = "group1";
    player.cards = cards;
    
    var monster1 = new TBGame.Player();
    monster1.controller = new TBGame.ControllerMonsterEasy();
    monster1.setProperty("hp",10);
    monster1.group = "group2";
    monster1.cards = cards;
    
    var monster2 = new TBGame.Player();
    monster2.controller = new TBGame.ControllerMonsterEasy();
    monster2.setProperty("hp",20);
    monster2.group = "group2";
    monster2.cards = cards;
    
    gameMode.addPlayer(player);
    gameMode.addPlayer(monster1);
    gameMode.addPlayer(monster2);
    
    gameMode.start();

   
    console.log(12323)

