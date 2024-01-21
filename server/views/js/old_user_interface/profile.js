const dob=document.getElementById('dob');
function dobber(dt,dob) {
let date=new Date(dt);
let day= date.getDate();
let month=date.getMonth()+1;
let year=date.getFullYear();
let DateOfBirth= `${day}-${month}-${year}`;
dob.innerText=DateOfBirth;
};
dobber(dob.innerText,dob);
