const express = require('express');
const app = express();
const port = 8080;
let connected = false;
app.listen(port, () => {
  console.log(`[!] Listening on port: ${port}`)
})

app.get('/', function(req, res,next) {
    res.status(200).send('<h3>Status: <span style="color:green">Up</span></h3>')
});

const socket = require('socket.io-client')('https://vast-earth-81912.herokuapp.com');
socket.on('connect', function(){
  console.log(`[!] Ready`);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (barcode) {
  barcode = barcode.trim();
  socket.emit('barcode', barcode);
})
