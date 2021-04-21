// const { text } = require("body-parser");
// const { rejects } = require("node:assert");

var chat_input;
var chat_button;



const CHAT_HEIGHT = 50;
const CHAT_WIDTH = 300;
const BUFFER = 10;

var backLog = [];


var music_respones = ["I love singing with my mouth parts because I am human", "music is a hobby that I partake in as a human"];
var sport_responses = ["i love exercising with my physical body", "I love playing sports with my two human legs","sports are great"];
var technology_responses = ['Wow that is very cool I am a robot beep boop',"technology is COOL YO","i am technology"];
var politics_responses = ['I am also very interested in politics',"I love governments","We are all sheep I am human"];
var gaming_responses = ['I suck at video games',"I love video games I am human","My favorite game company is Blizzard"];
var cnv;

function setup() {
  let pee = createP("Welcome to my spaghetti code chat bot! Talk about anything you'd like :) but be aware that the bot LOVES talking about their hobbies, including SPORTS, MUSIC, TECHNOLOGY, GAMING, and POLITICS. Wow! What a multifaceted personality!");
  pee.position(650,60);
  pee.style("color", "white");
  pee.style("width","500px");
  pee.style("font-size","48px");

  cnv = createCanvas(540, 960);

  chat_input = createInput('Chat with me!');
  chat_input.style('margin', '60px');
  chat_input.size(420);
  chat_button = createButton("Enter");
  chat_button.style('margin', '0px');
  chat_button.mousePressed(enteredChat);

  machine_text = createP();

  // set up socket
  socket = io.connect('http://localhost:3000');
  socket.on('guess', makeAGuess);
}

function enteredChat(){
  var chat_text = chat_input.value();
  backLog.splice(0,0,new message("user",chat_input.value()));

  // send data to server
  socket.emit('guess', chat_text);
}

function makeAGuess(data){
  console.log("guessing!");
  
  switch(data){ //THIS IS UGLY FIX THIS LATER!!!!
    case "music":
      backLog.splice(0,0,new message("bot",music_respones[Math.floor(Math.random() * music_respones.length)]));
      break;
    case "sports":
      backLog.splice(0,0,new message("bot",sport_responses[Math.floor(Math.random() * sport_responses.length)]));
      break;
    case "technology":
      backLog.splice(0,0,new message("bot",technology_responses[Math.floor(Math.random() * technology_responses.length)]));
      break;
    case "politics":
      backLog.splice(0,0,new message("bot",politics_responses[Math.floor(Math.random() * politics_responses.length)]));
      break;
    case "gaming":
      backLog.splice(0,0,new message("bot",gaming_responses[Math.floor(Math.random() * gaming_responses.length)]));
      break;
  }
  console.log(backLog);

  // if(data == 'music'){
  //   machine_text.html(music_respones[Math.floor(Math.random() * music_respones.length)]);
  // } else if(data == 'sports'){
  //   machine_text.html(sport_responses[Math.floor(Math.random() * sport_responses.length)]);
  // }else if(data == 'technology'){
  //   machine_text.html(technology_responses[Math.floor(Math.random() * technology_responses.length)]);
  // }else if(data == 'politics'){
  //   machine_text.html(politics_responses[Math.floor(Math.random() * politics_responses.length)]);
  // }else if(data == 'gaming'){
  //   machine_text.html(gaming_responses[Math.floor(Math.random() * gaming_responses.length)]);
  // }
}

function draw() {
  background('#EF4648');
  textSize(32);
  stroke('#EFEEEE');
  for (var i = 0; i < backLog.length; i++){//HERE COMES THE LOGIC BABY
    switch(backLog[i].sender){
      case "bot":
        push();
        fill(255);
        translate(BUFFER,height - (BUFFER+CHAT_HEIGHT)*(i+1));
        rect(0,0,CHAT_WIDTH,CHAT_HEIGHT,15);
        fill(0);
        textSize(16);
        text(backLog[i].content,0+5,0+6,CHAT_WIDTH,CHAT_HEIGHT);
        pop();
        break;
      case "user":
        push();
        fill(255);
        translate(width-CHAT_WIDTH-BUFFER,height - (BUFFER+CHAT_HEIGHT)*(i+1));
        rect(0,0,CHAT_WIDTH,CHAT_HEIGHT,15);
        fill(0);
        textSize(16);
        text(backLog[i].content,0+5,0+6,CHAT_WIDTH,CHAT_HEIGHT);
        pop();
        break;
    }
  }
}


class message{
  constructor(sender, content){
    this.sender = sender;
    this.content = content;
  }
}