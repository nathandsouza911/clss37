class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef=await database.ref("playerCount").once("value");
      if(playerCountRef.exists()){
        playerCount=playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("game start",120,100);
    Player.getPlayerInfo()

    if(allPlayers!==undefined){
      var display_position=130
      for(var plr in allPlayers){
          if(plr==="player"+player.index){
            fill("red")
          }else{
            fill("black")
          }
        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ":" + allPlayers[plr].distance,120,display_position)
      }
    }
    if(keyDown(UP_ARROW)&& player.index!==null){
      player.distance+=20;
      player.update()
    }
  }
}


// allPlayers=[player1,player2,player3,player4]=plr
// players
//     player1
//       name
//       distance
//     player2
//       name
//       distance
//     player3
//     player4

// nathan:50
// rakhi:30
// rr:6
// tt:90
