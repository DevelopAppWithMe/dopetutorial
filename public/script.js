let all_user = document.getElementById("all_users");
let btn = document.getElementById("btn");
let msg = document.getElementById("msg");
let name = document.getElementById("name");
let chat = document.getElementById("chat");

let socket = new io("https://mygreatchatapplication.herokuapp.com/");

socket.on("all_user", (data) => {
  all_user.innerHTML = "";
  data.forEach((soc_id) => {
    all_user.innerHTML += `<button>${soc_id} </button> <br />`;
  });
});

btn.onclick = () => {
  let msg_txt = msg.value;
  let name_txt = name.value;

  if (msg_txt === "" || name_txt === "") {
    window.alert("please write a msg");
  } else {
    socket.emit("msg", {
      msg: msg_txt,
      name: name_txt,
    });
  }
};

window.onload = () => {
  socket.on("new_msg", (all_msg) => {
    chat.innerHTML = "";
    all_msg.forEach((msg) => {
      chat.innerHTML += `
            <div>
                  <b>${msg.name}</b> : <span>${msg.msg}</span>
            </div>
          `;
    });
  });
};
