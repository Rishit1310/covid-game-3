const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
var engine,world,rand,image,infected,doctor,doctorimg,infectedimg,man1,man2,man3,man4,npcgroup;
var timer=1000
var gamestate=0
var Count=0

var infcount=0
var infectedScore=0
var doctorScore=0

function preload(){
    infectedimg=loadImage("corona.png")
    doctorimg=loadImage("doctor.png")
    man1=loadImage("man.png")
    man2=loadImage("man2.png")
    man3=loadImage("man3.png")
    man4=loadImage("man4.png")
}
function setup(){
createCanvas(900,500)

engine=Engine.create()
world=engine.world
edges = createEdgeSprites()
if(gamestate===0){
    form=new Form()
    form.display()
    form.button.mousePressed(()=>{
    if(Count===4){
        gamestate=1
    }
    })

}
infected=createSprite(700,350,10,10)
infected.addImage(infectedimg)
infected.visible=false

doctor=createSprite(30,50,30,30)
doctor.addImage(doctorimg)
doctor.scale=0.3
doctor.visible=false
infected.scale=0.3
npc1=createSprite(random(20,700),(40,400))
npc2=createSprite(random(20,700),(40,400))
npc3=createSprite(random(20,700),(40,400))
npc4=createSprite(random(20,700),(40,400))
npc1.addImage(man1)
npc2.addImage(man2)
npc3.addImage(man3)
npc4.addImage(man4)
npc1.visible=false
npc2.visible=false
npc3.visible=false
npc4.visible=false
npc1.scale=0.3
npc2.scale=0.4
npc3.scale=0.2
npc4.scale=0.5
npc1.debug=true
npc2.debug=true
npc3.debug=true
npc4.debug=true
doctor.debug=true

}

function draw(){
    background("red")
   if(gamestate===0){
       text("NOTE: PLEASE CHOOSE ONE ANSWER ONLY ONCE ELSE RELOAD THE PAGE ",200,450)
   }
    Engine.update(engine)
    text(mouseX+","+mouseY,mouseX,mouseY)
    if(gamestate===1){
        timer=timer-0.1
        text("Timer:"+timer,750,50)
        doctor.visible=true
        infected.visible=true
        form.hide()    
//------------------doctor controls---------------
        if(keyDown("w")){
            doctor.position.y-=5
        }
        if(keyDown("a")){
            doctor.position.x-=5
        }   
        if(keyDown("s")){
            doctor.position.y+=5
        }    
        if(keyDown("d")){
            doctor.position.x+=5
        }
//---------------covid controls----------------------
        
    if(keyDown("space")){
       
            infected.velocityX=3
                infected.velocityY=-4
        
    }
infected.bounceOff(edges,randomvelocity)
//------------------npc--------------------------------------
        npc1.visible=true
        npc2.visible=true
        npc3.visible=true
        npc4.visible=true
        newnpc()
//-----------end state---------
    if(infected.isTouching(npc3)||infected.isTouching(npc4)){
        infcount=infcount+1
        console.log(infcount)
    }
    if(doctor.collide(npc1)||doctor.collide(npc2)){
        infectedScore-=1
        doctorScore+=1
    }

    if(infcount===5){
        infcount=0
        infectedScore+=1
        doctorScore-=1
    }
    text("Doctor:"+doctorScore,200,20)
    text("infected:"+infectedScore,400,20)


    }
   
        drawSprites()
        doctor.collide(edges)
        
}

function newnpc(){
    /*if(frameCount%100===0){

        npc1=createSprite(random(20,700),random(20,500))
        rand=Math.round(random(1,4))
        if(rand==1){
            npc1.addImage(man1)
            npc1.scale=1.3
        }
        else if(rand==2){
            npc1.addImage(man2)
            npc1.scale=1.3
        }
        else  if(rand==3){
            npc1.addImage(man3)
            npc1.scale=0.2
        }
        else   if(rand==4){
            npc1.addImage(man4)
            npc1.scale=0.5
        }
        npc1.lifetime=200
        npcgroup.add(npc1)
    }*/
 
    if(frameCount%500===0){
        npc1.x=Math.round(random(20,500))
        npc2.x=Math.round(random(20,400))
        npc3.x=Math.round(random(20,500))
        npc4.x=Math.round(random(20,600))
        npc1.y=Math.round(random(20,200))
        npc2.y=Math.round(random(20,500))
        npc3.y=Math.round(random(20,300))
        npc4.y=Math.round(random(20,500))
    }

}
function randomvelocity(){
    infected.velocityX=random(-4,4)
    infected.velocityY=random(-3,3)
}