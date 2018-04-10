var express=require("express");
var hbs=require("hbs");
var fs=require("fs");

var app=express();

// app.use((req,res,next)=>{
	// res.render('partials/maintenance.hbs');
// });

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use(express.static(__dirname + "/public"));
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});



//app.use is how you register middleware. It takes a function.
app.use((req, res, next)=>{
	var now=new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log +'\n',(err)=>{
		if(err){console.log('Unable to append to server.')}
	});
	
	next();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{	
	res.render('index.hbs',{
		pageTitle:'Index Page',
		currentYear:new Date().getFullYear(),
		pageName:"Node Web App",
		welcomeMessage:"Welcome to my node.js page."
		
	});
});
app.get('/about',(req, res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page',
		currentYear:new Date().getFullYear()
	});
});

app.get('/bad',(req, res)=>{
	res.send({errorMessage:"Bad."});
});

// app.get('/help.html',(req, res)=>{
	// res.send();
// });
app.listen(3000,()=>{
	console.log("Server is up on port 3000.");
});