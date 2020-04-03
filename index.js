const express = require('express');
const app = express();


let tenMov = [ {
  title : 'He Got Game',
  year: '1998',
  director: 'Spike Lee',
  stars: 'Denzel Washington, Ray Allen'
},
{
  title: 'The Science of Sleep',
  year: '2006',
  director: 'Michel Gondry',
  stars: 'Gael Garcia Bernal, Charlotte Gainsbourg'
},
{
  title: 'Spanglish',
  year: '2004',
  director: 'James L. Brooks',
  stars: 'Adam Sandler, Paz Vega'
},
{
  title: 'Friday',
  year: '1995',
  director: 'F. Gary Gray',
  stars: 'Ice Cube, Chris Tucker'
},
{
  title: 'The Dark Knight',
  year: '2008',
  director: 'Christoper Nolan',
  stars: 'Christian Bale, Heath Ledger'
},
{
  title: 'Seven Samurai',
  year: '1954',
  director: 'Akira Kurosawa',
  stars: 'Toshiro Mifune, Takashi Shimura'
},
{
  title: 'Akira',
  year: '1988',
  director: 'Katsuhiro Otomo',
  stars: 'Mitsuo Iwata, Nozomu Sasaki'
},
{
  title: 'Stand By Me',
  year: '1986',
  director: 'Rob Reiner',
  stars: 'Wil Wheaton, River Phoenix'
},
{
  title: 'Hotel Chevalier',
  year: '2007',
  director: 'Wes Anderson',
  stars: 'Jason Schwartzman, Natalie Portman'
}
]

app.get('/movies', function(req, res){
  res.json(tenMov)
});
app.get('/', function(req,res){
  res.send('Welcome to my Top Ten Films')
});



//listen
app.listen(8080)
