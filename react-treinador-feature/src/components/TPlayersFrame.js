import React from 'react';


class TPlayersFrame extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      meusAtletas: [
          {
            name: "João Nuno Gomes Rogrigues de Almeida",
            page: "Atleta/sASD2"
          },
          {
            name: "João Tiago Rocha Gomes",
            page: "Atleta/JTAW23"
          },
          {
            name: "Usain Bolt",
            page: "Atleta/USAWFB7"
          }
      ],
      aConfirmar: [{
        id: 235,
        nome: "Patricia Mbengani Bravo Mamona"
      }]
    }
  }


  render() {
    return (
      <div>
      <div>
        <ul id="listaAtletas" >
            { this.state.meusAtletas.map(
                atleta =>( <div className="list-atleta-element">
                          <a href={atleta.page} >
                              <li className="element"> {atleta.name}</li>
                              <img className="page_image" href="" alt={""}></img>
                          </a>
                          </div>)
            )
            }
        </ul>
      </div>
          <div>
                <h1>Confirmação pendente</h1>
                <ul id="listAconfirmar">
                    {this.state.aConfirmar.map(
                        atleta => (
                            <div className="list-confirmacao-element">
                                <li className="celement"> {atleta.nome}</li>
                            </div>
                        ) ) }
                </ul>
          </div>

      </div>
    );
  }
}

export default TPlayersFrame