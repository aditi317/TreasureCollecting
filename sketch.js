var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png"); 
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);

//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
gameOver=createSprite(width/2,height/2,10,20);
gameOver.addImage(endImg);
gameOver.scale=0.6;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  if(gameState===PLAY){
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  path.velocityY = 4;
  if(path.y > height ){
    path.y = height/2;
  }
    
    gameOver.visible=false;
    createCash();
    createJwellery(); 
    createDiamonds(); 
    createSword();
    
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      gameState=PLAY;
      treasureCollection=treasureCollection+50;
    }

    if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      gameState=PLAY;
      treasureCollection=treasureCollection+100;
    }

    if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      gameState=PLAY;
      treasureCollection=treasureCollection+150;
    }
    if(swordGroup.isTouching(boy)) {
      gameState=END;
    }
  }
    else if(gameState===END){
      gameOver.visible=true;
      path.velocityY=0;
      cashG.setVelocityEach(0);
      jwelleryG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
      swordGroup.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
      cashG.destroyEach();
      boy.destroy();
    }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width/4,30);
}

function createCash() {
  if(frameCount%100===0){
  var cash = createSprite(Math.round(random(50,width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
}
}
function createDiamonds() {
  if(frameCount%150===0){
  var diamonds = createSprite(Math.round(random(50,width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if(frameCount%200===0){
  var jwellery = createSprite(Math.round(random(50,width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
}
}
function createSword(){
  if(frameCount%250===0){
  var sword = createSprite(Math.round(random(50,width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
}
}