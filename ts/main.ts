

let cards: Array<tbgame.Card> = [];
function createAttackCard(): tbgame.Card {
    let card = new tbgame.Card();
    card.name = "sword";
    card.setProperty("type", "attack");
    card.setProperty("cost", 1);
    card.setProperty("attack", 5);
    return card;
}

function createDefenseCard(): tbgame.Card {
    let card = new tbgame.Card();
    card.name = "shield";
    card.setProperty("type", "skill");
    card.setProperty("cost", 1);
    card.setProperty("defense", 5);
    return card;
}
for (let i = 0; i < 5; ++i) {
    cards.push(createAttackCard());
    cards.push(createDefenseCard());
}

let viewer = new tbgame.CmdViewer();
//viewer.createGameModeViewer(gameMode);
enum TurnEvent {
    TurnStart = "回合开始",
    TurnDrawStart = "抽牌开始",
    TurnDrawFinish = "抽牌结束",
    TurnPlayStart = "出牌开始",
    TurnPlayFinish = "出牌结束",
    TurnFinish = "回合结束",
};
let gameMode = new tbgame.GameMode(viewer);
tbgame.gameMode = gameMode;
gameMode.name = "SlayTheSpire";
gameMode.turn = new tbgame.Turn([
    TurnEvent.TurnStart,
    TurnEvent.TurnDrawStart,
    TurnEvent.TurnDrawFinish,
    TurnEvent.TurnPlayStart,
    TurnEvent.TurnPlayFinish,
    TurnEvent.TurnFinish,

]);
//定义胜利条件

//定义逻辑语义
//循环(each,while,break)，加，减，乘，除，函数定义，变量定义，条件控制（if ）,判断（等于 大于 小于 非） 类型（数字 字符串 对象）

let eventKeys:tbgame.EventKeys = {};
eventKeys[tbgame.ControllerEvent.ChooseCard1] = [tbgame.keycode["1"]];
eventKeys[tbgame.ControllerEvent.ChooseCard2] = [tbgame.keycode["2"]];
eventKeys[tbgame.ControllerEvent.ChooseCard3] = [tbgame.keycode["3"]];
eventKeys[tbgame.ControllerEvent.ChooseCard4] = [tbgame.keycode["4"]];
eventKeys[tbgame.ControllerEvent.ChooseCard5] = [tbgame.keycode["5"]];
eventKeys[tbgame.ControllerEvent.ChooseCard6] = [tbgame.keycode["6"]];
eventKeys[tbgame.ControllerEvent.ChooseCard7] = [tbgame.keycode["7"]];
eventKeys[tbgame.ControllerEvent.ChooseCard8] = [tbgame.keycode["8"]];
eventKeys[tbgame.ControllerEvent.ChooseCard9] = [tbgame.keycode["9"]];
eventKeys[tbgame.ControllerEvent.ChooseCard10] = [tbgame.keycode["0"]];
eventKeys[tbgame.ControllerEvent.Back] = [tbgame.keycode.q];
eventKeys[tbgame.ControllerEvent.Confirm] = [tbgame.keycode.e];
eventKeys[tbgame.ControllerEvent.Deck] = [tbgame.keycode.z];
eventKeys[tbgame.ControllerEvent.Grave] = [tbgame.keycode.c];

let player = new tbgame.Player();
player.controller = new tbgame.CmdController();
player.controller.setPlayer(player);
player.controller.initEventKeys(eventKeys);
player.name = "player1";
player.setProperty("energy", 3);
player.setProperty("hp", 50);
player.group = "group1";
player.cards = cards;

player.on(tbgame.PlayerEvent.WillStartGame, function (cb) {
    viewer.animPrepare(cb);
});

player.on(TurnEvent.TurnDrawStart, function (cb) {
    player.draw(player.drawNum, cb);
});

player.on(TurnEvent.TurnPlayStart, function (cb) {
   
    player.play(cb);
});


let monster1 = new tbgame.Player();
monster1.controller = new tbgame.ControllerMonsterEasy();
monster1.name = "monster1";
monster1.setProperty("hp", 10);
monster1.group = "group2";
monster1.cards = cards;

let monster2 = new tbgame.Player();
monster2.controller = new tbgame.ControllerMonsterEasy();
monster2.name = "monster2";
monster2.setProperty("hp", 20);
monster2.group = "group2";
monster2.cards = cards;

gameMode.addPlayer(player);
gameMode.addPlayer(monster1);
gameMode.addPlayer(monster2);



gameMode.start();


