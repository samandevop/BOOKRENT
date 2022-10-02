const button = document.getElementById("register");
const h4 = document.getElementById("h4");
const inputName = document.getElementById("inputName");
const inputLastname = document.getElementById("inputLastname");
const inputPhone = document.getElementById("inputPhone");
const inputDateofbirth = document.getElementById("inputDateofbirth");
const inputAddress = document.getElementById("inputAddress");
const inputEmail = document.getElementById("inputEmail");
const inputNickname = document.getElementById("inputNickname");
const inputPassword = document.getElementById("inputPassword");

button.addEventListener("click", () => {
    const user = {};

    user.id = inputNickname.value;
    user.firstname = inputName.value;
    user.lastname = inputLastname.value;
    user.phone = inputPhone.value;
    user.date_of_birth = inputDateofbirth.value;
    user.address = inputAddress.value;
    user.email = inputEmail.value;
    user.password = inputPassword.value;

        let cnt = 0;
        let len = user.email.length;
            for(let i = 0; i < len; i++){
                if(user.email[i] === '@'){cnt++;}
            }
        let lenpass = user.password.length;
        let checker = user.email.split("@");
            
                 if(inputName.value == ''){h4.textContent = 'Enter the Firstname!';}
            else if(inputName.value.length < 3){h4.textContent = 'Firstname is too short! It should be more than 2 symbols';}
            else if(inputLastname.value == ''){h4.textContent = 'Enter the Lastname!';}
            else if(inputLastname.value.length < 3){h4.textContent = 'Lastname is too short! It should be more than 2 symbols';}
            else if(inputPhone.value == ''){h4.textContent = 'Enter the Phone number!';}
            else if(!isPhone(inputPhone.value)){h4.textContent = 'In Phone value you should use only numbers!';}
            else if(inputDateofbirth.value == ''){h4.textContent = 'Enter the Date of birth!';}
            else if(!isDateOfBirth(inputDateofbirth.value)){h4.textContent = 'Date of birth is incorrect!';}
            else if(inputAddress.value == ''){h4.textContent = 'Enter the Address!';}
            else if(inputAddress.value.length < 3){h4.textContent = 'Address is too short! It should be more than 2 symbols';}
            else if(inputEmail.value == ''){h4.textContent = 'Enter the Email!';}
            else if(cnt > 1){h4.textContent = 'Use [@] only one time';}
            else if(cnt == 0){h4.textContent = `Please include an '@' in the email addres! [${inputEmail.value}] is missing '@'`;}
            else if(!checker[1]){h4.textContent = `Please enter a part following '@'. [${inputEmail.value}] is incomplete`;}
            else if(!checker[0]){h4.textContent = `Please enter a part followed by '@'. [${inputEmail.value}] is incomplete`;}
            else if(inputNickname.value == ''){h4.textContent = 'Enter the Nickname!';}
            else if(inputNickname.value.length < 5){h4.textContent = 'Nickname is too short! It should be more than 4 symbols';}
            else if(inputPassword.value == ''){h4.textContent = 'You should creat your own Password!';}
            else if(lenpass < 8){h4.textContent = 'Password is too short! It should be more than 7 symbols';}
            else{renderData(user);}
});

async function renderData(user) {
    let res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
 
    message = (await res.json());

    if(message.status === 201){
        setTimeout(() => {
            inputName.value = '';
        },100);
        setTimeout(() => {
            inputLastname.value = '';
        },200);
        setTimeout(() => {
            inputPhone.value = '';
        },300);
        setTimeout(() => {
            inputDateofbirth.value = '';
        },400);
        setTimeout(() => {
            inputAddress.value = '';
        },500);
        setTimeout(() => {
            inputEmail.value = '';
        },600);
        setTimeout(() => {
            inputNickname.value = '';
        },700);
        setTimeout(() => {
            inputPassword.value = '';
        },800);
        
        changeLink();
        setTimeout(() => {
        button.click();
        },800);
    }
    if(message.status === 401){
        h4.textContent = noQuotes(JSON.stringify(message.message));
    }
}

function changeLink(){
     document.getElementById("register").href = "/renting";
     document.getElementById("register").innerHTML = "Accepted!";
}

function isPhone(str) {
    let len = str.length;
        for(let i = 0; i < len; i++){
            if(!isNumber(+str[i])){return false;}
        }
    return true;
}

function isNumber(val) {
    return val === +val;
}

function isDateOfBirth(str) {
    if(str.length !== 10){return false;}
    if(str[2] !== "-" || str[5] !== "-"){return false;}
    const datecut = str.split("-");
    if((+datecut[0] < 1 || +datecut[0] > 31) || (+datecut[1] < 0 || +datecut[1] > 12) || (+datecut[2] < 1940 || +datecut[2] > 2022)){return false;}
    return true;
}

function noQuotes(str) {
    let len = str.length;
    copy = '';
        for(let i = 1; i < len-1; i++){
            copy += str[i];
        }
    return copy;
  }