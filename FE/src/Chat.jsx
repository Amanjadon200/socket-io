import React, { useEffect, useState } from "react";

const Chat = ({ socket, name, room }) => {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = () => {
    const data = {
      name: name,
      room: room,
      time: new Date().getHours() + ":" + new Date().getMinutes(),
      message: chat,
    };
    setMessages((message)=>{return [...message, data]});
    socket.emit("receive_message", data);
  };
  useEffect(() => {
    socket.on("getMessageFromEveryone", (data) => {
      setMessages((message)=>{return [...message, data]});
    });
  }, [socket]);
  return (
    <div>
      <div className="h-[100vh] flex flex-col items-center">
        <div className="chat-header text-2xl h-[10vh]">Live Chat-{name}</div>
        <div className={`chat-body text-sm h-[40vh] w-[30vw] border-1 border-blue-900 relative overflow-auto`}>
          {messages.map((message) => {
            return <><div className={`absolute ${message.name===name?'right-0':'left-0'} h-[30px]`}>{message.message + " "}</div><br/></>;
          })}
        </div>
        <div className="chat-body text-sm h-[20vh] mt-5">
          <input
            className="footer border-1 border-black outline-none p-2"
            placeholder="enter your message"
            value={chat}
            onChange={(e) => {
              setChat(e.target.value);
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
