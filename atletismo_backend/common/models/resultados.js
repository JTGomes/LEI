'use strict';

module.exports = function(Resultados) {

  Resultados.getUltimosResultados = function(req, data, callback){
  //   const payload = decodeToken(req.headers.authorization);
  //
  //   if (!payload) {
  //     return callback(new Error('Authentication is required'));
  //   }
  Resultados.find({})
  .then(results => results.map(result=>
    Resultados.app.models.Atleta.findById(result.atleta)
    .then( atleta =>{ var a = result.toJSON(); a.user = atleta; return a }  )
  ))
  .then(promises => Promise.all(promises))
  .then( atletas => callback(null, atletas) )
  .catch(error => console.log(error))

  };

  Resultados.remoteMethod('getUltimosResultados',
  {
   accepts: [
     { arg: 'req', type: 'object', http: { source: 'req' } },
     { arg: 'data', type: 'any', required: false, http: { source: 'body' } },
   ],
   returns: { arg: 'accessToken', type: 'object', root: true },
   http: {verb: 'get'},
  }
  );

  Resultados.getResultadosAtleta = function(req, id, callback) {
    console.log(id);
    Resultados.find({where: {atleta: id}})
    .then(results => results.map(result => 
      Resultados.app.models.Atleta.findById(result.atleta)
      .then(atleta => {var a = result.toJSON(); a.user = atleta; return a} )
    ))
    .then(promises => Promise.all(promises))
    .then( atletas => callback(null, atletas) )
    .catch(error => console.log(error))
  };

  Resultados.remoteMethod('getResultadosAtleta',
  {
   accepts: [
     { arg: 'req', type: 'object', http: { source: 'req' } },
     { arg: 'id', type: 'number', required: true },
   ],
   returns: { arg: 'accessToken', type: 'object', root: true },
   http: {path: '/getResultadosAtleta/:id', verb: 'get'},
  }
  );

};
