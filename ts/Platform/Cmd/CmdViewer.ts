namespace tbgame{

    class GameModeViewer{
        
    }

    class CardViewer{

    }

    export class CmdViewer extends Viewer {
        createGameModeViewer(mode:GameMode):Display{
            return null;
        }

        createCardViewer(card:Card):Display{
            return null;
        }
    }
}