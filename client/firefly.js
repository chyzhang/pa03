function FireflyNet(x,y,r,c){
           this.x=x;
    this.y=y;
    this.r=r;
    this.c=c;
}
function Firefly(x,y,r,c,vx,vy){
    this.x=x;
    this.y=y;
    this.r=r;
    this.c=c;
    this.vx=vx;
    this.vy=vy;
    this.alive =true;
    
}

FireflyNet.prototype.caught = function(f){
    var d =distFromOrigin(f.x-this.x,f.y-this.y);
    return (d<f.r+this.r);
}

function distFromOrigin(x,y) {
    return Math.sqrt(x*x+y*y);}

Firefly.prototype.update = function(dt){
    if(this.y+this.r>=100||this.y-this.r<=0) this.vy*=-1;
    if(this.x+this.r>=100||this.x-this.r<=0) this.vx*=-1;
    this.x += this.vx*dt;
    this.y += this.vy*dt;
    
}


f1 = new Firefly(50,50,25,"black", 10,-5);
f2= new Firefly(50,50,10,"red",25,15);

function FireflyModel(w,h){
    this.w=100;
    this.h=100;
    this.net = new FireflyNet(10,10,10,"red");
    this.fireflyList= [];
    this.bgcolor = "#eee";
    
}

FireflyModel.prototype.addFirefly = function (f){
    this.fireflyList.push(f);
}
FireflyModel.prototype.update = function(dt){
    var theNet = this.net;
    _.each(this.fireflyList, 
           function(f){
                f.update(dt);
                if(theNet.caught(f)){
                    f.alive =false;}
                }
           );
    //this.fireflyList = _.filter
}
theModel = new FireflyModel();
theModel.addFirefly(f1);
theModel.addFirefly(f2);
for(var i=0;i<100;i++){
    var myvx=Math.random()*10-5;
    var myvy=(Math.random()-0.5)*10;
    theModel.addFirefly(new Firefly(50,50,1,"black",myvx,myvy))

}

var counter =0;
var lastTime = (new Date()).getTime();

function draw(){
    var drawContext = gameboard.getContext("2d");
    
    drawContext.fillStyle = "yellow";
    drawContext.fillRect(0,0,gameboard.width,gameboard.height);
    drawContext.strokeStyle = "#f00" ;
   
    
    _.each(theModel.fireflyList,
        function(f){
        if(!f.alive)return;
        drawContext.strokeStyle = f.c;
        drawContext.beginPath();
        drawContext.arc(f.x*gameboard.width/100,
                        f.y*gameboard.height/100,
                        f.r*gameboard.width/100, 
                        0, 2*Math.PI,true);
        drawContext.stroke();
    }
);
        
    var net =theModel.net;
drawContext.strokeStyle =net.c;
drawContext.beginPath();
drawContext.arc(net.x*gameboard.width/100,
                        net.y*gameboard.height/100,
                        net.r*gameboard.width/100, 
                        0, 2*Math.PI,true);
drawContext.stroke();

    
    
}


function gameLoop(){
    var theTime = (new Date()).getTime();
    var dt = theTime-lastTime;
    lastTime =theTime;
    var fps = 1000/(dt);
    theModel.update(dt/1000);
    draw();


    if(running)
        window.requestAnimationFrame(gameLoop);
}

drawIt=draw;
var running =false;


Template.firefly.events({
    
    "click #startgame":function(event){
        if(!running){
            lastTime = (new Date()).getTime();
            running =true;
            gameLoop();
            $("#startgame").html("Stop");
        }else{
            running = false;
            $("#startgame").html("Start");

        }
    }
})
Template.firefly.rendered = function(){
document.getElementById("gameboard").addEventListener('mousemove',
    function(e){
    if(running){
        theModel.net.x =100* (e.pageX-gameboard.offsetLeft)/gameboard.width;
        theModel.net.y = 100*( e.pageY-gameboard.offsetTop)/gameboard.height;
    }
}
);
}