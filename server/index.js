const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require('./routers/UserRouter');
const postsRouter = require('./routers/PostRouter');


const app = express();
const port = process.env.PORT || 3306;

app.use(bodyParser.json())
app.use(usersRouter);
app.use(postsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to our server!')
})

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});