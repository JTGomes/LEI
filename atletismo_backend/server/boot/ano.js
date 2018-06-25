'use strict';

module.exports = function(app) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  if(month<=7){
    year= year-1;
  }
  app.models.Ano.findOrCreate({where:{id :1}},{ano: year})
};
