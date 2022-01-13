const mongoose = require('mongoose');
const Article = require('../models/Article')


exports.postArticle =async(req,res,next) =>{
                const article = new Article({ 
                    title:req.body.title,
                    summary:req.body.summary,
                    picture:req.file.filename,
                    content:req.body.content
                    // owner:req.user._id
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
    const _id = req.params.id
    try {
        const article = await Article.findOne({_id})
        const artCom = await Comments.find({Article:req.params.id})
        let comments = [];
        for(const c in artCom){
          comments.push(artCom[c].fullName)
          comments.push(artCom[c].comment)
          comments.push('___________________')
        }
        // if(!article){
        //     res.send({message:'no article found'})
        // }
        res.send({
            message: 'operation successful',
            article,
            comments
        })
    } catch (error) {
        res.status(500).send({message:error.message});
    }
}
exports.deleteArticle = async(req,res)=>{
    try {
        
        const article =await Article.findOne({_id:req.params.id})
    //     if(!article){
    //        res.send('blog not found')
    //    }
       res.send({
           message:'deleted successful',
        article:article})
    } catch (error) {
        res.status(404).send(error.message)
    }
}

exports.updateArticle = async(req,res)=>{
  const article = new Article({
      _id:req.params.id,
      title: req.body.title,
      summary:req.body.summary,
      content:req.body.content
  });
  Article.updateOne({_id:req.params.id},article).then(()=>{
       res.status(201).send({
           message:'Article updated successfully'
       });
  }).catch((error)=>{
      res.json({
          error:error
      });
  })
}