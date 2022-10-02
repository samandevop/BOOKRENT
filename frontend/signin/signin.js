const button = document.getElementById("signin");
const h4 = document.getElementById("h4");
const inputNickname = document.getElementById("inputNickname");
const inputPassword = document.getElementById("inputPassword");

button.addEventListener("click", () => {
    const user = {};

    user.id = inputNickname.value;
    user.password = inputPassword.value;

                 if(inputNickname.value == ''){h4.textContent = 'Enter the Nickname!';}
            else if(inputNickname.value.length < 5){h4.textContent = 'Nickname is too short! It should be more than 4 symbols';}
            else if(inputPassword.value == ''){h4.textContent = 'Enter the Password!';}
            else if(inputPassword.value.length < 8){h4.textContent = 'Password is too short! It should be more than 7 symbols';}
            else{renderData(user);}
});

async function renderData(user) {
    let res = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
 
    message = (await res.json());
    if(message.status === 201){
        
        const str1 = inputNickname.value;
        const str2 = inputPassword.value;
        let len1 = str1.length;
        let len2 = str2.length;
        let maxlen = max(len1,len2);

        function start1(len1){
            if(len1 != -1){
              setTimeout(function(){
                  copy = '';
                  for(let i = 0; i < len1; i++){
                      copy += str1[i];
                  }
                  len1--;
                  inputNickname.value = copy;
                start1(len1);
              }, 100);
            }
          }
        start1(len1);
        function start2(len2){
            if(len2 != -1){
              setTimeout(function(){
                  copy = '';
                  for(let i = 0; i < len2; i++){
                      copy += str2[i];
                  }
                  len2--;
                  inputPassword.value = copy;
                start2(len2);
              }, 100);
            }
          }
        start2(len2);

        changeLink();
        setTimeout(() => {
        button.click();
        },maxlen * 115);
    }
    if(message.status === 401){
        h4.textContent = noQuotes(JSON.stringify(message.message));
    }
}

function changeLink(){
     document.getElementById("signin").href = "/renting";
     document.getElementById("signin").innerHTML = "Accepted!";
}

function max(num1, num2) {
    if(num1 > num2){return num1;}
    else if(num2 > num1){return num2;}
    return num1;
}

function noQuotes(str) {
  let len = str.length;
  copy = '';
      for(let i = 1; i < len-1; i++){
          copy += str[i];
      }
  return copy;
}