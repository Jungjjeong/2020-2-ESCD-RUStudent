const express = require('express');
const router = express.Router();
const Food = require('../../models/restraunt/Dormitory');
const Comment = require('../../models/Comment');

//모든 음식을 받는다
router.get('/', async(req,res) =>{
    try{
        const food = await Food.find(); 
        res.json(food);
    }catch(err){
        res.json({ message:err });
    }
})  

//음식 정보를 하나 추가한다
router.post('/', async(req, res) => {    //reformat by async
    const food = new Food({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        ingredient: req.body.ingredient,
        //averageScore: req.body.averageScore,
        url: req.body.url
    });
    try{
        const savedFood = await food.save()
        res.json(savedFood);
    }catch(err){
        res.json({ message:err });
    }
})

//특정 음식을 불러온다
router.get('/:foodId', async(req,res) => {
    //console.log(req.params.postId);
    try{
        const food = await Food.findById(req.params.foodId);
        const findComment = await Comment.find({parent_id: req.params.foodId});
        post._doc.comments = findComment;
        console.log(findComment);
        res.json(food);     //ex: http://localhost:3000/posts/objectId
    }catch(err){
        res.json({message:err});
    }
})

//특정 음식을 삭제한다
router.delete('/:foodId', async(req,res) => {
    try{
        const removedFood = await Food.remove({_id: req.params.foodId}); //_id == objectid
        res.json(removedFood);
    }catch(err){
        res.json({ message:err });
    }
})

//특정 음식의 특정 정보를 수저안다
router.patch('/:foodId', async(req,res) => {
    try{
        const updatedFood = await Food.updateOne(
            {_id: req.params.foodId}, 
            {$set: {title: req.body.title} }    //_id 뒤부터는 내가 변경하고 싶은 놈들 반영
            ); 
        res.json(updatedFood);
    }catch(err){
        res.json({ message:err });
    }
})

module.exports = router;