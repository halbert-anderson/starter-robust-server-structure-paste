const express = require("express");
const app = express();

// TODO: Follow instructions in the checkpoint to implement ths API.
const pastes = require("./data/pastes-data");

// The express.json() function is a built-in middleware that adds
// a body property to the request (req.body). 
app.use(express.json());

app.use("/pastes/:pasteId", (req, res, next) => {
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));
  if (foundPaste) {
      res.json({ data: foundPaste });
       //res.send({ data: foundPaste });
    } else {
      next(`Paste id not found: ${pasteId}`);
    }
  });

//app.use("/pastes", (req, res) => {
  app.get("/pastes", (req, res) => {
  res.json({ data: pastes });
  //res.send({ data: pastes });
});

// Variable to hold the next ID
// Because some IDs may already be used, find the largest assigned ID
let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

app.post("/pastes", (req, res, next) => {

  const { data: { name, syntax, exposure, expiration, text, user_id } = {} } = req.body;
  if(text){
  const newPaste = {
    id: ++lastPasteId, // Increment last ID, then assign as the current ID
    name,
    syntax,
    exposure,
    expiration,
    text,
    user_id,
  };
  pastes.push(newPaste);

  //reutrns an HTTP request error code of 201 if paste is successfully created
  //res.json({ data: newPaste });
    res.status(201).json({ data: newPaste });
}else {
  // posting an object with a missing or empty text property will return 400.
  res.sendStatus(400);
   }
   
});



// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
