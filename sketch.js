var ground;  
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;
var survivalTime = 0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");    
 
}
function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;

  console.log(ground.x);

  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() {
  background("lightblue");
  if (gameState === PLAY){
    if (ground.x<50){
      ground.x = 400;
    }
  
    if (monkey.isTouching(bananaGroup)){
      score = score+1;
      bananaGroup.destroyEach();
      }
    
    if(monkey.isTouching(obstaclesGroup)){
      gameState = END;
      obstaclesGroup.destroyEach();
      bananaGroup.destroyEach();
    }
    
  
    if(frameCount % 60 === 0){  
       bananaSpawn();
    }  
    
    if(frameCount % 100 === 0){
      obstacleSpawn();
    }
  
    stroke("white");
    textSize(20);
    fill("white");
    text("Score :" + score, 500,50);
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time: " + survivalTime, 10,50);
  
    
  if (keyDown("space")){
    monkey.velocityY = -12 +1;
  }
/*  if (ground.y = 303){
    monkey.velocityY = monkey.velocityY+11.5;
   }*/
  }
  
  if(gameState === END){
    if (ground.x<50){
    ground.x = 400;
  }
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
  }
  
  drawSprites();
}

function bananaSpawn(){
  banana = createSprite(420,250,10,10);
  banana.addImage(bananaImage);
  banana.velocityX = -4;
  banana.scale = 0.1;
  banana.lifetime = 100;
  bananaGroup.add(banana)
}

function obstacleSpawn(){
  obstacle = createSprite(420,330,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -4;
  obstacle.scale = 0.1;
  obstacle.lifetime = 100;
  obstaclesGroup.add(obstacle);
}


