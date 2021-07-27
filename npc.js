class npc{
constructor(x,y){
var options={
    isStatic:true
}
this.body=Bodies.rectangle(x,y,20,20,options)
World.add(world,this.body)
manimg=loadImage

}
display(){
        imageMode(CENTER)
    var pos=this.body.position

}
}