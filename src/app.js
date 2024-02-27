const express = require("express");
const app = express();
const usersRouter = require("./users/users.router");
const pastesRouter = require("./pastes/pastes.router");
// TODO: Follow instructions in the checkpoint to implement ths API.
const pastes = require("./data/pastes-data");


// The express.json() function is a built-in middleware that adds
// a body property to the request (req.body). 
app.use(express.json());

// app.use("/pastes/:pasteId", (req, res, next) => {
// app.get("/pastes/:pasteId", (req, res, next) => {
//   const { pasteId } = req.params;
//   const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));
//   if (foundPaste) {
//       res.json({ data: foundPaste });
//       // res.send({ data: foundPaste });
//     } else {
//       // next(`Paste id not found: ${pasteId}`);
//       next({ status: 404, 
//           message: `Paste id not found: ${pasteId}` })
//     }
// });

// //app.use("/pastes", (req, res) => {
//   app.get("/pastes", (req, res) => {
//   res.json({ data: pastes });
//   //res.send({ data: pastes });
// });

app.use("/users", usersRouter);
app.use("/pastes", pastesRouter); // Note: app.use


// // New middleware function to validate the request body

// function bodyHasTextProperty(req, res, next) {
//   const { data: { text } = {} } = req.body;
//   if (text) {
//     return next(); // Call `next()` without an error message if the result exists
//   }
//   // next("A 'text' property is required.");
//   next({
//     status: 400,
//     message: "A 'text' property is required.",
//   });
// }

// // Variable to hold the next ID
// // Because some IDs may already be used, find the largest assigned ID

// let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

// app.post("/pastes",  
// bodyHasTextProperty, // Add validation middleware 
// (req, res, next) => {
//   // Route handler no longer has validation code.
//   const { data: { name, syntax, exposure, expiration, text, user_id } = {} } = req.body;
// //  if(text){
//     //if(name){
//   const newPaste = {
//     id: ++lastPasteId, // Increment last ID, then assign as the current ID
//     name,
//     syntax,
//     exposure,
//     expiration,
//     text,
//     user_id,
//   };
//   pastes.push(newPaste);

//   //reutrns an HTTP request error code of 201 if paste is successfully created
//   //res.json({ data: newPaste });
//     res.status(201).json({ data: newPaste });
// // }
// // else {
// //   // posting an object with a missing or empty text property will return 400.
// //   res.sendStatus(400);
// //    }

// });



// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {

  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });

});
// app.use((error, request, response, next) => {
//   console.error(error);
//   response.send(error);
// });

module.exports = app;
