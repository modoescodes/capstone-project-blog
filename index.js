import express from 'express';
import bodyParser from 'body-parser';

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let frontCards = [
    {
        id:1,
        title: "Prioritize Tasks",
        description: "Focus on high-priority tasks first. Use methods like the Eisenhower Matrix to categorize tasks by importance and urgency."
    },
    {
        id:2,
        title: "Set SMART Goals",
        description: "Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound to ensure clarity and focus in achieving them."
    },
    {
        id:3,
        title: "Use Time Blocking",
        description: "Allocate blocks of time to specific tasks or activities to reduce distractions and manage time effectively."
    },
];
let cards = [...frontCards].reverse();

app.get("/",(req,res)=>{
    res.render("index.ejs",{cards})
});

app.get("/edit/:id",(req,res)=>{
    const id=parseInt(req.params.id)
    const card=cards.find(card=> card.id===id)
    if(card){
        res.render("edit.ejs",{card})
    }else{
        res.status(404).send("Card not found")
    }
})

app.post('/update/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    const { title, description } = req.body; // Get new values from the form
    const card = cards.find(card => card.id === cardId); // Find the card by id

    if (card) {
        // Update card properties
        card.title = title;
        card.description = description;
        res.redirect('/'); // Redirect back to the main page
    } else {
        res.status(404).send("Card not found");
    }
});

app.get('/add',(req,res)=>{
    res.render("add.ejs");
})

app.post('/submit',(req,res)=>{
    const id=cards.length+1;
    const {title,description}=req.body;
    const newCard={ 
            id: id,
            title:title,
            description:description,
        }
    cards.unshift(newCard)
    res.redirect("/")
})

app.post("/delete/:id" , (req,res)=>{
    const idToDelete=parseInt(req.params.id);
    cards=cards.filter(card=> card.id!=idToDelete);
    res.redirect("/");
})


app.listen(port, ()=>{
    console.log(`Server is running on ${port}.`)
});