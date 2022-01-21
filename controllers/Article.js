const mongoose = require('mongoose');
const Article = require('../models/Article')
const Comment=require('../models/Comment')
exports.postArticle =async(req,res,next) =>{
                const article = new Article({ 
                    title:req.body.title,
                    summary:req.body.summary,
                    picture:req.file.filename,
                    contents:req.body.contents,
                    owner:req.user._id
                })
                 await article.save().then((item)=>{
                    res.status(200).send({
                        message: 'article saved successful',
                        data: item
                    })
                })
                .catch((err)=>{
                    res.status(500).send({
                        message:err.message
                    })
                });
       
}

exports.getArticles=async(req,res,next)=>{
    // try {
        const articles = await Article.find({})
            res.send(articles)
    // } catch (error) {
    //     res.send({message:error.message})
    // }
}
exports.getArticle=async(req,res,next)=>{
    const _id = req.query.id
    try {
        const article = await Article.findOne({_id})
        const artCom = await Comment.find({Article:req.query.id})
        console.log("artCom",artCom)
        console.log(artCom)
        let comment = [];
        for(const c in artCom){
          comment.push(artCom[c].fullName)
          comment.push(artCom[c].comment)
          comment.push('___________________')
        }
        // if(!article){
        //     res.send({message:'no article found'})
        // }
        res.send({
            message: 'operation successful',
            article,
            comment
        })
    } catch (error) {
        res.status(500).send({message:error.message});
    }
}

exports.deleteArticle= async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.query.id, owner: req.user._id })
        if (!article) {
            res.send('article not found')
        }
     
        await Article.deleteOne({ _id: req.query.id, owner: req.user._id })
        res.send({
            message: " article deleted successful",
            article: article
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}

exports.updateArticle = async(req,res)=>{
  const article = new Article({
      _id:req.query.id,
      title: req.body.title,
      summary:req.body.summary,
      contents:req.body.contents
  });
  Article.updateOne({_id:req.query.id},article).then(()=>{
       res.status(201).send({
           message:'Article updated successfully'
       });
  }).catch((error)=>{
      res.json({
          error:error
      });
  })
}