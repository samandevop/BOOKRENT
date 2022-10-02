const cartIcon = document.querySelector("#cart-icon");
const userIcon = document.querySelector("#user-icon");
const cart = document.querySelector(".cart");
const cart2 = document.querySelector(".cart2");
const closeCart = document.querySelector("#cart-close");
const closecart2 = document.getElementById("cart2-close");
const deleteButton = document.getElementById("deleteButton");

let inputNameL = document.getElementById("inputNameL");
let inputLastnameL = document.getElementById("inputLastnameL");
let inputPhoneL = document.getElementById("inputPhoneL");
let inputDateofbirthL = document.getElementById("inputDateofbirthL");
let inputAddressL = document.getElementById("inputAddressL");
let inputEmailL = document.getElementById("inputEmailL");
let inputNicknameL = document.getElementById("inputNicknameL");
let inputPasswordL = document.getElementById("inputPasswordL");

const submit = document.getElementById("submit")
const h4 = document.getElementById("h4");
const inputName = document.getElementById("inputName");
const inputLastname = document.getElementById("inputLastname");
const inputPhone = document.getElementById("inputPhone");
const inputDateofbirth = document.getElementById("inputDateofbirth");
const inputAddress = document.getElementById("inputAddress");
const inputEmail = document.getElementById("inputEmail");
const inputNickname = document.getElementById("inputNickname");
const inputPassword = document.getElementById("inputPassword");

let usersBooks; 

getUserData();

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});

userIcon.addEventListener('click', () => {
    cart2.classList.add('active');
});

closecart2.addEventListener('click', () => {
    cart2.classList.remove('active');
});


submit.addEventListener("click", () => {

    if(h4.textContent != "You are the Guest! Please register or log in first"){
        const user = {};
        
        user.currentId = inputNicknameL.innerHTML;
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
                
                    if(inputName.value != '' && inputName.value.length < 3){h4.textContent = 'Firstname is too short! It should be more than 2 symbols';}
                else if(inputLastname.value != '' && inputLastname.value.length < 3){h4.textContent = 'Lastname is too short! It should be more than 2 symbols';}
                else if(inputPhone.value != '' && !isPhone(inputPhone.value)){h4.textContent = 'In Phone value you should use only numbers!';}
                else if(inputDateofbirth.value != '' && !isDateOfBirth(inputDateofbirth.value)){h4.textContent = 'Date of birth is incorrect!';}
                else if(inputAddress.value != '' && inputAddress.value.length < 3){h4.textContent = 'Address is too short! It should be more than 2 symbols';}
                else if(inputEmail.value != '' && cnt > 1){h4.textContent = 'Use [@] only one time';}
                else if(inputEmail.value != '' && cnt == 0){h4.textContent = `Please include an '@' in the email addres! [${inputEmail.value}] is missing '@'`;}
                else if(inputEmail.value != '' && !checker[1]){h4.textContent = `Please enter a part following '@'. [${inputEmail.value}] is incomplete`;}
                else if(inputEmail.value != '' && !checker[0]){h4.textContent = `Please enter a part followed by '@'. [${inputEmail.value}] is incomplete`;}
                else if(inputNickname.value != '' && inputNickname.value.length < 5){h4.textContent = 'Nickname is too short! It should be more than 4 symbols';}
                else if(inputPassword.value != '' && lenpass < 8){h4.textContent = 'Password is too short! It should be more than 7 symbols';}
                else{changeUserData(user);}
    }
});



deleteButton.addEventListener('click', () => {
    let id = inputNicknameL.innerHTML;
    let obj = {};
    obj.id = id;
    if(id != "No data"){
        deleteUserData(obj);
    }
    else{
        h4.textContent = "You are the Guest! Please register or log in first"
    }
});

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", start);
}
else{
    start();
}




function start() {
    addEvent();
};

function update() {
    addEvent();
    updateTotal();
};

function addEvent() {
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    cartRemove_btns.forEach(btn => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    })

    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem);
    });

    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
};

let itemsAdded = [];
function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    if(itemsAdded.find(el => el.title == newToAdd.title)){
        alert("This item is already exist!");
        return;
    }
    else{
        itemsAdded.push(newToAdd);
    }

    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}

function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector(".cart-product-title").innerHTML);

    update();
};

function handle_changeItemQuantity() {
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value);

    update();
};

function handle_buyOrder() {
    usersBooks = userBoughtItems();
    // sendUsersBooks();
    if(itemsAdded.length <= 0){
        alert("There is no order to place yet!\nPlease make an order first.");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Your order is placed successfully! :)");
    itemsAdded = [];
    update();
}

function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    total = total.toFixed(1);

    totalElement.innerHTML = "$" + total;
};

