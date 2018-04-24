import React from 'react';
import '../css/About.css';

function About(props) {
  return(
    <div className="aboutathlete">
      <table className="abouttable">
      <thead>
        <tr>
          <th>Dados Pessoais</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nome Completo:</td>
          <td>{props.name}</td>
        </tr>
        <tr>
          <td>Género:</td>
          <td>{props.gender}</td>
        </tr>
        <tr>
          <td>NIF:</td>
          <td>{props.nif}</td>
        </tr>
        <tr>
          <td>Nacionalidade:</td>
          <td>{props.nacionalidade}</td>
        </tr>
        <tr>
          <td>Tipo de Documento:</td>
          <td>{props.identificacao}</td>
        </tr>
        <tr>
          <td>Nº de Documento:</td>
          <td>{props.documentId}</td>
        </tr>
        <tr>
          <td>Morada:</td>
          <td>{props.morada}</td>
        </tr>
        <tr>
          <td>Código Postal:</td>
          <td>{props.postal}</td>
        </tr>
        <tr>
          <td>Localidade:</td>
          <td>{props.localidade}</td>
        </tr>
        <tr>
          <td>Sócio:</td>
          <td>{props.isSocio}</td>
        </tr>
        <tr>
          <td>Nº cartão de sócio:</td>
          <td>{props.socioNum}</td>
        </tr>
        <tr>
          <td>Treinador(es):</td>
          <td>{props.treinadores}</td>
        </tr>
        </tbody>
        </table>
        <table>
        <thead>
          <tr>
            <th>Dados de Filiação</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>Tipo de Filiação:</td>
          <td>{props.filiacao}</td>
        </tr>
        <tr>
          <td>Contrato até:</td>
          <td>{props.contractDate}</td>
        </tr>
        <tr>
          <td>Escalão:</td>
          <td>{props.escalao}</td>
        </tr>
        <tr>
          <td>Subsídio:</td>
          <td>{props.subs}</td>
        </tr>
        <tr>
          <td>Equipamento disponível:</td>
          <td>{props.equip}</td>
        </tr>
        </tbody>
        </table>
        <table>
        <thead>
          <tr>
            <th>Documentos</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>Cartão de Cidadão</td>
          <td>{props.id}</td>
        </tr>
        <tr>
          <td>Exames Médicos</td>
          <td>{props.medical}</td>
        </tr>
        <tr>
          <td>Imprimir</td>
        </tr>
      </tbody>
      </table>
    </div>
  );
}

export default About;