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

  Resultados.adicionarResultados = function(req, data, callback){

    Resultados.create({
      nome: data.nome,
      disciplina: data.disciplina,
      classificacao: data.classificacao,
      data: data.data,
      local: data.local,
      resultado: data.resultado,
      atleta: data.userId
    }).then( res => {
      Resultados.app.models.Atleta.findById(data.userId)
      .then(atleta => {
        Resultados.app.models.User.find({where: {role : 'Diretor'}})
        .then(diretores => {
          diretores.map(diretor => {
             models.notificacao.create({
                data: today,
                isRead: false,
                mensagem: "O/A atleta "+atleta.nome_competicao+" inseriu um novo resultado, relativo à competição "+data.nome,
                assunto: "Resultado adicionado",
                userId: diretor.id } )
          })
        });
      })
    })

  };

  Resultados.remoteMethod('adicionarResultados',
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
