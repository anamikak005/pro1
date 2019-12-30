const express=require('express');
const router=express.Router();
const Url=require('../models/Url');
//@route GET /:code

//@desc  Redirect to long url

router.get('/:code',async(req,res)=>{

 
  try{
    let username=req.params.code;
    if( username === null ||username.length < 1 )
    { console.log(req.params.code);
       res.redirect('/home');
    }

const url=await Url.findOne({ urlCode: req.params.code});

if(url){
  return res.redirect(url.longUrl);

}
else{
  return res.render('show',{
    url:'No page found'
  });

}
  }
  catch(err){
    console.log(err);
    return res.render('show',{
      url:'Server Error'
    });

  }
});


module.exports=router;