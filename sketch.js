
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var tower;

function preload(){
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  towerImg = loadImage("tower.png");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  doorsGroup = new Group();
  climbersGroup = new Group();
  tower = createSprite(300, 300);
  tower.velocityY=1;
  tower.addImage(towerImg)
  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.35
  ghost.setCollider("rectangle", 0, 0, 150, 250)
  invisibleBlockGroup = new Group();


}

function draw() {
  background(200);
  
  if (gameState === "play"){


  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 2
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 2
    }

    if(keyWentDown("space")){
      ghost.velocityY = -4;
    }

    ghost.velocityY = ghost.velocityY + 0.5

    if (climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){ 
      ghost.destroy(); 
      gameState = "over";
    }

    spawnDoors();

    drawSprites();
  }

  else if (gameState === "over"){
      background("black")
      textSize(35);
      fill("red");
      text("Game Over", 210, 300);
;  }
}

function spawnDoors(){
  if (frameCount % 250 === 0){

    var door = createSprite(Math.round(random(150, 450)), -82);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 750;
    doorsGroup.add(door);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    var climber = createSprite(door.x, -10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 750;
    climbersGroup.add(climber);
    climber.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    var invisibleBlock = createSprite(200,-15); 
    invisibleBlock.velocityY = 1;
    invisibleBlock.width = climber.width; 
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
  }
}


