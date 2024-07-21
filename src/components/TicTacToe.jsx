import { useState, useEffect } from "react";
import Board from "./Board";
import Gameover from "./Gameover";
import GameState from "./GameState";
import Reset from "./Reset";


const PlayerX = "X";
const PlayerO = "O";
const Winningcombinations = [
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },

    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },

    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },

];

function checkwinner(tiles, setstrikeClass, setgamestate) {
    for (const { combo, strikeClass } of Winningcombinations) {
        const tilevalue1 = tiles[combo[0]];
        const tilevalue2 = tiles[combo[1]];
        const tilevalue3 = tiles[combo[2]];

        if (
            tilevalue1 !== null &&
            tilevalue1 === tilevalue2 &&
            tilevalue1 === tilevalue3
        ) {
            setstrikeClass(strikeClass);
            if (tilevalue1 === PlayerX) {
                setgamestate(GameState.PlayerXWins);
            } else {
                setgamestate(GameState.PlayerOWins);
            }
            return;
        }
    }
}

function TicTacToe() {

    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PlayerX);
    const [strikeClass, setstrikeClass] = useState();
    const [gameState, setgamestate] = useState(GameState.inProgress);
    const [playerXMoves, setPlayerXMoves] = useState([]);
    const [playerOMoves, setPlayerOMoves] = useState([]);
    const [countX, setCountX] = useState(0);
    const [countO, setCountO] = useState(0);

    const [showTileToBeRemoved, setShowTileToBeRemoved] = useState(false);


    const handleReset = () => {
        setgamestate(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PlayerX);
        setstrikeClass(null);

        setPlayerXMoves([]);
        setPlayerOMoves([]);
        setCountX(0);
        setCountO(0);
        setShowTileToBeRemoved(false);
    };

    useEffect(() => {
        checkwinner(tiles, setstrikeClass, setgamestate);

    }, [tiles]);

    const handleTileclick = (index) => {
        if (gameState !== GameState.inProgress) {
            return;
        }

        if (tiles[index] !== null) {
            return;
        }

        const newTiles = [...tiles];
        const newPlayerXMoves = [...playerXMoves];
        const newPlayerOMoves = [...playerOMoves];

        if (playerTurn === PlayerX) {
            newTiles[index] = PlayerX;
            newPlayerXMoves.push(index);
            setCountX(countX + 1);
            if (countX == 3) {
                const firstXIndex = newPlayerXMoves.shift();
                newTiles[firstXIndex] = null;
                setCountX(3);
            }
        } else {
            newTiles[index] = PlayerO;
            newPlayerOMoves.push(index);
            setCountO(countO + 1);
            if (countO == 3) {
                const firstOIndex = newPlayerOMoves.shift();
                newTiles[firstOIndex] = null;
                setCountO(3);
            }
        }

        setTiles(newTiles);
        setPlayerXMoves(newPlayerXMoves);
        setPlayerOMoves(newPlayerOMoves);
        setPlayerTurn(playerTurn === PlayerX ? PlayerO : PlayerX);
    };


    const toggleShowTileToBeRemoved = () => {
        setShowTileToBeRemoved(!showTileToBeRemoved);
    };

    return (
        <div>
            <h1>XoX ♾️-Loop </h1>
            <button onClick={toggleShowTileToBeRemoved} className="hint-button">
                {showTileToBeRemoved ? "Hide" : "Show"} Hint
            </button>

            <Board playerTurn={playerTurn} tiles={tiles} onTileclick={handleTileclick}
                strikeClass={strikeClass}

                showTileToBeRemoved={showTileToBeRemoved}
                playerXMoves={playerXMoves}
                playerOMoves={playerOMoves}
            />
            <Gameover gameState={gameState} />
            <Reset gameState={gameState} onReset={handleReset} />
        </div>
    );
}
export default TicTacToe;