'use strict';
const mail = require('../mail/index.js');
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


Atleta.darPermissao = function (req, data, callback) {


 Atleta.findById(data.id)
   .then(atleta => atleta.updateAttributes({
    ativo: true
   }))
   .then(atletaV => Atleta.app.models.User.findById(atletaV.userId)
            .then(user => user.updateAttributes({validado: true}) )
   )
   .then(response => callback(null, "OK"))
   .catch(error => callback(error))
 ;
};

Atleta.remoteMethod(
 'darPermissao',
 {
   accepts: [
     { arg: 'req', type: 'object', http: { source: 'req' } },
     { arg: 'data', type: 'any', required: false, http: { source: 'body' } }
     ],
   returns: {arg: 'accessToken', type: 'object', root: true},
   http: {verb: 'put'},
 }
);

Atleta.removerPermissao = function (req, data, callback) {


 Atleta.findById(data.id)
   .then(atleta => atleta.updateAttributes({
    ativo: false
   }))
   .then(atletaV => Atleta.app.models.User.findById(atletaV.userId)
            .then(user => user.updateAttributes({validado: false}) )
   )
   .then(response => callback(null, "OK"))
   .catch(error => callback(error))
 ;
};

Atleta.remoteMethod(
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


Atleta.getAtletasAntigos = function(req, data, callback){
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
          validado: false,
         }
       }
     },where:{ativo:false}
 })
.then(result => callback(null, result))
.catch(error => console.log(error))

};

Atleta.remoteMethod('getAtletasAntigos',
{
 accepts: [
   { arg: 'req', type: 'object', http: { source: 'req' } },
   { arg: 'data', type: 'any', required: false, http: { source: 'body' } },
 ],
 returns: { arg: 'accessToken', type: 'object', root: true },
 http: {verb: 'get'},
}
);



Atleta.enviaPlano = function (req, data, callback) {


        const  mailOptions = {
           from: 'atletismo.scbraga.bot@gmail.com', // sender address
           to: data.userId.email, // list of receivers
           subject: 'Plano de treino', // Subject line
           html: '<h1>Atletismo Braga</h1><p><strong>Segue em anexo o plano a seguir nos próximos treinos.</strong></p>',// plain text body
           attachments:{
           	// os dois funcionam
           	//path: 'D:\\LEI\\4º_Ano\\2ºSemestre\\Perfil Engenharia de Sistemas de Software\\Engenharia Web\\Trabalho pratico\\Test\\index.css'
            //href: "http://www.aabraga.pt/aab/competicao/comunicados/180701%20IV%20Trail%20Senhora%20do%20Carmo.pdf"
        }
         };
         mail.sendEmail(mailOptions);


    callback(null,"Ok")
  ;
};

Atleta.remoteMethod(
  'enviaPlano',
  {
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'data', type: 'any', required: true, http: { source: 'body' } },
    ],
    returns: { arg: 'accessToken', type: 'object', root: true },
    http: {verb: 'post'},
  }
);




};
