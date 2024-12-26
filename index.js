const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();

var methodOverride = require('method-override')



app.use(express.urlencoded({ extended: true })); //parsing data to express which is uncoded
app.use(methodOverride('_method'))
app.set("view engine", "ejs"); //setting view enginr for inbuilt templets
app.set("views", path.join(__dirname, "views")); // we can run from outside folder too..

app.use(express.static(path.join(__dirname, "public"))); // for static file combination of html css and javascript files

let posts = [
  { id:uuidv4(),
    username: "Mahesh",
    content: "I am Mahesh",
  },
  { id:uuidv4(),
    username: "Govind",
    content: "I am Govind",
  },
  { id:uuidv4(),
    username: "Somy",
    content: "I am Somy",
  },
];

app.listen(port, () => {
  console.log(`pot is listening on port ${port}`);
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id=uuidv4()
  posts.push({id, username, content });
  res.redirect("/posts")
});

//for particular user data fetching
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params
    let post=posts.find((p)=>id===p.id)
    res.render("show.ejs",{post})
    
})

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params
    let post=posts.find((p)=>id===p.id)
    res.render("edit.ejs",{post})

})

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params
    let newContent=req.body.content
    let post=posts.find((p)=>id===p.id)
    post.content=newContent
    res.redirect("/posts")
})

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params
     posts=posts.filter((p)=>id!==p.id)
     res.redirect("/posts")
})
