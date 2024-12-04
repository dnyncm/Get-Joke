import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let newPost = []

app.get("/", (req, res) => {
    res.render("index.ejs", {newP: newPost})
});

app.post("/submit", async (req, res) => {
    try {
        const result = await axios.get("https://official-joke-api.appspot.com/random_joke");
        newPost.push({setup: result.data.setup, punchline: result.data.punchline})
         res.render("index.ejs", {newP: newPost});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
      }
})

app.post("/delete", (req, res) => {
    const postIndex = parseInt(req.body.index); // Get the post index from the form data
    if (!isNaN(postIndex) && postIndex >= 0 && postIndex < newPost.length) {
        newPost.splice(postIndex, 1); // Remove the post at that index
    }
    res.render("index.ejs", { newP: newPost });
});

app.listen(port, () => {
    console.log(`Live in port: ${port}`);
})