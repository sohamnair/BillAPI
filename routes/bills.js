const express = require('express');
const router = express.Router();
const store = require('store')

router.route('/')
.get(async (req, res) => {
    let result = await store.get("bills")
    if(!result) return res.status(404).json("No bill found");
    res.status(200).json(JSON.parse(result));
})
.post(async (req, res) => {
    let patientName = req.body.patientName;
    let patientAddress = req.body.patientAddress;
    let hospitalName = req.body.hospitalName;
    let dateOfService = req.body.dateOfService;
    let billAmount = req.body.billAmount;

    let newBill = {
        patientName: patientName,
        patientAddress: patientAddress,
        hospitalName: hospitalName,
        dateOfService: dateOfService,
        billAmount: billAmount
    }

    let result = []
    let temp = await store.get("bills");
    if(temp) result = JSON.parse(temp);
    result.push(newBill);
    await store.set("bills", JSON.stringify(result));
    res.status(200).json("Bill created successfully");
})

module.exports = router;