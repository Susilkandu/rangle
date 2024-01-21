const uname=document.getElementById('uname');
const puname=document.getElementById('puname').innerText;
const pgender=document.getElementById('pgender').value;
const country= document.getElementById('pcountry');
const RandomId=document.getElementById('RandomId');
const id=document.getElementById('id');
const submit=document.getElementById('submit');
function predetailer()
{
uname.value=puname;   
id.value=RandomId.innerText;
};
predetailer();
uname.addEventListener('blur',()=>{
    console.log(uname.value);
    let regex=/^[a-zA-Z]([a-zA-Z]){2,20}/;
    let str=uname.value;
    let validation=false;
    if (regex.test(str)) {
    document.getElementById('unamemessage').innerHTML='';    
validation=true;
} else {
        document.getElementById('unamemessage').innerHTML='please start user name with the character and length must is be 3';
 validation=false;
   }
});
