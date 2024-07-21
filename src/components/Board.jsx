import Strike from "./Strike";
import Tile from "./Tile";

function Board({ tiles, onTileclick, playerTurn, strikeClass, showTileToBeRemoved, playerXMoves, playerOMoves }) {
  let tileToBeRemoved = null;
  if (showTileToBeRemoved) {
    if (playerTurn === "X" && playerXMoves.length >= 3) {
      tileToBeRemoved = playerXMoves[0];
    } else if (playerTurn === "O" && playerOMoves.length >= 3) {
      tileToBeRemoved = playerOMoves[0];
    }
  }

  return (
    <div className="board">
      {/* <Tile
          playerTurn ={playerTurn} 
          onClick={()=>onTileclick(0)} value={ tiles[0]} className="right-border bottom-border "/>
          <Tile 
          playerTurn ={playerTurn} 
          onClick={()=>onTileclick(1)} value={ tiles[1]} className="right-border bottom-border "/>
          <Tile
          playerTurn ={playerTurn} 
           onClick={()=>onTileclick(2)} value={ tiles[2]} className=" bottom-border "/>
          <Tile
           playerTurn ={playerTurn} 
           onClick={()=>onTileclick(3)} value={ tiles[3]} className="right-border bottom-border "/>
          <Tile
           playerTurn ={playerTurn} 
           onClick={()=>onTileclick(4)} value={ tiles[4]}  className="right-border bottom-border "/>
          <Tile
           playerTurn ={playerTurn} 
           onClick={()=>onTileclick(5)} value={ tiles[5]}  className=" bottom-border "/>
          <Tile 
           playerTurn ={playerTurn} 
           onClick={()=>onTileclick(6)} value={ tiles[6]}  className="right-border  "/>
          <Tile
           playerTurn ={playerTurn} 
           onClick={()=>onTileclick(7)} value={ tiles[7]}  className="right-border  "/>
          <Tile
           playerTurn ={playerTurn} 
           onClick={()=>onTileclick(8)} value={ tiles[8]}  />
        
          <Strike strikeClass={strikeClass}/>  */}
      {tiles.map((value, index) => (
        <Tile
          key={index}
          playerTurn={playerTurn}
          onClick={() => onTileclick(index)}
          value={value}
          className={`    
           ${index % 3 < 2 ? "right-border" : ""
            } ${index < 6 ? "bottom-border" : ""}
          
          ${tileToBeRemoved === index ? "highlight" : ""}`}
        />
      ))}
      <Strike strikeClass={strikeClass} />
    </div>
  );
}

export default Board;