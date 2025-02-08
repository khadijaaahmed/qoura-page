const express = require ("express");
const app=express();
const port=8080;
const path = require("path")


const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set("view engine", "ejs"); // Corrected the key to "view engine"
app.set("views", path.join(__dirname, "views"));

const { v4: uuidv4 } = require('uuid');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let posts=[
   {
     id:uuidv4(),
    username: " khadija ahmed ",
    content:  "yes i will do but first set your priorities",
    email: "khadijaaahmed2005@gmail.com"},

   { 
    id:uuidv4(),
    username: " hafsah ahmed ",
    content:  "yes i will do but first set your priorities",
    email: "hafsahaaahmed2005@gmail.com"},


    {
    id:uuidv4(),
    username: " jannat ahmed ",
    content:  "yes i will do but first set your priorities",
    email: "jannataaahmed2005@gmail.com"},

]

app.get("/posts",(req,res)=>{
      res.render("index.ejs",{posts});
});

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
})

app.post("/posts" , (req,res)=>{
    let {username,content,email}=req.body;
    let id = uuidv4();
    posts.push({id,username,content,email});
    res.redirect("/posts");

});

app.get("/posts/:id" , (req,res)=>{
      let { id }=req.params;
      let post = posts.find((p)=> id === p.id);
      res.render("show.ejs",{post});
});

app.get("/posts/:id/edit" , (req,res)=>{
    let { id }=req.params;
    let post = posts.find((p)=> id ===p.id);
    res.render("edit.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let newEmail=req.body.email;
    let post =posts.find((p)=>id ===p.id);
    post.content=newContent;
    post.email=newEmail;
    res.redirect("/posts");
});



app.delete("/posts/:id" ,(req,res)=>{
    let { id }=req.params;
    posts=posts.filter((p)=> id !== p.id)
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("port is working",port);
});


