const express = require('express');
const router = express.Router();
const UserModel = require("./UserModel.js");

router.get("/getting", async (req,res) => {
  try{
    const steps = await UserModel.find()
    res.json(steps);
  } catch(err){
    res.status(500).send(`Error fecthing data : ${err.message}`);
  }
});

router.post('/posting', (req, res) => {
  res.send(`posting data...`);
})

router.put('/updating', (req,res)=> {
  res.send(`updating data...`)
})

router.delete('/deleting', (req,res) => {
  res.send(`deleting data`)
})

module.exports = router;