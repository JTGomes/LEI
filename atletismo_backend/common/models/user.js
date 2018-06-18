'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mail = require('../mail/index.js');


module.exports = function(User) {
  User.validatesUniquenessOf('email');

  function hashPassword (password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  function comparePassword (hash, password) {
    if (!hash || !password) {
      return Promise.resolve(false);
    }

    return bcrypt.compare(password, hash);
  }

  function createAuthToken (user) {
   return jwt.sign({ userId: user.id, userRole: user.role }, 'SECRET');
 };


 function decodeToken (authHeader) {
     if (!authHeader) {
       return false;
     }
     //bearer token required
     const parts = authHeader.split(' ');

     if (parts.length !== 2) {
       return false;
     }

     return jwt.verify(parts[1], 'SECRET');
   }



 User.validar = function (req, data, callback) {

   const payload = decodeToken(req.headers.authorization);

   if (!payload) {
     return callback(new Error('Authentication is required'));
   }

   if( !payload.userRole === 'Diretor'){
     return callback(new Error('Precisa de ser diretor para efetuar esta operação'));
   }



   User.findById(data.userId)
     .then(user => {
         const  mailOptions = {
            from: 'atletismo.scbraga.bot@gmail.com', // sender address
            to: user.email, // list of receivers
            subject: 'Validação do Registo na Plataforma', // Subject line
            html: '<h1>Atletismo Braga</h1><p><strong>Já pode aceder à sua conta com o email.</strong></p>'// plain text body
          };
          mail.sendEmail(mailOptions);

          return user.updateAttributes({ validado: true })})
     .then(user => callback(null, user))
     .catch(error => callback(error))
   ;
 };

 User.remoteMethod(
   'validar',
   {
     accepts: [
       { arg: 'req', type: 'object', http: { source: 'req' } },
       { arg: 'data', type: 'any', required: true, http: { source: 'body' } },
     ],
     returns: { arg: 'accessToken', type: 'object', root: true },
     http: {verb: 'put'},
   }
 );




  User.signupTreinador = function (credentials, callback) {
    if (!credentials.email || !credentials.password) {
      return callback(new Error('Credentials are invalid'));
    }

    User
      .create({ email: credentials.email, password: hashPassword(credentials.password), role:'Treinador', validado: false, nome: credentials.nome })
      .then(user => {
        User.app.models.Treinador.create(
          {
            nif: credentials.nif,
            morada: credentials.morada,
            localidade: credentials.localidade,
            ipdj: credentials.ipdj,
            genero: credentials.genero,
            nacionalidade: credentials.nacionalidade,
            codPostal: credentials.codPostal,
            socio: credentials.socio,
            telemovel: credentials.telemovel,
            cartaoCidadao: credentials.cartaoCidadao,
            exameMedico: credentials.exameMedico,
            userId: user.id
          }
        )
        return callback(null, createAuthToken(user));
      })
      .catch(error => callback(error))
    ;
  };

  User.remoteMethod(
    'signupTreinador',
    {
      accepts: {arg: 'credentials', type: 'object', required: true, http:{source:'body'}},
      returns: {arg: 'accessToken', type: 'object', root: true},
      http: {verb: 'post'},
    }
  );


  User.signupAtleta = function (credentials, callback) {
    if (!credentials.email || !credentials.password) {
      return callback(new Error('Credentials are invalid'));
    }

    User
      .create({ email: credentials.email, password: hashPassword(credentials.password), role:'Atleta', validado: false, nome: credentials.nome })
      .then(user => {
        User.app.models.Atleta.create({
          ativo: true,
          nome_competicao: credentials.nome_competicao,
          telemovel: credentials.telemovel,
          nrdocumento: credentials.nrdocumento,
          tipoDocumento: credentials.tipoDocumento,
          morada: credentials.morada,
          genero: credentials.genero,
          nif: credentials.nif,
          nacionalidade: credentials.nacionalidade,
          codigoPostal: credentials.codigoPostal,
          localidade: credentials.localidade,
          dataNascimento: credentials.dataNascimento,
          nrSocio: credentials.nrSocio,
          escalao: credentials.escalao,
          exameFalta: false,
          cartaoCidadao: credentials.cartaoCidadao,
          exameMedico: credentials.exameMedico,
          fotoPerfil: credentials.fotoPerfil,
          userId: user.id
        });
        return callback(null, createAuthToken(user))
        }
      )
      .catch(error => callback(error))
    ;
  };

  User.remoteMethod(
    'signupAtleta',
    {
      accepts: {arg: 'credentials', type: 'object', required: true, http:{source:'body'}},
      returns: {arg: 'accessToken', type: 'object', root: true},
      http: {verb: 'post'},
    }
  );


  User.signupDiretor = function (credentials, callback) {
    if (!credentials.email || !credentials.password) {
      return callback(new Error('Credentials are invalid'));
    }

    User
      .create({ email: credentials.email, password: hashPassword(credentials.password), role:'Diretor', validado: true, nome: credentials.nome })
      .then(user => {
        return callback(null, createAuthToken(user))
        }
      )
      .catch(error => callback(error))
    ;
  };

  User.remoteMethod(
    'signupDiretor',
    {
      accepts: {arg: 'credentials', type: 'object', required: true, http:{source:'body'}},
      returns: {arg: 'accessToken', type: 'object', root: true},
      http: {verb: 'post'},
    }
  );


  User.login = function (credentials, callback) {
    if (!credentials.email || !credentials.password) {
      return callback(new Error('Credentials are invalid'));
    }

    User.findOne({ where: { email: credentials.email } })
    .then(user => {
      if (!user) {
        throw new Error('Credentials are invalid');
      }
      if(!user.validado){
        throw new Error('Aguarda confirmação de registo!');
      }

      return comparePassword(user.password, credentials.password)
      .then(isValid => {
        if (!isValid) {
          throw new Error('Credentials are invalid');
        }

        return createAuthToken(user);
      })
      ;
    })
    .then(user => callback(null, user))
    .catch(error => callback(error))
  };

  User.remoteMethod(
    'login',
    {
      accepts: { arg: 'credentials', type: 'object', required: true, http: { source: 'body' } },
      returns: { arg: 'accessToken', type: 'object', root: true },
      http: {verb: 'post'},
    }
  );


};
