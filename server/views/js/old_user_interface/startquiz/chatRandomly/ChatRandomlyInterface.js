let socket = io();
let RandomId = document.getElementById('RandomId');
setTimeout(() => {
    socket.emit('rChatRandomly', RandomId.innerText);
}, 0);
let messagearea = document.getElementById('messagearea');
let message = document.getElementById('message');
let send = document.getElementById('send');
let constatus=document.getElementById('status');
let roomId=document.getElementById('RoomId');
let tstatus=document.getElementById('tstatus');
function findMessage(message) {
    return message.value;
};
function next() {
    let rid=roomId.innerText;
    socket.emit('delete',rid);
    window.location.reload();
};
function auth() {
    let rid= roomId.innerText;
    if (rid) {
        return true;
    };
};
message.addEventListener('input',()=>
{
    let rid=roomId.innerText;
    let authr=auth();
    if (authr==true) {
        socket.emit('typing',rid);
    };
});
message.addEventListener('keyup',()=>
{
    let rid=roomId.innerText;
    let authr=auth();
    if (authr==true) {
        if (message.value) {
            setTimeout(() => {
                socket.emit('typingstop',rid);        
            }, 1000);
        }
    };
    
    
});
socket.on('joined',(rid)=>
{ 
    socket.emit('kaunhai',rid);
    roomId.innerText=rid;
    document.getElementById('next').style.display='block';
});
socket.on('mainhu',(fid,fname,sid,sname)=>
{ 
    let Randomid=RandomId.innerText;
    if(Randomid==fid)
    {
        constatus.innerText=sname;   
    }
    else{
        constatus.innerText=fname;
    }
});
function messageappender(message,clas)
{   
    let div = document.createElement('div');
    div.innerText = message;
    div.className = clas;
    messagearea.appendChild(div);
};
send.addEventListener('click', () => {
    let authr=auth();
    if (authr==true) {
        let data = findMessage(message);
        if (data) {
            let rid=roomId.innerText;
            messageappender(data,'right');
            socket.emit('message',data,rid);
            message.value = '';
        };    
    };
});
socket.on('incommingmsg',(message)=>
{
  let authr=auth();
  if (authr==true) {
    console.log('Jay Shree Ram');
    messageappender(message,'left');
  };
});
socket.on('styping',(()=>{
    let authr=auth();
    if (authr==true) {
        tstatus.innerText='  Typing';   
    }
}));
socket.on('stypingstop',()=>
{
    let authr=auth();
    if (authr==true) {
        tstatus.innerText=' ';
    }
});
socket.on('left',()=>
{
    tstatus.innerText='Left';
    roomId.innerText='';
});