import { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import { io } from 'socket.io-client';
const url='http://localhost:3001';
const socket=io(url);
function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const sendMessage=()=>{
    if(name!=='' && room!==''){
      setShowChat(true);
      socket.emit('user_joined',room)
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <>
          <h1>Join room</h1>
          <input
            placeholder="enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="enter room id"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={()=>{
            sendMessage();
          }}>join room</button>
        </>
      ) : (
        <Chat socket={socket} name={name} room={room}/>
      )}
    </div>
  );
}

export default App;
