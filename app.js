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
        {id:"1", u:"owner", p:"1234", role:"OWNER", score:0, games:0},
        {id:"2", u:"admin", p:"1234", role:"ADMIN", score:0, games:0},
        {id:"3", u:"user", p:"1234", role:"USER", score:0, games:0}
      ],
      session:null
    };
    DB.save(d);
  }
}

init();

/* VIEW SYSTEM */
function setView(v){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById(v).classList.remove("hidden");
}

/* AUTH */
function openAuth(){
  document.getElementById("auth").classList.remove("hidden");
}

function closeAuth(){
  document.getElementById("auth").classList.add("hidden");
}

/* LOGIN */
function login(){
  let d = DB.get();

  let u = document.getElementById("u").value;
  let p = document.getElementById("p").value;

  let user = d.users.find(x=>x.u===u && x.p===p);

  if(!user){
    alert("Wrong login");
    return;
  }

  d.session = user.id;
  DB.save(d);

  closeAuth();
  loadUser();
}

/* SIGNUP */
function signup(){
  let d = DB.get();

  let u = document.getElementById("u").value;
  let p = document.getElementById("p").value;

  if(d.users.find(x=>x.u===u)){
    alert("Taken");
    return;
  }

  d.users.push({
    id:Date.now().toString(),
    u,p,
    role:"USER",
    score:0,
    games:0
  });

  DB.save(d);
  alert("Created");
}

/* LOAD USER */
function loadUser(){
  let d = DB.get();
  let u = d.users.find(x=>x.id===d.session);

  if(!u) return;

  document.getElementById("userChip").innerText = u.u + " | " + u.role;

  document.getElementById("profile").innerHTML =
    "User: " + u.u + "<br>Role: " + u.role;

  document.getElementById("score").innerText = u.score;
  document.getElementById("gamesPlayed").innerText = u.games;
}

/* TYPE EFFECT */
let words=["trust","verify","sleep","prove"];
let i=0;

setInterval(()=>{
  let el=document.getElementById("type");
  if(el) el.innerText=words[i++%words.length];
},2000);

/* SNAKE */
const c=document.getElementById("snake");
const ctx=c?c.getContext("2d"):null;

let snake=[{x:5,y:5}];
let dir={x:1,y:0};
let food={x:10,y:10};

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowUp")dir={x:0,y:-1};
  if(e.key==="ArrowDown")dir={x:0,y:1};
  if(e.key==="ArrowLeft")dir={x:-1,y:0};
  if(e.key==="ArrowRight")dir={x:1,y:0};
});

function loop(){
  if(!ctx) return;

  let head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
  snake.unshift(head);

  if(head.x===food.x && head.y===food.y){
    food={x:Math.random()*20|0,y:Math.random()*20|0};
  } else snake.pop();

  ctx.clearRect(0,0,400,400);

  ctx.fillStyle="lime";
  snake.forEach(s=>ctx.fillRect(s.x*20,s.y*20,18,18));

  ctx.fillStyle="red";
  ctx.fillRect(food.x*20,food.y*20,18,18);
}

setInterval(loop,120);

/* MEMORY */
const mem=document.getElementById("memory");

if(mem){
  for(let i=0;i<4;i++){
    let b=document.createElement("button");
    b.innerText=i;
    b.onclick=()=>alert("step "+i);
    mem.appendChild(b);
  }
}
