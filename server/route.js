const express = require('express');
const router = express.Router();

router.get("/getting", (req,res) => {
  res.send(`Data Shown...`)
})

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