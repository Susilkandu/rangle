const npassword=document.getElementById('npassword');
const repassword=document.getElementById('repassword');
let validation=false;
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
        console.log('galat hai');
    }
    })
    