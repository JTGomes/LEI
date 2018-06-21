var CronJob = require('cron').CronJob;
var models = require('../server.js').models;
// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11 (Jan-Dec)
// Day of Week: 0-6 (Sun-Sat)


var jobAniversarios = new CronJob('00 01 00 * * *', function() {
	var today = getDate();
	var data = today.slice(0,-5);
	models.Atleta.find({where : {ativo : true}})
	.then(users => users.map(user => {
			if(user.dataNascimento.slice(0,-5) == data){
				models.User.find({where: {role : 'Diretor'}})
				.then(diretores => {
					diretores.map(diretor => {
						models.User.findById(user.userId)
						.then(atleta => models.notificacao.create({
								data: today,
								isRead: false,
								mensagem: "Aniversário do atleta "+atleta.nome,
								assunto: "Aniversário",
								userId: diretor.id } ))
					})
				})
			}
	}));
  }, function () {
    /* This function is executed when the job stops */
    console.log('job parou')
  },
  true, /* Start the job right now */
  'Europe/Lisbon'/* Time zone of this job. */
);

var jobPagamentos = new CronJob('00 01 00 8 * *', function() {
        console.log('executou')
        /*
          Codigo que atualiza os "caloteiros"
        */
  }, function () {
    /* This function is executed when the job stops */
    console.log('job parou')
  },
  true, /* Start the job right now */
  'Europe/Lisbon'/* Time zone of this job. */
);

var jobExames = new CronJob('00 24 11 * * *', function() {
	var today = getDate();
	var data = get15DaysLaterDate();
	console.log(data);
	models.Atleta.find({where : {ativo : true}})
	.then(users => users.map(user => {
		if(user.dataNascimento.slice(0,-5) == data){
			models.User.findById(user.userId)
			.then( atleta => {
				if(atleta.validado){
					models.notificacao.create({
						data: today,
						isRead: false,
						mensagem: "Renovar exame médico",
						assunto: "Exame médico",
						userId: user.userId } );

						models.User.find({where: {role : 'Diretor'}})
						.then(diretores => {
							diretores.map(diretor =>
								models.notificacao.create({
									data: today,
									isRead: false,
									mensagem: "Exame Médico do atleta "+atleta.nome+" deve ser validado",
									assunto: "Exame médico",
									userId: diretor.id })
								)
							})
						}
					})
				}
			}));
		}, function () {
    /* This function is executed when the job stops */
    console.log('job parou')
  },
  true, /* Start the job right now */
  'Europe/Lisbon'/* Time zone of this job. */
);

function get15DaysLaterDate(){
	var date = new Date();
	date.setDate(date.getDate() + 15);
	var month = date.getMonth()+1;
	var day = date.getDate();

	if (day.toString().length == 1)
		 day = "0"+day;
	if (month.toString().length == 1)
			month = "0"+month;

			return `${day}/${month}`;
}

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
