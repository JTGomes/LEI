var CronJob = require('cron').CronJob;

// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11 (Jan-Dec)
// Day of Week: 0-6 (Sun-Sat)


var jobAniversarios = new CronJob('00 01 00 * * *', function() {
console.log('executou')
/*
  Código que coloca mensagem nos diretores
*/
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
