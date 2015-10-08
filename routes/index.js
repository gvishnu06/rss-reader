var express = require('express');
var router = express.Router();
var feed = require("feed-read");
var request = require('request');

/* GET home page. */
router.get('/news', function(req, res, next) {
  feed("http://craphound.com/?feed=rss2", function(err, articles) {
  	if (err)
  	{
  		res.status(400).end();
  	}
  	if(articles)
  	{
  		if(articles.length == 0)
  		{
  			res.status(204).end();
  		}
  		else
  		{
  			res.send({"news":articles});
  		}
  	}
  });
});

router.post('/search',function(req,res,next){
	var searchUrl = req.body.searchUrl;
	if(searchUrl)
	{
		feed(searchUrl, function(err, articles) {
  			if (err)
  			{
  				res.status(400).end();
  			}
  			if(articles)
	  		{
  				if(articles.length == 0)
  				{
  					res.status(204).end();
  				}
  				else
  				{
  					res.send({"news":articles});
  				}
  			}
  		});
	}
});

module.exports = router;
