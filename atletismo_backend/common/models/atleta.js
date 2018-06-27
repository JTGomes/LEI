'use strict';

module.exports = function(Atleta) {

   Atleta.getAtletas = function(req, data, callback){
  //   const payload = decodeToken(req.headers.authorization);
  //
  //   if (!payload) {
  //     return callback(new Error('Authentication is required'));
  //   }
  Atleta.find({
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

  Atleta.remoteMethod('getAtletas',
  {
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'data', type: 'any', required: false, http: { source: 'body' } },
    ],
    returns: { arg: 'accessToken', type: 'object', root: true },
    http: {verb: 'get'},
  }
  );

   Atleta.updateDados = function (req, data, callback) {
  

    Atleta.findById(data.id)
      .then(atleta => atleta.updateAttributes({
        morada: data.morada,
        telemovel: data.telemovel,
        tipoDocumento: data.documento,
        codigoPostal: data.codigoPostal,
        localidade: data.localidade,
        encarregado: data.encarregado,
        contactoEnc: data.contactoEnc
      }))
      .then(response => callback(null, "OK"))
      .catch(error => callback(error))
    ;
  };

  Atleta.remoteMethod(
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

  Atleta.getExamesMedicosFalta = function(req, data, callback){
 //   const payload = decodeToken(req.headers.authorization);
 //
 //   if (!payload) {
 //     return callback(new Error('Authentication is required'));
 //   }
 Atleta.find({
   include:{
       relation: "user",
       scope:{
          where: {
            validado: true,
           }
         }
       },where:{exameFalta:true, ativo: true}
   })
 .then(atletas => atletas.filter(atleta => atleta.toJSON().hasOwnProperty('user')))
 .then(result => callback(null, result))
 .catch(error => console.log(error))

 };

 Atleta.remoteMethod('getExamesMedicosFalta',
 {
   accepts: [
     { arg: 'req', type: 'object', http: { source: 'req' } },
     { arg: 'data', type: 'any', required: false, http: { source: 'body' } },
   ],
   returns: { arg: 'accessToken', type: 'object', root: true },
   http: {verb: 'get'},
 }
 );



 Atleta.validaExame = function(req, data, callback){
//   const payload = decodeToken(req.headers.authorization);
//
//   if (!payload) {
//     return callback(new Error('Authentication is required'));
//   }
Atleta.findById(data.id)
.then(atleta => atleta.updateAttributes({ exameFalta : false}))
.then(result => callback(null, result))
.catch(error => console.log(error))

};

Atleta.remoteMethod('validaExame',
{
  accepts: [
    { arg: 'req', type: 'object', http: { source: 'req' } },
    { arg: 'data', type: 'any', required: true, http: { source: 'body' } },
  ],
  returns: { arg: 'accessToken', type: 'object', root: true },
  http: {verb: 'post'},
}
);



Atleta.getPagamentosFalta = function(req, data, callback){
//   const payload = decodeToken(req.headers.authorization);
//
//   if (!payload) {
//     return callback(new Error('Authentication is required'));
//   }
Atleta.find({
 include:[{
     relation: "user",
     scope:{
        where: {
          validado: true,
         }
       }
     },
     {
         relation: "pagamento",
         scope:{
            where: {
              data: null,
              quantia: null
             }
           }
         }

   ],where:{ativo:true, isIsento: false}
 })
.then(results => results.filter(result=> result.toJSON().hasOwnProperty('user')
                                          && (result.toJSON().pagamento.length>0)
                                          ))
.then(atletas => callback(null,atletas))
.catch(error => console.log(error))

};

Atleta.remoteMethod('getPagamentosFalta',
{
 accepts: [
   { arg: 'req', type: 'object', http: { source: 'req' } },
   { arg: 'data', type: 'any', required: false, http: { source: 'body' } },
 ],
 returns: { arg: 'accessToken', type: 'object', root: true },
 http: {verb: 'get'},
}
);
};
