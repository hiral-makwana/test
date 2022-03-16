const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models')

var corsOptions = {
    origin: "http://localhost:3000"
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json())
app.use(express.urlencoded( { extended:true } ))

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log(`Server is running on port 3000.`);
});
});
require("./routes/student.routes")(app);