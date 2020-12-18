const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

router.get('/', async(req,res) =>{
    try{
        const payment = await Payment.find(); 
        res.json(payment);
    }catch(err){
        res.json({ message:err });
    }
})

//submit a post
router.post('/', async(req, res) => {    //reformat by async
    const payment = new Payment({
        name: req.body.name,
        price: req.body.price,
        totalprice: req.body.totalprice,
        num: req.body.num,
        nickname: req.body.nickname
    });
    try{
        const savedPayment = await payment.save()
        res.json(savedPayment);
    }catch(err){
        res.json({ message:err });
    }
})

//specific post
router.get('/:paymentId', async(req,res) => {
    try{
        const payment = await Payment.findById(req.params.paymentId);
        const findPayment = await Payment.find({parent_id: req.params.paymentId});
        post._doc.Payment = findPayment;
        console.log(findPayment);
        res.json(payment);     //ex: http://localhost:3000/posts/objectId
    }catch(err){
        res.json({message:err});
    }
})

//delete post
router.delete('/:paymentId', async(req,res) => {
    try{
        const removedPayment = await Payment.remove({_id: req.params.paymentId}); //_id == objectid
        res.json(removedPayment);
    }catch(err){
        res.json({ message:err });
    }
})


//update a post
/*router.patch('/:paymentId', async(req,res) => {
    try{
        const updatedPayment = await Payment.updateOne(
            {_id: req.params.paymentId}, 
            {$set: {title: req.body.title} }    //_id 뒤부터는 내가 변경하고 싶은 놈들 반영
            ); 
        res.json(updatedv);
    }catch(err){
        res.json({ message:err });
    }
})*/

module.exports = router;