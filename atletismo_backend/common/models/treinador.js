'use strict';

module.exports = function(Treinador) {

  Treinador.getTreinadores = function(req, data, callback){
 //   const payload = decodeToken(req.headers.authorization);
 //
 //   if (!payload) {
 //     return callback(new Error('Authentication is required'));
 //   }
 Treinador.find({
   include:{
       relation: "user",
       scope:{
          where: {
            validado: true,
           }
         }
       },where:{ativo:true}
   })
 .then(result => callback(null, result))
 .catch(error => console.log(error))

 };

 Treinador.remoteMethod('getTreinadores',
 {
   accepts: [
     { arg: 'req', type: 'object', http: { source: 'req' } },
     { arg: 'data', type: 'any', required: false, http: { source: 'body' } },
   ],
   returns: { arg: 'accessToken', type: 'object', root: true },
   http: {verb: 'get'},
 }

 );

    Treinador.updateDados = function (req, data, callback) {
  

    Treinador.findById(data.id)
      .then(treinador => treinador.updateAttributes({
        morada: data.morada,
        telemovel: data.telemovel,
        codPostal: data.codPostal,
        localidade: data.localidade
      }))
      .then(response => callback(null, "OK"))
      .catch(error => callback(error))
    ;
  };

  Treinador.remoteMethod(
    'updateDados',
    {
      accepts: [     
        { arg: 'req', type: 'object', http: { source: 'req' } },
        { arg: 'data', type: 'any', required: false, http: { source: 'body' } }
        ],
      returns: {arg: 'accessToken', type: 'object', root: true},
      http: {verb: 'put'},
    }
  );

  Treinador.removerPermissao = function (req, data, callback) {


 Treinador.findById(data.id)
   .then(treinadorV => Treinador.app.models.User.findById(treinadorV.userId)
            .then(user => user.updateAttributes({validado: false}) )
   )
   .then(response => callback(null, "OK"))
   .catch(error => callback(error))
 ;
};

Treinador.remoteMethod(
 'removerPermissao',
 {
   accepts: [
     { arg: 'req', type: 'object', http: { source: 'req' } },
     { arg: 'data', type: 'any', required: false, http: { source: 'body' } }
     ],
   returns: {arg: 'accessToken', type: 'object', root: true},
   http: {verb: 'put'},
 }
);

};
