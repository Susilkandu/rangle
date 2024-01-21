console.log('jay maa saraswati devi');
const uname=document.getElementById('uname');
const email=document.getElementById('email');   
const mobilenumber=document.getElementById('mobilenumber');
const npassword=document.getElementById('npassword');
const repassword=document.getElementById('repassword');
const formsubmit=document.getElementById('formsubmit');
const dob=document.getElementById('dob');
function dobber() {
    let date=new Date();
let day= date.getDate();
let month=date.getMonth()+1;
let year=date.getFullYear();
let currentDate= `${year}-${month}-0${day}`;
dob.max=currentDate;
};
console.log('om shree ganeshay namh');
uname.addEventListener('blur',()=>{
    console.log(uname.value);
    let regex=/^[a-zA-Z]([a-zA-Z]){3,20}/;
    let str=uname.value;
    let validation=false;
    if (regex.test(str)) {
    document.getElementById('unamemessage').innerHTML='';    
validation=true;
} else {
        document.getElementById('unamemessage').innerHTML='please start user name with the character and length must is be 4';
 validation=false;
   }
});
dobber();
email.addEventListener('blur',()=>{
    console.log(email.value);
    let regex=/^([0-9a-zA-Z]+)@([0-9a-zA-Z]+)\.([a-zA-Z]){2,7}/;
    let str=email.value;
    if (regex.test(str)) {
        document.getElementById('emailmessage').innerHTML=''; 
        validation=true;
    } else {
        document.getElementById('emailmessage').innerHTML='Enter a Valid E-mail address';    
    validation=false;
    }
});

mobilenumber.addEventListener('blur',()=>{
let regex=/^[9?8?7?6][0-9]{9}$/;
let str=mobilenumber.value;
if (regex.test(str)) {
    document.getElementById('mobilemessage').innerHTML=''; 
validation=true;
} else {
    document.getElementById('mobilemessage').innerHTML='Enter a Valid mobile number'; 
    validation=false;
}
});
repassword.addEventListener('blur',()=>{
let npass=npassword.value;
let repass=repassword.value;
if (npass==repass) {
    document.getElementById('passwordmessage').innerHTML=''; 
    validation=true;
} 
else {
    document.getElementById('passwordmessage').innerHTML='Both password did not matched!'; 
    validation=false;
}
});

