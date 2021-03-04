let dataServer;
let pubKey = config.pubKey;
let subKey = config.subKey;

let sendText;
let sendButton;
let sending = [];
let receiving = [];

let channelName = "messageChannel";
let incomingText = ""; 


function setup() {
  createCanvas(400, 400);
  fill(255,200,0);
  textSize(24);
  
  dataServer = new PubNub({
    publish_key   : pubKey, 
    subscribe_key : subKey,  
    ssl: true  
  });
  
  dataServer.addListener({ message: readIncoming});
  dataServer.subscribe({channels: [channelName]});
  
  sendText = createInput();
  sendText.position(5,height-100);
  
  sendButton = createButton('Post Message');
  sendButton.position(sendText.x + sendText.width,height-100);
  sendButton.mousePressed(sendTheMessage);
}

function draw() {
  background(0,60,0);
  
  // text(incomingText, 10, 10, 200,200);
  // text(sendText.value(), 40, 40, 200,200);
  
  // createP('this is some text');
  
  let y = 10
  
  // for (let i=0; i < sending.length; i++){
  //   text(sending[i], 10, y+=20,100,40)
  // }
  
  for (let i=0; i < receiving.length; i++){
    text(receiving[i], 100, y+=40,300,40)
  }
}

function sendTheMessage() {
  dataServer.publish({
      channel: channelName,
      message: {
        messageText: sendText.value()  
      }
    });
  
    let chat = sendText.value() 

    sending.push(chat)
}

function readIncoming(inMessage) {        
  
  if(inMessage.channel == channelName){
  incomingText = inMessage.message.messageText;
  }
  console.log(incomingText);
  receiving.push(incomingText)
}

