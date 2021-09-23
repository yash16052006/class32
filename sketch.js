const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;

var cutSound, eatSound, bgSound, airBlow, sadSound;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  cutSound = loadSound("rope_cut.mp3");
  eatSound = loadSound("eating_sound.mp3");
  bgSound= loadSound("sound1.mp3");
  airBlow = loadSound("air.wav");
  sadSound = loadSound("sad.wav");


    
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  bgSound.play();
  bgSound.setVolume(0.1);
  

  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  blower = createImg('blower.png');
  blower.position(10,250);
  blower.size(50,50);
  blower.mouseClicked(blowAir);
  
  muteButton = createImg('mute.png');
  muteButton.position(450,30);
  muteButton.size(50,50);
  muteButton.mouseClicked(mute);
  
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(450,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

   

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }



  rope.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    eatSound.play();
    bunny.changeAnimation('eating');
  }
   
  if(collide(fruit,ground.body)==true )
  {
    sadSound.play();
     bunny.changeAnimation('crying');
   }

   drawSprites();
}

function drop()
{
  cutSound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

 function blowAir(){

    Matter.Body.applyForce(fruit, {x:0, y:0},{x:0.01, y:0} );
    airBlow.play();

 }

 function mute(){
   if(bgSound.isPlaying()){
       bgSound.stop();
   }
   else{
    bgSound.play();
   }
 }

 function keyPressed(){
    if(keyCode == RIGHT_ARROW){
       //blowAir();
       bunny.x = bunny.x+5;
    }
    if(keyCode == LEFT_ARROW){
      //blowAir();
      bunny.x = bunny.x-5;
   }
 }