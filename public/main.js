
const chatForm=document.getElementById('chat-form')
const chatmsg=document.getElementById('chat-messages')
const roomName=document.getElementById('room-name')
const userlist=document.getElementById('users')

const{fname,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true,
})

console.log({fname, room});

const socket=io()

socket.on('message', msg=>{
    console.log(msg);
    outputMsg(msg);

    //auto scroll to bottom
    chatmsg.scrollTop=chatmsg.scrollHeight;
})

//trigger event for getting message text and send it to server
chatForm.addEventListener('submit', e=>{
    e.preventDefault(); 

    const msg= e.target.elements.msg.value;

    //sending to server
    socket.emit('chatMsg', msg)

    //clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus(); //highlight the field
})

function outputMsg(msg){
    const div=document.createElement('div')
    div.classList.add('message')
    div.innerHTML=`<p> XYZ<span> ${msg.time} </span></p>
    <p>${msg}</p>`
    document.querySelector('.chat-messages').appendChild(div)
}



