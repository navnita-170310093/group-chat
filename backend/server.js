const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

const axios = require('axios')

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); 

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/admin", adminRoutes);



// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

async function performSignupRequest() {
  const config = {
    headers: {
      Role: "admin",
    },
  };
  try {
      await axios.post('http://localhost:5000/api/user', {
        name: "Navnita",
        email: "navnita@gmail.com",
        password: "1234",
        address: "Bhagalpur",
        about: "Developer",
        isAdmin: true
      },config);
      console.log('Default signup request completed successfully.');
  } catch (error) {
    console.log(error)
      console.error('Error during default signup:', error.message);
  }
}

const PORT = 5000

const server = app.listen(
  PORT,()=>{
  console.log(`Server running on PORT ${PORT}...`)
  setTimeout(() => {
    performSignupRequest();
}, 5000)
  }
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });



  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
