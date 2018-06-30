const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const app = express();
const fs = require('fs');

const jwt = require('jsonwebtoken');

const multer = require('multer');

const uploadDirectory = '/uploads/';
const currentPath = __dirname;
const uploadDirectoryPath = path.join(currentPath,uploadDirectory);
const uploadTmpDirectoryPath = path.join(uploadDirectoryPath,'/tmp');

// try to create directory of uploads, if he can't create it can't work, if it already exist
// it does nothing i guess...
fs.mkdir(uploadDirectoryPath,function(error){
	if(error) console.log(error);
});
fs.mkdir(uploadTmpDirectoryPath,function(error){
	if(error) console.log(error);
});

function decodeToken (authHeader) {
     if (!authHeader) {
       return false;
     }
     //bearer token required
     const parts = authHeader.split(' ');

     if (parts.length !== 2) {
       return false;
     }

     return jwt.verify(parts[1], 'SECRET');
   }

function getToken(authHeader){
	     const parts = authHeader.split(' ');
	     return parts[1];
}

function getId(token){
	return jwt.decode(token).userId;
}

function directoryExist(id){

	return	fs.access(uploadDirectoryPath, fs.constants.F_OK,(error)=>{
			console.log(`A pasta uploads ${err ? 'não existe':"existe"}`);
			if(err) return false;
			else true;
		});
}

// Upload directory need to be the directory of the User
const storage = multer.diskStorage({
	// destination need to be dynamic depending of the user
	// something like 
	// 1 check if directory exist
	//  if exist then  put in the directory
	// if doesn't exist create directory
	destination: function(req,file,cb){
		console.log(req.headers.authorization);
		// se token invalido põe a o ficheiro numa pasta especial
		let directory = '/tmp';
		let valid = false;
		try{
		 valid = decodeToken(req.headers.authorization);
		}catch(error){
			valid = false;
		}
		if(!valid){
			cb(null, uploadTmpDirectoryPath);
			return;
		}
		
		const id = getId(getToken(req.headers.authorization));
		directory = path.join(uploadDirectoryPath,`/${id}`);

		fs.readdir(directory, function(error, files){
			if( error){
				console.log(directory,error);
				fs.mkdir(directory,function(error){
							if(error) { 
								fs.readdir(directory,function(error,files){
									if(error){
										console.log(error);
										cb(null,uploadTmpDirectoryPath);
									}else cb(null,directory);
									
								})
							}
							else cb(null, directory);
				})
			} 
			else cb(null,directory)
		});
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
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
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

// Get name of files in upload directory
// 
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


app.get('/token/:id',function(req,res,next){
	const id = req.params.id;
	res.send( jwt.sign({ userId: id, userRole: 'Treinador' }, 'SECRET') );
})

app.get('/uploads/:id/:filename',function(req,res,next){
	const id = req.params.id;
	const filename = req.params.filename;

	res.sendFile( path.join(uploadDirectoryPath,id,filename));

	
});

app.get('uploads/path/:id/filename',function(req,res,next){
	res.send(path.join(uploadDirectoryPath,id,filename));
})

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
