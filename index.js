//1. Download and install vscode editor
//2. downlad and install node js. check the version: cmd--> $node --version
//3. create a folder and open the folder in vscode editor
//4. open the terminal in vscode editor
//5. terminal--> npm install nodemon
//6. terminal--> npm install init (create package.json)
//7. terminal--> npm install mongoose (for db connection)
//8. terminal--> npm install express (for API creation)

//9. call express module
const express = require('express'); 

//10. create an express object.
const app = express(); 

//11. call mongoose to connect to the database
const mongoose = require('mongoose');

//12. use middleware globally - app.use(middleman);
//Use express as middleware
app.use(express.json()) ; 

//13. using express object we can create server, internally uses http module
app.listen(3040, ()=>{
    console.log("Server is up and running");
})

//14. connect to the database
/*
mongoose.connect("mongodb://localhost:27017/foodDB")
.then(()=>{
   console.log("foodDB Database connection successful")
})
.catch((err)=>{
   console.log(err)
})
   */

mongoose.connect("mongodb+srv://user100:Computer123@clusterfood.pmsuk.mongodb.net/foodsDB?retryWrites=true&w=majority&appName=Clusterfood")
.then(()=>{
    console.log("foodDB Database connection successful")
 })
 .catch((err)=>{
    console.log(err)
 })

//15. schema validation
const foodSchema = mongoose.Schema({
    id: {
         type: Number,
         required: true
    },
    title: {
        type: String,
        required: true,
            },
			
    origin: {
        type: String,
        required: true
    },
	
    price: {
        type: Number,
        required: true,
       
    },

    category: {
        type: String,
        required: true,
       
    },	
	
},{timestamps:true})


const foodModel = mongoose.model("foods",foodSchema);



//16. POST method - Add data to products in DB
app.post("/foods",(req,res)=>{
    let food = req.body;
    foodModel.create(food)
    .then((document)=>{
        res.send({data:document, message:"product created"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem"})
    })
   })


   //17. GET method
   app.get("/foods/:id", (req,res)=>{
    console.log(req.params.id);
    res.send("ggod"); //same as res.end
})