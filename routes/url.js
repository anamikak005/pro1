const express=require('express');
const router=express.Router();
const validUrl=require('valid-url');
const shortid=require('shortid');
const config=require('config');
const Url=require('../models/Url');
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//@route  POST /api/url/shorten
//@desc Create short URL

 router.post('/shorten', async (req,res)=>{

const longUrl=req.body.long;
const baseUrl=config.get('baseUrl');

//base url check
if(!validUrl.isUri(baseUrl)){
  return res.status(401).json('Invalid base url');
}
//short url code
const urlCode=shortid.generate();


//check long url
if(validUrl.isUri(longUrl)){
 
  try{
let url=await Url.findOne({ longUrl: longUrl});
if(url)
{
  
 return res.render('show',{
  url:url.shortUrl
});

}
else{
  const shortUrl=baseUrl+'/'+urlCode;

  url =new Url({
longUrl,
shortUrl,
urlCode,
date:new Date()
  });
  await url.save();
  return res.render('show',{
    url:shortUrl
  });
  
}
  }
  catch(err){
console.error(err);
return res.render('show',{
  url:'Server Error'
});
  }
}else{
  return res.render('show',{
    url:'Invalid long Url'
  });


}
 });
module.exports=router;