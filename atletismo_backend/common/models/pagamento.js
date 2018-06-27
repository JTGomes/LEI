'use strict';

module.exports = function(Pagamento) {



  Pagamento.EfetuarPagamento = function(req, data, callback){
    // const payload = decodeToken(req.headers.authorization);
    //
    // if (!payload) {
    //   return callback(new Error('Authentication is required'));
    // }
    var moment = getDate();
    Pagamento.app.models.Ano.findById(1)
    .then(ano =>
      Promise.all( data.meses.map(mes =>
        Pagamento.findOne({where:{mes : mes, atleta: data.userId, data: null}})
          .then( row => {
            if(row){ row.updateAttributes({
                        data: moment,
                        quantia: data.quantia}) }else{
            Pagamento.create({
            data: moment,
            quantia: data.quantia,
            mes: mes,
            ano: ano.ano,
            atleta: data.userId}) }} )
        )
      ).then(resp => callback(null, "ok"))
      .catch(error => console.log(error))
    )
  };

  Pagamento.remoteMethod('EfetuarPagamento',
  {
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'data', type: 'any', required: true, http: { source: 'body' } },
    ],
    returns: { arg: 'accessToken', type: 'object', root: true },
    http: {verb: 'post'},
  }

  );


  Pagamento.getPagamentos= function(req, data, callback){
  //   const payload = decodeToken(req.headers.authorization);
  //
  //   if (!payload) {
  //     return callback(new Error('Authentication is required'));
  //   }
  Pagamento.app.models.Ano.findById(1)
  .then(ano => Pagamento.find({where:{atleta: data.userId, ano: ano.ano, data: {neq : null }}})
                .then(resp => callback(null, resp))
                .catch(error => console.log(error))
              )
  };

  Pagamento.remoteMethod(
     'getPagamentos',
     {
       accepts: [
         { arg: 'req', type: 'object', http: { source: 'req' } },
         { arg: 'data', type: 'object', required: true, http: { source: 'body' } },
       ],
       returns: { arg: 'accessToken', type: 'object', root: true },
       http: {verb: 'post'},
     }
   );


  function getDate(){
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var day = today.getDate();

    if (day.toString().length == 1)
       day = "0"+day;
    if (month.toString().length == 1)
        month = "0"+month;
    return `${day}/${month}/${year}`
  }



};
