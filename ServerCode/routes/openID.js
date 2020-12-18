const express = require('express');
const router = express.Router();
const OpenID = require('../models/OpenID');


router.get('/', async(req,res) =>{
    try{
        const openID = await OpenID.find(); 
        res.json(openID);
    }catch(err){
        res.json({ message:err });
    }
})  

router.post('/', async(req, res) => {
    const openID = new OpenID({
        openID: req.body.openID,
        amount: req.body.amount
    });
    try{
        const savedOpenID = await openID.save()
        res.json(savedOpenID);
    }catch(err){
        res.json({ message:err });
    }
})

module.exports = router;

/*router.post('/openID', async(req, res) => {
    const openID = req.body.openID;

    const respond = () => {
        res.json({
            openID: this.openID,
            amount: 100
        })
    }
}) */