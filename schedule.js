require("dotenv").config();
const later = require('@breejs/later');
let app = require('./index')
let schedule = {
    schedules:
      [
        {m: [3,8,13,18,23,28,33,38,43,48,53,58]}
      ]
    };
    //removeIf(production)
    schedule = {
      schedules:
      [
        {s: [0,30]}
      ]
  };

  function executer() {
    console.log(`Start schedule job at: ${new Date()}`);
    app.start();
  }
  let t = later.setInterval(executer, schedule);