/**
 * Created by supun on 8/8/2017.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3039;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()
});
app.set('view engine', 'hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = (now+' :'+ req.method+''+req.url );
    fs.appendFile('server.log', log+'\n');
    console.log(log);
    next();
});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));


app.get('/',(req, res) => {
    res.render('home.hbs',{
        title: 'Some page',
        welcomeMessage: 'you are welcome'
    })
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        title: 'Projects',

    })
});

app.get('/about',(req, res) => {
    res.render('help.hbs', {
        title: 'Some page',
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'unable to display'
    })
});

app.listen(port,()=>{
    console.log('server is up on '+port);
});