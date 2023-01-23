const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const router =require('./router/router')
async function run() {
    console.log(`datasource initialized...`);
    app.use("/", router)
  
    const PORT = process.env.PORT ||6300;
    app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
  }
  run();

//sudo kill -9 $(sudo lsof -t -i:5555)