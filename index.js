//1. Download and install vscode editor
//2. downlad and install node js. check the version: cmd--> $node --version
//3. create a folder and open the folder in vscode editor
//4. open the terminal in vscode editor
//5. terminal--> npm install nodemon
//6. terminal--> npm install init (create package.json)
//7. terminal--> npm install mongoose (for db connection)
//8. terminal--> npm install express (for API creation)
//19.install dotenv-->npm install dotenv


//9. call express module
const express = require('express'); 

//10. create an express object.
const app = express(); 

//11. call mongoose to connect to the database
const mongoose = require('mongoose');

//19.call dotenv
require('dotenv').config();

//12. use middleware globally - app.use(middleman);
//Use express as middleware
app.use(express.json()) ; 
app.use(express.urlencoded({extended:true}));

//18. create a default port to connect
const PORT = process.env.PORT || 3040;



//13. using express object we can create server, internally uses http module
/*
app.listen(3040, ()=>{
    console.log("Server is up and running");
})
*/
app.listen(PORT, ()=>{
    console.log("Server started at port", PORT);
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

/*
mongoose.connect("mongodb+srv://user100:Computer123@clusterfood.pmsuk.mongodb.net/foodsDB?retryWrites=true&w=majority&appName=Clusterfood")
.then(()=>{
    console.log("foodDB Database connection successful")
 })
 .catch((err)=>{
    console.log(err)
 })
    */
 mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("foodDB Database connection successful");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });




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
/*
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
    */

     app.post('/foods', (req, res) => {
    const food = new foodModel({
        id: req.body.idcount,
        title: req.body.titleName,
        origin: req.body.originName,
        price: req.body.priceValue,
        category: req.body.categoryValue,
    });

    food.save()
        .then((savedFood) => {
            res.send({ data: savedFood, message: "Food item added successfully" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ message: "Food item was not stored in the database", error: error.message });
        });
});


   //17. GET method
   /*
   app.get("/foods/:id", (req,res)=>{
    console.log(req.params.id);
    res.send("ggod"); //same as res.end
})
    */

