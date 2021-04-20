const socket = io("http://localhost:8086");

// Get DOM elements in respective Js variables
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const myname = document.querySelector(".myname");

// Audio that will play on recieving messages
var audio = new Audio("ting.mp3");

// Function which will append to the contaner
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add("row");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    //message send by others
    audio.play();
  }
};

// Ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
myname.innerText = "I am " + name;
socket.emit("new-user-joined", name);

// If a new user joins, receive his/her name from the server
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

// If server sends a message, receive it
socket.on("receive", (data) => {
  console.log("received message");
  append(`${data.name}: ${data.message}`, "left");
});

// If a user leaves the chat, append the info to the containe
socket.on("left", (name) => {
  append(`${name} left the chat`, "right");
});

// If the form gets submitted, send server the message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
