
const DB = {
  get(){
    return JSON.parse(localStorage.getItem("cairn") || "{}");
  },
  save(d){
    localStorage.setItem("cairn", JSON.stringify(d));
  }
};

function init(){
  let d = DB.get();

  if(!d.users){
    d = {
      users:[
        {id:"1", u:"admin", p:"1234", role:"ADMIN"}
      ],
      session:null
    };
    DB.save(d);
  }
}

init();

/* OPEN / CLOSE MODAL */
function openLogin(){
  document.getElementById("loginModal").classList.remove("hidden");
}

function closeLogin(){
  document.getElementById("loginModal").classList.add("hidden");
}

/* LOGIN */
function login(){
  let d = DB.get();

  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  let user = d.users.find(x => x.u === u && x.p === p);

  if(!user){
    alert("Wrong login");
    return;
  }

  d.session = user.id;
  DB.save(d);

  closeLogin();
  showDashboard(user);
}

/* SHOW DASHBOARD */
function showDashboard(user){
  document.getElementById("hero").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  document.getElementById("userBox").innerHTML =
    "Welcome " + user.u + " (" + user.role + ")";
}

/* LOGOUT */
function logout(){
  let d = DB.get();
  d.session = null;
  DB.save(d);

  location.reload();
}
