const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

function initServer() {
    const server = express();
    server.use(cors());
    server.use(express.static(path.join(__dirname, 'public')));
    server.use(bodyParser.json());
    server.use(bodyParser.text());
    server.use(bodyParser.raw());
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(function(req, res, next){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE, PATCH");
        res.setHeader("Access-Control-Allow-Headers", "content-type, token");
        res.setHeader("Access-Control-Allow-Credentials", true);
        next();
    });
    server.get('*', (req, res) => {
        if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
            res.sendFile(path.resolve('public' + req.url));
        } else {
            res.sendFile(path.resolve('public/index.html'));
        }
    });

    server.listen(process.env.PORT || 5000, () => {
        console.log('Server running at http://${hostname}:${port}/');
    });
}

initServer();
