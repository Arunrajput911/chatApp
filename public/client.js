const socket = io();

let name;

let textarea = document.querySelector("#text-area");
let messageArea = document.querySelector('.message-area');

do {
  name = prompt('please enter your name')
}while(!name)

textarea.addEventListener('keyup',(e) => {
   if(e.key === 'Enter'){
    sendMessage(e.target.value)
   }
})

function sendMessage(message) {
   let msg = {
       user:name,
       message:message.trim()
   }
  //append message

  appendMessage(msg,'outgoing')
  textarea.value = ''
  scrollToBottom()

  //send to server and message can be anything
  socket.emit('message',{
    user:name,
    message:message.trim()
  })

}

function appendMessage(msg,type){
   let mainDiv = document.createElement('div')
   let className = type
   mainDiv.classList.add(className,'message')

  let markup = 
  ` 
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>

  `
  mainDiv.innerHTML = markup
  messageArea.appendChild(mainDiv);

}

//Recieve message

socket.on('message',(msg) => {
   appendMessage(msg,'incoming')
   scrollToBottom();
})

//scroll krne ke liye messages
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}