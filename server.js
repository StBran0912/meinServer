const express = require('express');
const app = express();

//Statisches Verzeichnis setzen
app.use(express.static('public'));

//Logger implementieren
//app.use('/', (req, res, next) => console.log(new Date().toLocaleString() + ' ' + req.headers["user-agent"]));
app.use('/', (req, res, next) => {
    console.log(`Zugriff am: ${new Date().toLocaleString()}     von Client: ${req.ip}`);
    next();
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server gestartet an Port ${PORT}`));
