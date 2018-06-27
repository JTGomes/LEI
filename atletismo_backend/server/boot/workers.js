var CronJob = require('cron').CronJob;
var models = require('../server.js').models;
// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11 (Jan-Dec)
// Day of Week: 0-6 (Sun-Sat)

const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
								'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

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
/* |      00 01 00 8 9-7 *   |   */
var jobPagamentos = new CronJob('00 00 02 8 9,10,11,0,1,2,3,4,5,6,7 *', function() {
	var today = getDate();
	var mesPagamento = new Date().getMonth()-1;
	if(mesPagamento===-1){
		mesPagamento=11;
	}

	models.Ano.findById(1)
	.then( Ano =>
		models.Atleta.find({
			include:{
					relation: "user",
					scope:{
						 where: {
							 validado: true,
							}
						}
					},where:{ativo: true, isIsento: false}
			})
		.then(atletas => atletas.filter(atleta => atleta.toJSON().hasOwnProperty('user')))
		.then(atletasValidos => atletasValidos.map(atletaV =>
			models.Pagamento.find({where : {atleta : atletaV.id, ano: Ano.ano}})
		  .then(pagamentos => {if(!pagamentos.some( pagamento => pagamento.mes===meses[mesPagamento])){
				models.Pagamento.create({
					mes: meses[mesPagamento],
					ano: Ano.ano,
					atleta: atletaV.id
				});

				models.User.find({where: {role : 'Diretor'}})
				.then(diretores => {
					diretores.map(diretor => {
						 models.notificacao.create({
								data: today,
								isRead: false,
								mensagem: "Pagamento da mensalidade em falta do atleta "+ atletaV.toJSON().user.nome,
								assunto: "Pagamentos em Falta",
								userId: diretor.id } )
					})
				});

				models.notificacao.create({
					data: today,
					isRead: false,
					mensagem: "O pagamento da mensalidade do mês de "+ meses[mesPagamento] + " ainda não foi efetuado.",
					assunto: "Pagamento Mensalidade",
					userId: atletaV.toJSON().user.id
				})

			}
		}
			)

		)
		)
	)
  }, function () {
    /* This function is executed when the job stops */
    console.log('job parou')
  },
  true, /* Start the job right now */
  'Europe/Lisbon'/* Time zone of this job. */
);

var jobExames = new CronJob('00 30 00 * * *', function() {
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

/*00 00 02 25 07 * */
var newEpoca = new CronJob('00 00 02 25 07 *',
	function() {
		var currentAno = getCurrentAno()
		models.Ano.findById(1)
		.then(ano => ano.updateAttributes({ano: currentAno}))
		.catch(error => console.log(error))
		models.equipamento.destroyAll()
	},
	function(){
			console.log('job parou')
	},
	true,
	'Europe/Lisbon');


/* Funçoes auxiliares   */




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

function getCurrentAno(){
	var today = new Date();
	return today.getFullYear();
}
