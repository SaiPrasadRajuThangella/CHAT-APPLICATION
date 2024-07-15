let socket = io();
let username = "";

// console.log(socket)
const messageContainer = document.getElementById("Messages");
const btn = document.getElementById("Join-chat");
const usernameInput = document.getElementById("username-input");
const form = document.getElementById("form");
const chatroomContainer = document.getElementById("chatroom-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const sentMessage = document.getElementById("sent");
btn.addEventListener("click", (event) => {
  event.preventDefault();
  username = usernameInput.value;
  if (!username) {
    alert("Please enter the Username");
  } else {
    form.style.display = "none";
    chatroomContainer.style.display = "block";
    socket.emit("joined",username)
  }
});
let message = "";

sendButton.addEventListener("click", (e) => {
  e.preventDefault;
  sendMessage();
});

function sendMessage() {
  let message = messageInput.value.trim();
  if (message) {
    socket.emit("messageSent", { message, username });
    messageInput.value = "";

    
  } else {
    alert("Please enter message");
  }

}

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

socket.on("joined",(newUser)=>{
  
    console.log("userhas joined")
    messageContainer.innerHTML += `<h3 id="joined-chat">"${newUser}" has joined this chat! </h3>`;
  

})

socket.on("messageSent", (data) => {
  if (data.username === username) {
    renderMessage(data, true);
  } else { 
    renderMessage(data, false);
  }
  // console.log(data);
});

function renderMessage(data, mine) {
  if (mine) {
    messageContainer.innerHTML += `<div class="Message sent" id="UsernameProperty">${data.username}:</div> <div class="Message sent">${data.message}</div>`;
  } else {
    messageContainer.innerHTML += `<div class="Message recieved" id="UsernameProperty" >${data.username}:</div> <div class="Message recieved">${data.message}</div>`;
  }
  scrollToBottom();
}

function scrollToBottom() {
  messageContainer.scrollTop = messageContainer.scrollHeight;
}