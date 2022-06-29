require("dotenv").config();
let app = require('./index')

  function executer() {
    console.log(`Start schedule job at: ${new Date()}`);
    app.start();
  }

  executer();