import express from 'express';
import bodyParser from 'body-parser';

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const frontCards = [
    {
        title: "Prioritize Tasks",
        description: "Focus on high-priority tasks first. Use methods like the Eisenhower Matrix to categorize tasks by importance and urgency."
    },
    {
        title: "Set SMART Goals",
        description: "Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound to ensure clarity and focus in achieving them."
    },
    {
        title: "Use Time Blocking",
        description: "Allocate blocks of time to specific tasks or activities to reduce distractions and manage time effectively."
    },
];
const cards = [...frontCards].reverse();

app.get("/",(req,res)=>{
    res.render("index.ejs",{cards})
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}.`)
});