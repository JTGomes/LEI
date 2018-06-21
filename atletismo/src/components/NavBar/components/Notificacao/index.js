import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import BellIcon from 'react-icons/lib/fa/bell'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './style.css'


class Notificacao extends Component{

    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        popoverOpen: false,
        count: 0,
        notificacoes: [],
      };
    }

    toggle() {
      if(this.state.count > 0){
        const notRead = this.state.notificacoes.filter(notificacao => notificacao.isRead === false);

        notRead.map(notificacao => {
          let newValue = notificacao;
          newValue.isRead= true;
            axios.put(`http://localhost:3000/api/notificacaos/${notificacao.id}`,
              newValue
              ,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
         });
      }
      this.setState({
        popoverOpen: !this.state.popoverOpen,
        count: 0
      });
    }


  componentDidMount(){
  axios.get(`http://localhost:3000/api/Users/${this.props.userId}/notificacoes`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
        this.setState({
          notificacoes: response.data,
          count: response.data.filter(notificacao => notificacao.isRead === false).length
        })
      })
      .catch(error => console.log(error))
  }

remove(id){
  this.setState(prevState => ({
    notificacoes: prevState.notificacoes.filter(
                                        notificacao =>
                                        notificacao.id !== id
                                      )
                                }));
  axios.delete(`http://localhost:3000/api/notificacaos/${id}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
  .then(response =>
    console.log(response)
  ).catch(error => console.log(error))

}

  getNotificacoes(elem,id,title,data,mensagem){
    return(
    <Link to="" key={elem} className="list-group-item list-group-item-action flex-column align-items-start todo-item">
      <div className="d-flex w-100 justify-content-between">
        <h6 className="mb-1">{title}</h6>
        <small>{data}</small>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <p className="mb-1"><small>{mensagem}</small></p>
        <span className="remove" onClick={() => this.remove(id)}>✖</span>
      </div>
    </Link>);
  }


  render(){

    return(
      <div onClick={this.toggle}>
        <div style={{height: '10px',
          width: '36px',
          display: 'inline-block',
          margin: '0 10px',
        }}>
        <NotificationBadge count={this.state.count} style={{background:'black'}}/>
        <BellIcon id="Pr"  style={{fontSize: '26px', margin:'0 0 5px 0'}}/>
      </div>

      <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Pr" toggle={this.toggle}>
        <PopoverHeader className="text-center"><strong>Notificações</strong></PopoverHeader>
        <PopoverBody  >
          <div className="list-group" id="style-13" style={{maxHeight:'300px', overflow: 'auto'}}>
            {this.state.notificacoes.map((notificacao, elem) =>
              this.getNotificacoes(elem,
                                  notificacao.id,
                                  notificacao.assunto,
                                  notificacao.data,
                                  notificacao.mensagem))}
          </div>
        </PopoverBody>
      </Popover>

    </div>


  );
}
}

function mapStateToProps(state){
  return {
    userId: state.user,
    token: state.token
  };
}


export default connect(mapStateToProps)(Notificacao);
