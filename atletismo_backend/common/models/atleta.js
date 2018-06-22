'use strict';

module.exports = function(Atleta) {

	Atleta.ultimosResultados = function(req, data, callback) {

		Atleta.find({
			include:{
				relation: "resultados"
			}
		}).then(results => callback(null, results)).catch(error => console.log(error))

	};

	Atleta.remoteMethod('ultimosResultados',
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
