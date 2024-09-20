import { Server } from "socket.io";
import { logger } from "../utils/logger";
import { createAdapter } from "@socket.io/redis-adapter";
import { redis } from "../utils/db";
import { Server as httpServer } from "http";

const pubClient = redis.duplicate()
const subClient = redis.duplicate();

export const socket = (server: httpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // You can restrict the origin for production
    },
  });

  io.adapter(createAdapter(pubClient, subClient));

  io.on("connection", (socket) => {
    logger.info("New client connected", socket.id);

    const handlePublicMessage = (data: any) => {
      logger.info(`Message received: ${data}`);
      socket.broadcast.emit("message", data); // Broadcast to all other clients
    };

    const handlePrivateMessage = ({ to, message }: { to: string; message: string }) => {
      logger.info(`Private message from ${socket.id} to ${to}: ${message}`);
      // Send the private message to the recipient
      socket.to(to).emit("private-message", {
        from: socket.id,
        message,
      });
    };

    const handleJoinRoom = (room: any) => {
      socket.join(room);
      logger.info(`${socket.id} joined room ${room}`);
    };

    const handleRoomMessage = ({ room, message }: { room: string; message: string }) => {
      logger.info(`Message to room ${room}: ${message}`);
      io.to(room).emit("room-message", { userId: socket.id, message });
    };

    const sendNotification = (message: string) => {
      io.emit("notification", { message });
    };

    socket.on("chat-message", handlePublicMessage);
    socket.on("private-message", handlePrivateMessage);
    socket.on("join-room", handleJoinRoom);
    socket.on("room-message", handleRoomMessage);
    sendNotification("Welcome! You are connected to the server.");

    pubClient.on("error", (err) => {
      logger.error("Redis pubClient error:", err);
    });

    subClient.on("error", (err) => {
      logger.error("Redis subClient error:", err);
    });

    socket.on("disconnect", () => {
      logger.info("Client disconnected", socket.id);
    });
  });

  return io;
};

//---------------------------------------------------public message
// <body>
//   <h1>Real-Time Chat</h1>
//   <div id="chat">
//     <ul id="messages"></ul>
//   </div>
//   <input id="messageInput" placeholder="Enter message" autocomplete="off"/>
//   <button id="sendBtn">Send</button>

//   <script src="/socket.io/socket.io.js"></script>
//   <script>
//     const socket = io('http://localhost:3000');

//     const messageInput = document.getElementById('messageInput');
//     const messagesList = document.getElementById('messages');

//     // Send message to server when button is clicked
//     document.getElementById('sendBtn').onclick = () => {
//       const message = messageInput.value;
//       if (message) {
//         socket.emit('chat-message', message);
//         appendMessage(`You: ${message}`);
//         messageInput.value = ''; // clear input
//       }
//     };

//     // Listen for messages from server
//     socket.on('chat-message', (data) => {
//       appendMessage(`${data.userId}: ${data.message}`);
//     });

//     // Handle user disconnection
//     socket.on('user-disconnected', (userId) => {
//       appendMessage(`${userId} has disconnected`);
//     });

//     // Append message to chat window
//     function appendMessage(message) {
//       const li = document.createElement('li');
//       li.textContent = message;
//       messagesList.appendChild(li);
//     }
//   </script>
// </body>

//---------------------------------------------------Notification message
// <script src="/socket.io/socket.io.js"></script>
// <script>
//   const socket = io('http://localhost:3000');

//   // Listen for notifications from the server
//   socket.on('notification', (data) => {
//     alert(`Notification: ${data.message}`);
//   });
// </script>

//----------------------------------------------------Room
// <script src="/socket.io/socket.io.js"></script>
// <script>
//   const socket = io('http://localhost:3000');

//   // Join a room
//   socket.emit('join-room', 'room1');

//   // Send a message to the room
//   function sendRoomMessage(message) {
//     socket.emit('room-message', {
//       room: 'room1',
//       message,
//     });
//   }

//   // Listen for messages from the room
//   socket.on('room-message', (data) => {
//     logger.info(`Message from ${data.userId}: ${data.message}`);
//   });
// </script>

//------------------------------------------------------Private Message
// <script src="/socket.io/socket.io.js"></script>
// <script>
//   const socket = io('http://localhost:3000');

//   const recipientId = 'TARGET_SOCKET_ID'; // The socket ID of the recipient

//   // Send a private message to another user
//   function sendPrivateMessage(message) {
//     socket.emit('private-message', {
//       to: recipientId,
//       message,
//     });
//   }

//   // Listen for incoming private messages
//   socket.on('private-message', (data) => {
//     logger.info(`Private message from ${data.from}: ${data.message}`);
//   });
// </script>
