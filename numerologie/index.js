const path = require('path')

const express = require('express')

const numerologie = require('./back/numerologie');

const app = express()

const hostname = '127.0.0.1';
const port = 3000;


app.use(function (req, res, next) {
    date = new Date(Date.now())
    console.log('Time:', date.toLocaleDateString(), date.toLocaleTimeString(), "; url :", req.url);
    next(); // sans cette ligne on ne pourra pas poursuivre.
})

app.use("/static", express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})

app.get(encodeURI('/prénom'), (req, res) => {
    console.log(req.query)
    prenom = req.query["valeur"]
    chiffre = numerologie.chiffre(prenom)

    res.json({
        prénom: prenom,
        chiffre: chiffre,
    })
})

app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("<html><head><title>la quatre cent quatre</title></head><body><h1>Et c'est la 404.</h1><img  src=\"https://www.leblogauto.com/wp-content/uploads/2020/04/Peugeot-404-1.jpg\" /></body></html>");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);