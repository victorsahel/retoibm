const bodyParser = require('body-parser');
const { response } = require('express');
var Request =require("request");
var http = require("http");
var mysql = require('mysql');

var conexion =mysql.createConnection({
    host:'127.0.0.1',
    database:'num',
    user:'root',
    password: ''

});
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }
})
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

x= getRandomInt(10);
y=getRandomInt(10);

suma = Request.get("http://localhost:81/ibm/api/index.php/retoibm/sumar/"+x+"/"+y,(error1,response,body)=> {
    if(error1){
        return console.dir(error1);
    }
    var obj=JSON.parse(body);
    console.dir(obj.result);
    conexion.query('INSERT into suma (a,b,result) values ('+x+','+y+','+obj.result+')', function(error2,results, fields){
        if(error2){
        throw error2;
        }
    });
    
})



http.createServer(function(request, respuesta){
    respuesta.writeHead(200,{'Content-Type':'text/plain'});
    respuesta.write("Hola Nginx");
    respuesta.end();
}).listen(3000,'localhost');

console.log('El servidor se muestra en http://localhost:3000');