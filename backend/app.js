let express = require('express');
let cors = require('cors')
let mongoose = require('mongoose');
const { myBookModel } = require('./bookModel');
const {logModel} = require('./loginmodel')
// let MongoDBURL="mongodb+srv://girma0918:09180918@cluster0.iepsogl.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";
// let PORT = 4000;
let app = express();
let jwt = require('jsonwebtoken');
let cookieparser = require('cookie-parser')
let cookies = require('cookies');
let bcryptjs = require('bcryptjs');
// let accessSecKey = "accessSecKey";
// let refreshSecKey = "refreshSecKey";
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  };

app.use(express.json()); 
app.use(cors(corsOptions));
app.use(cookieparser());



// {remeber to add this before trying the post method}

mongoose.connect(process.env.MongoDBURL)
.then(()=>{console.log("We are succesfuly connected to the database");
app.listen(process.env.PORT,()=>{
    console.log(`We are listing to port ${process.env.PORT}`)
});
})
.catch((err)=>{console.log(`Error connecting to the databse ${err}`)})

app.post('/user/register', async (req, res) => {
    let { firstname, lastname, email, username, password } = req.body;

    try {
        // Check if all required fields are provided
        if (!firstname || !lastname || !email || !username || !password) {
            return res.status(400).json({ message: "Please fill all required fields!" });
        }

        // Check if password meets minimum length requirement
        if (password.length < 8) {
            return res.status(402).json({ message: "Password must be at least 8 characters or more!" });
        }

        // Check if the username already exists
        let doesUserNameExist = await logModel.findOne({ username });
        if (doesUserNameExist) {
            return res.status(401).json({ message: "User already exists. Please use a different username or login!" });
        }

        // Hash the password before storing it
        let hashedPassword = await bcryptjs.hash(password, 12);

        // Create a new user with hashed password
        let newUser = await logModel.create({
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword
        });

        return res.status(200).json({ message: "New user account created successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server side error. Error Type: " + err.message });
    }
});

app.post('/user/login', async (req, res) =>{

try{

let {username , password} = req.body;

if(!username || !password){
    return res.status(400).json({ message: "Please fill out all required fields"});
}

else {
  let doesUserExist = await logModel.findOne({username});
   if(!doesUserExist){
    return res.status(400).json({ message: "User does not exist!"});
   }

   else{
    let passwordMatch = await bcryptjs.compare(password , doesUserExist.password);
        if(!passwordMatch){
            return res.status(400).json({ message: "Invalid username or password. Please try again!"});
        }
        else{
            let accessToken =  jwt.sign({username: doesUserExist.username} ,process.env.accessSecKey , {expiresIn:"20m"});
            let refreshToken = jwt.sign({username: doesUserExist.username} ,process.env.refreshSecKey , {expiresIn:"40m"});

            res.cookie('access_token', accessToken, { maxAge: 1200000});
            res.cookie('refresh_token', refreshToken, { maxAge: 2400000 , httpOnly: true });
            return res.status(200).json({ message: "Successfully logged In!"});
        }
   }
}




}
catch(err){

    return res.status(500).json({ message: "Server side error. Error Type: " + err.message });

}

});


app.post('/user/logout' ,async (req ,res)=>{
    try{

        let refreshTokenInCookie= req.cookies.refresh_token;
        if(!refreshTokenInCookie){
            return res.status(400).json({message : "User already logged out!"})

        }
        else{
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            return res.json({ message: 'Logout successful' });
        }
    

    }
    catch(err){
        res.status(500).json({message : "Unable to lofg out. Server error!"})
    }
})





const VerifyUser = async (req, res, next) => {
    let accessTokenCookie = req.cookies.access_token;
    if (!accessTokenCookie) {
        const refreshSuccessful = await verifyRefreshToken(req, res);
        if (refreshSuccessful) {
            next(); // Proceed if refresh token successfully refreshed the access token
        } else {
            return res.status(401).json({ valid: false, message: "Invalid access token!" });
        }
    } else {
        jwt.verify(accessTokenCookie, process.env.accessSecKey, (err, decoded) => {
            if (err) {
                // Refresh token is missing or expired, send 401 Unauthorized
                return res.status(401).json({ valid: false, message: "Invalid access token!" });
            } else {
                // Access token is valid, proceed to the next middleware
                req.username = decoded.username;
                next();
            }
        });
    }
};

const verifyRefreshToken = async (req, res) => {
    let refreshTokenCookie = req.cookies.refresh_token;
    if (!refreshTokenCookie) {
        return false; // Refresh token is missing
    } else {
        try {
            const decoded = jwt.verify(refreshTokenCookie, process.env.refreshSecKey);
            let accessToken = jwt.sign({ username: decoded.username }, process.env.accessSecKey, { expiresIn: "20m" });
            res.cookie('access_token', accessToken, { maxAge: 1200000 });
            return true; // Refresh token is valid
        } catch (err) {
            return false; // Refresh token is invalid
        }
    }
};









app.post('/books/addbooks' , VerifyUser , async(req ,res)=>{
let valid;
try{

if(!req.body.title || !req.body.author || !req.body.year  || !req.body.image  || !req.body.desc){

    res.send({message : "please fill all required fileds and submit the book"})
}

let newBook = await myBookModel.create({

    title : req.body.title,
    author : req.body.author,
    year : req.body.year,
    image : req.body.image,
    desc : req.body.desc
    

})

res.status(200).send({valid : true , message : "Book has been added to the database"})

}
catch(err){

    res.status(500).send({message : "We could not add the book!"})
}

})


app.get('/books/all-books', VerifyUser , async( req , res)=>{

let valid 

try{
let AllBooks = await myBookModel.find({});

if(!AllBooks){

    res.status(400).send({message : "We can' find all books at this time."})
}

else {
    res.status(200).json({valid : true , data : AllBooks});
}


}

catch (err){
res. status(500).send({mesage : `we could not get the books ${err}`})
}
});

app.get('/books/bookfind/:id', VerifyUser, async(req , res)=>{
    try{

        let {id} = req.params;

    let BookById = await myBookModel.findById(id);


    if(!BookById){

        res.status(400).json({message : "There is not in our book store."})
    }

    return res.status(200).json(BookById);
    
   
    }
    
    catch (err){
    res.status(500).json({mesage : `we could not get the books ${err}`})
    }
    });


app.put('/books/editbook/:id' , VerifyUser ,async(req, res)=>{



    try{

        let {id}=req.params;
    
        if(!req.body.title || !req.body.author || !req.body.year  || !req.body.image  || !req.body.desc){

            res.send({message : "please fill all required fileds and submit the book"})
        }

    let editedBook = await myBookModel.findByIdAndUpdate(id,req.body);

    res.status(200).send({message : "Book has been updated succesfully"})
    }

    catch(err){
        res. status(500).send({mesage : `Error updating the book ${err}`})
    }
})


app.delete('/books/delete/:id' , VerifyUser , async(req,res)=>{


    try{
        let {id}=req.params;

    let deleteBook = await myBookModel.findByIdAndDelete(id);

    if(deleteBook){

        res.status(200).send({mesage : "Book has been deleted successsfully"})
    }
 
    else{

        res.status(400).send({mesage : "Error deleting this book!"})
    }

    }
    catch(err){

        res. status(500).send({mesage : `Error deleteing the book ${err}`})

    }
})










    

    

