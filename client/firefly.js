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
                if(f.alive==true &&theNet.caught(f)){
                    luckyBall+=1;
                    Session.set('counter', Session.get('counter') + 1);
                    f.alive =false;}
                }
           );
    //this.fireflyList = _.filter
}
theModel = new FireflyModel();
function renewModel(){
theModel = new FireflyModel();
for(var i=0;i<1000;i++){
    var myvx=Math.random()*10-5;
    var myvy=(Math.random()-0.5)*10;
    theModel.addFirefly(new Firefly(50,50,1,"black",myvx,myvy))

}
}
for(var i=0;i<1000;i++){
    var myvx=Math.random()*10-5;
    var myvy=(Math.random()-0.5)*10;
    theModel.addFirefly(new Firefly(50,50,1,"black",myvx,myvy))

}

counter =0;
luckyBall=0;
var lastTime = (new Date()).getTime();
function counterReturn(){
    return counter;
}
function draw(){
   drawContext = gameboard.getContext("2d");
    
    drawContext.fillStyle = "yellow";
    drawContext.fillRect(0,0,gameboard.width,gameboard.height);
    drawContext.strokeStyle = "#f00" ;
   
    
    _.each(theModel.fireflyList,
        function(f){
        if(!f.alive){return;}
        drawContext.strokeStyle = f.c;
        drawContext.beginPath();
        drawContext.arc(f.x*gameboard.width/100,
                        f.y*gameboard.height/100,
                        f.r*gameboard.width/100, 
                        0, 2*Math.PI,true);
        drawContext.fillStyle = 'green';
        drawContext.fill();
        drawContext.stroke();
    }
);
    move(drawContext); 
    
}
function move(drawContext){
    
    var net =theModel.net;
drawContext.strokeStyle =net.c;
drawContext.beginPath();
drawContext.arc(net.x*gameboard.width/100,
                        net.y*gameboard.height/100,
                        net.r*gameboard.width/100, 
                        0, 2*Math.PI,true);
drawContext.stroke();

   
}


daysLeft=0;
timeCounted=11;
var t;
function count10(){
    for(var i=0; i<8;i++){
    console.log(timeleft);
    timeleft-=1;
    timedMsg()
    }
}
keepGoing = true;
function timedCount()
 {   
     if(keepGoing){
     if(timeCounted>0){
         timeCounted--;
         t=setTimeout(function(){Session.set('timeleft', timeCounted);timedCount()},1000) ;
     }else{
        Session.set('timeleft',0);
        running=false;
     }
     }
 }


function gameLoop(){
    var theTime = (new Date()).getTime();
    var dt = theTime-lastTime;
    lastTime =theTime;
    var fps = 1000/(dt);
    theModel.update(dt/40);
    draw();
    $('#aaaaa').show();
    $('#bbbbb').show();

    if(running)
        window.requestAnimationFrame(gameLoop);
}

drawIt=draw;
var running =false;

function resetCounter(){
    counter=0;   
}
Session.setDefault('counter', 0);
Session.setDefault('timeleft', 10);



Template.firefly.events({
    
    "click #startgame":function(event){
        if(!running){
            luckyBall=0;
            Session.set('counter', 0); 
            timeleft=-1;
            Session.set('timeleft', 10);
            lastTime = (new Date()).getTime();
            running =true;
            timedCount();
            gameLoop();
        }
        
    },
    "click #pause":function(event){
         if(!running){
            lastTime = (new Date()).getTime();
            running =true;
            keepGoing=true;
            timedCount();
            gameLoop();
            $("#pause").html("pause");
         }else{
             keepGoing=false;
             timeCounted++;
            running = false;
            $("#pause").html("continue");
         }
    },
    "click #restart":function(event){
        renewModel();
        luckyBall=0;
        Session.set('counter', 0); 
        timeCounted=11;
        Session.set('timeleft', 11);
        lastTime = (new Date()).getTime();
        running =true;
        timedCount();
        gameLoop();
        
    },
    "click #Save":function(event){
      event.preventDefault();

		var ball = luckyBall;
		console.log(JSON.stringify(this));

            
        Gamer1.insert({uid:Meteor.userId(), ball:ball}); 
    }
    
})

Template.firefly.rendered = function(){
    
$('#aaaaa').hide();
$('#bbbbb').hide();
document.getElementById("gameboard").addEventListener('mousemove',
    function(e){
    if(running){
        theModel.net.x =100* (e.pageX-gameboard.offsetLeft)/gameboard.width;
        theModel.net.y = 100*( e.pageY-gameboard.offsetTop)/gameboard.height;
    }
}
);
}
Template.firefly.helpers({
	dead: function () {
      return Session.get('counter');
    },
    Gamer1: function(){return Gamer1.find({}, {sort:{ball: -1}, limit:10});},
    daysLeft:function(){ return Session.get('timeleft');
    }
})
Template.iGamer1.helpers({
	isTheGamer1: function(){return Meteor.userId() == this.uid}
});

Template.iGamer1.events({
	"click .jbsapp-delete-icon": function(){Gamer1.remove(this._id);}
})