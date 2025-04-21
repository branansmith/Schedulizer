const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');

//to get 12/04/24, in the url use %2F for /
//so you would type in http://localhost:3000/employees/12%2F03%2F24
router.get("/:date", async function (req, res) {
    try {
    const date = decodeURIComponent(req.params.date);
    const result = await employeeController.getTimes(date);
    res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving times");
    }
});

module.exports = router;