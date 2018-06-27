const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const app = express();
const fs = require('fs');


const multer = require('multer');

const uploadDirectory = '/uploads/';
const currentPath = __dirname;
const uploadDirectoryPath = path.join(currentPath,uploadDirectory);

const storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null, uploadDirectoryPath);
	},
	filename: function(req,file,cb){
		//console.log(file);
		cb(null, file.originalname + '');
	}
});


const upload = multer({ storage: storage});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.post('/api/User/uploads/',upload.any(),function(req,res,next){
	console.log(req.files);
	res.status(200);
	res.send("Ok");
});



const options = {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static(uploadDirectoryPath, options))

app.get('/uploads/',function(req,res,next){
	console.log(uploadDirectoryPath);
	fs.readdir(uploadDirectoryPath, function(error, files){
		if( error){
			console.log(error);
			throw error;
		}
		res.send(JSON.stringify(files));
	})
})


app.get('/uploads/file/:filename',function(req,res,next){

	res.sendFile( path.join(uploadDirectoryPath,req.params.filename));

	
});

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '4500');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, '0.0.0.0');
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}


module.exports = app;
