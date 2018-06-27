'use strict';

module.exports = function(Notificacao) {


  Notificacao.SendNotificationAll = function(req, data, callback){
    // const payload = decodeToken(req.headers.authorization);
    //
    // if (!payload) {
    //   return callback(new Error('Authentication is required'));
    // }
    var moment = getDate();
    Promise.all(data.users.map(id => Notificacao.create({
      data: moment,
      mensagem: data.mensagem,
      assunto: data.assunto,
      userId: id
    })))
    .then(result => callback(null, "ok"))
    .catch(error => console.log(error))


  };

  Notificacao.remoteMethod('SendNotificationAll',
  {
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'data', type: 'any', required: false, http: { source: 'body' } },
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
