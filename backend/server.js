const PORT = process.cwd.PORT || 4000;
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());
// app.set('view engine', 'ejs');

app.use(express.static(path.join(process.cwd(), "frontend", "mainbody")));
app.use(express.static(path.join(process.cwd(), "frontend", "register")));
app.use(express.static(path.join(process.cwd(), "frontend", "renting")));
app.use(express.static(path.join(process.cwd(), "frontend", "signin")));
app.use(express.static(path.join(process.cwd(), "frontend")));

app.get("/BOOKRENT", (req, res) => {
    res.sendFile(path.join(process.cwd(), "frontend", "mainbody", "main.html"));
    // res.render('main.ejs');
});

app.get("/signin", (req, res) => {
    res.sendFile(path.join(process.cwd(), "frontend", "signin", "signin.html"));
    // res.render('signin.ejs');
});

app.post("/signin", (req, res) => {
    let users = fs.readFileSync(process.cwd() + "/backend/database/users.json" , "utf-8");
    users = users ? JSON.parse(users) : [];
    let findUSer = users.find(el => el.id == req.body.id);

    if(findUSer){
        if(findUSer.password === req.body.password){
            fs.writeFileSync(process.cwd() + "/backend/currentuser.json", JSON.stringify(findUSer , null ,2));
            return res.json({
                message: "Found!",
                status: 201,
            });
        }
        else{
            return res.json({
                message: "Password is not correct!",
                status: 401,
            });
        }
    }

    res.json({
        message: "Nickname does not exist!",
        status: 401,
    });
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(process.cwd(), "frontend", "register", "register.html"));
    // res.render('register.ejs');
});

app.post("/register", (req, res) => {
    const created_at = new Date();
    const updated_at = new Date();
    let users = fs.readFileSync(process.cwd() + "/backend/database/users.json" , "utf-8");
    users = users ? JSON.parse(users) : [];
    let findUSer = users.find(el => el.id == req.body.id);

    if(findUSer){
        return res.json({
            message: "Nickname is already exists! It should be uniqe. Please create your own!",
            status: 401,
        });
    }
    let obj = {};
    obj = {...req.body,"created_at": created_at,"updated_at": updated_at}
    users.push(obj);
    
    fs.writeFileSync(process.cwd() + "/backend/database/users.json", JSON.stringify(users , null ,2));
    fs.writeFileSync(process.cwd() + "/backend/currentuser.json", JSON.stringify(obj , null ,2));
    res.json({
        message: "Accepted",
        status: 201
    });
});

app.get("/renting", (req, res) => {
    res.sendFile(path.join(process.cwd(), "frontend", "renting", "renting.html"));
    // res.render('renting.ejs');
});

app.post("/renting", (req, res) => {
    if(req.body.message == "giveData"){
        let user = fs.readFileSync(process.cwd() + "/backend/currentuser.json" , "utf-8");
        user = user ? JSON.parse(user) : [];
        let obj = {};
        fs.writeFileSync(process.cwd() + "/backend/currentuser.json", JSON.stringify(obj , null ,2));
        if(user.id){
            return res.json(user);
        }
        else{
            return res.json({
                message: "You are the Guest! Please register or log in first",
                status: 401
            });
        }
    }
    // if(req.body.message == "takeData"){
    //     console.log(req.body);
    // }
});

app.delete("/renting", (req, res) => {
    let users = fs.readFileSync(process.cwd() + "/backend/database/users.json" , "utf-8");
    users = users ? JSON.parse(users) : [];

    let findUSerIndex = users.findIndex((el) => el.id == req.body.id);
    if(findUSerIndex == -1){
        return;
    }
    
    users.splice(findUSerIndex, 1);
    fs.writeFileSync(process.cwd() + "/backend/database/users.json", JSON.stringify(users , null ,2));
    res.json({
        message: "Deleted!",
        status: 201
    });
});

app.put("/renting", (req, res) => {
    const updated_at = new Date();
    let users = fs.readFileSync(process.cwd() + "/backend/database/users.json" , "utf-8");
    users = users ? JSON.parse(users) : [];

    let findUSer = users.find((el) => el.id == req.body.currentId);

    const {id, firstname, lastname, phone, date_of_birth, address, email, password} = req.body;

    if(id == '' && firstname == '' && lastname == '' && phone == '' && date_of_birth == '' && address == '' && email == '' && password == ''){
        return res.json({
            message: "Nothing has changed!",
            status: 401
        });
    }

    if(req.body.id != req.body.currentId){
        let isUsedNick = users.find((el) => el.id == req.body.id);
    
        if(isUsedNick){
            return res.json({
                message: "Nickname is already used! Create another one",
                status: 401
            });
        }
    }

    findUSer.id = id ? id : findUSer.id;
    findUSer.firstname = firstname ? firstname : findUSer.firstname;
    findUSer.lastname = lastname ? lastname : findUSer.lastname;
    findUSer.phone = phone ? phone : findUSer.phone;
    findUSer.date_of_birth = date_of_birth ? date_of_birth : findUSer.date_of_birth;
    findUSer.address = address ? address : findUSer.address;
    findUSer.email = email ? email : findUSer.email;
    findUSer.password = password ? password : findUSer.password;
    findUSer.updated_at = updated_at;

    fs.writeFileSync(process.cwd() + "/backend/database/users.json", JSON.stringify(users , null ,2));
    res.json(findUSer);
});

app.listen(PORT, () => 
    console.log("Server = http://localhost:" + PORT + "/BOOKRENT")
);