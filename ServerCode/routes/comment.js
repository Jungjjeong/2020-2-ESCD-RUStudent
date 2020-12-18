const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

//댓글은 특정 댓글만 불러오거나 수정이 불가함
//오직 전체 댓글 가져오기와 댓글 쓰기만 가능

//return all the post
router.get('/', async(req,res) =>{
    try{
        const comments = await Comment.find();   
        res.json(comments);
    }catch(err){
        res.json({ message:err });
    }
})

//submit a post 
router.post('/', async(req, res) => {    //reformat by async
    const comments = new Comment({
        parent_id: req.body.parent_id,
        title: req.body.title,
        inputscore: req.body.inputscore,
        contents: req.body.contents
    });
    try{ 
        const savedComment = await comments.save()
        res.json(savedComment);
    }catch(err){
        res.json({ message:err });
    }
})

//delete post   -- 댓글 삭제 가능
router.delete('/:commentId', async(req,res) => {
    try{
        const removedComment = await Comment.remove({_id: req.params.commentId}); //_id == objectid
        res.json(removedComment);
    }catch(err){
        res.json({ message:err });
    }
})

module.exports = router;