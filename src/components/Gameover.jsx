import GameState from "./GameState"

function Gameover({ gameState }) {
    switch (gameState) {
        case GameState.inProgress:
            return <></>;
        case GameState.PlayerOWins:
            return <div className="game-over">O Wins</div>
        case GameState.PlayerXWins:
            return <div className="game-over">X Wins</div>
        default:
            return null;
    }
}

export default Gameover;