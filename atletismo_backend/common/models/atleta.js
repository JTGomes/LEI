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

  Atleta.getEquipamento = function(req, data, callback){
  //   const payload = decodeToken(req.headers.authorization);
  //
  //   if (!payload) {
  //     return callback(new Error('Authentication is required'));
  //   }
  Atleta.find({
    include:{
        relation: "equipamentos",
        scope:{
           where: {
             atletaId: data.atletaId,
            }
          }
        },where:{ativo:true}
    })
  .then(result => callback(null, result))
  .catch(error => console.log(error))

  };

  Atleta.remoteMethod('getEquipamento',
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

};
