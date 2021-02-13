let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io")(server);

//middleares
app.use(express.static("public"));

let sockets = [];
let array_msg = [];

io.on("connection", (socket) => {
  //saveing the user
  sockets.push(socket);
  console.log(
    `New user connected [${socket.id}] Total user - ${sockets.length}`
  );

  sockets.forEach((socc) => {
    socc.emit("new_msg", array_msg);
  });

  socket.on("msg", (data) => {
    array_msg.push(data);
    sockets.forEach((socc) => {
      socc.emit("new_msg", array_msg);
    });
  });

  sockets.forEach((soc) => {
    soc.emit(
      "all_user",
      sockets
        .map((socc) => {
          return socc.id;
        })
        .filter((id) => {
          return id !== soc.id;
        })
    );
  });

  socket.on("disconnect", () => {
    //remove the socket from sockets
    sockets = sockets.filter((soc) => {
      return soc.id !== socket.id;
    });

    //console log
    console.log(
      `User disconnected [${socket.id}] Total user - ${sockets.length}`
    );
  });
});

let port = process.env.PORT || 8080;
server.listen(port, () => console.log("server started "));