function userBoughtItems(){
    let arr = [];
    let cartBoxes = document.querySelectorAll(".cart-box");
    cartBoxes.forEach(cartBox => {
        let obj = {};
        let title = cartBox.querySelector(".cart-product-title").innerHTML;
        let quantity = cartBox.querySelector(".cart-quantity").value;
        obj.id = title;
        obj.quantity = quantity;
        arr.push(obj);
    });
    return arr;
};

function CartBoxComponent(title, price, imgSrc) {
    return `
        <div class="cart-box">
            <img src=${imgSrc} alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <div class="price-content-type">
                    <input type="number" value="1" class="cart-quantity">
                    <div class="days">day</div>
                </div>
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>
        </div>`
}

async function getUserData() {
    const request = {message: "giveData"};
    let res = await fetch("http://localhost:4000/renting", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
 
    data = (await res.json());

    if(data.status === 401){
        h4.textContent = noQuotes(JSON.stringify(data.message));
        inputNameL.innerHTML = "No data";
        inputLastnameL.innerHTML = "No data";
        inputPhoneL.innerHTML = "No data";
        inputDateofbirthL.innerHTML = "No data";
        inputAddressL.innerHTML = "No data";
        inputEmailL.innerHTML = "No data";
        inputNicknameL.innerHTML = "No data";
        inputPasswordL.innerHTML = "No data";
    }
    else{
        firstname =  JSON.stringify(data.firstname);
        inputNameL.innerHTML = noQuotes(firstname);
    
        lastname =  JSON.stringify(data.lastname);
        inputLastnameL.innerHTML = noQuotes(lastname);
    
        phone =  JSON.stringify(data.phone);
        inputPhoneL.innerHTML = noQuotes(phone);
    
        date_of_birth =  JSON.stringify(data.date_of_birth);
        inputDateofbirthL.innerHTML = noQuotes(date_of_birth);
        
        address =  JSON.stringify(data.address);
        inputAddressL.innerHTML = noQuotes(address);
    
        email =  JSON.stringify(data.email);
        inputEmailL.innerHTML = noQuotes(email);
    
        id =  JSON.stringify(data.id);
        inputNicknameL.innerHTML = noQuotes(id);
    
        password =  JSON.stringify(data.password);
        inputPasswordL.innerHTML = noQuotes(password);
    }
}

async function deleteUserData(id) {
    let res = await fetch("http://localhost:4000/renting", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    });
 
    data = (await res.json());

    if(data.status === 201){
        setTimeout(() => {
            inputNameL.innerHTML = '';
        },100);
        setTimeout(() => {
            inputLastnameL.innerHTML = '';
        },200);
        setTimeout(() => {
            inputPhoneL.innerHTML = '';
        },300);
        setTimeout(() => {
            inputDateofbirthL.innerHTML = '';
        },400);
        setTimeout(() => {
            inputAddressL.innerHTML = '';
        },500);
        setTimeout(() => {
            inputEmailL.innerHTML = '';
        },600);
        setTimeout(() => {
            inputNicknameL.innerHTML = '';
        },700);
        setTimeout(() => {
            inputPasswordL.innerHTML = '';
        },800);
        
        changeLink();
        setTimeout(() => {
        deleteButton.click();
        },800);
    }
}

async function changeUserData(user) {
    let res = await fetch("http://localhost:4000/renting", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
 
    data = (await res.json());

    if(data.status === 401){
        h4.textContent = noQuotes(JSON.stringify(data.message));
    }
    else{
        h4.textContent = '';
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
        setTimeout(() => {
            inputNameL.innerHTML = noQuotes(JSON.stringify(data.firstname));
        },900);
        setTimeout(() => {
            inputLastnameL.innerHTML = noQuotes(JSON.stringify(data.lastname));
        },1000);
        setTimeout(() => {
            inputPhoneL.innerHTML = noQuotes(JSON.stringify(data.phone));
        },1100);
        setTimeout(() => {
            inputDateofbirthL.innerHTML = noQuotes(JSON.stringify(data.date_of_birth));
        },1200);
        setTimeout(() => {
            inputAddressL.innerHTML = noQuotes(JSON.stringify(data.address));
        },1300);
        setTimeout(() => {
            inputEmailL.innerHTML = noQuotes(JSON.stringify(data.email));
        },1400);
        setTimeout(() => {
            inputNicknameL.innerHTML = noQuotes(JSON.stringify(data.id));
        },1500);
        setTimeout(() => {
            inputPasswordL.innerHTML = noQuotes(JSON.stringify(data.password));
        },1600);
    }
}

function noQuotes(str) {
    let len = str.length;
    copy = '';
        for(let i = 1; i < len-1; i++){
            copy += str[i];
        }
    return copy;
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

function changeLink(){
    document.getElementById("deleteButton").href = "/bookrent";
    document.getElementById("deleteButton").innerHTML = "Deleted!";
}

// async function sendUsersBooks(usersBooks){
//     const request = {message: "takeData"};
    
//     let res = await fetch("http://localhost:4000/renting", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(request),
//     });
 
//     data = (await res.json());
// }