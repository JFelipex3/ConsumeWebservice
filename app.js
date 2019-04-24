var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var utils = require("./utils");

var app = express();

app.use(bodyParser.json()); // Para peticiones application/json
app.use(bodyParser.urlencoded({extended: true})); // Se puede hacer parser de muchos objetos como arreglos

app.set('views', './views');
app.set('view engine', 'jade');

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/monedas", function(req, res){
  var url = "https://api.gael.cl/general/public/monedas";
  request.get(url, function (error, response, body){
    if (!error && response.statusCode == 200){
        res.render("monedas/indexMonedas", {monedas: JSON.parse(body)});
     }
   });
});

app.get("/monedas/:id", function(req, res){
  var url = "https://api.gael.cl/general/public/monedas/" + req.params.id;
  request.get(url, function(error, response, body){
    if (!error && response.statusCode == 200){
      var mon = JSON.parse(body);
      var fecha = new Date(Date.parse(mon.Fecha));
      var moneda = {
        Codigo: mon.Codigo,
        Nombre: mon.Nombre,
        Valor: mon.Valor,
        Fecha: utils.getFormatFecha(fecha, '-')
      };
      res.render("monedas/detMonedas", {moneda: moneda});
    }
  });
});

app.listen(8080);
