import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import ModalUserInfo from '../../../../../components/ModalUserInfo';

const data = [{nome: 'Júlio Antunes da Costa', uid: 'uid'},{nome: 'Ana Costa da Silva Marques', uid: 'uid'}]

class Lesionados extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalUserInfo: false,
      uid: undefined,
    }
    this.toggle = this.toggle.bind(this);
  }


  toggle(){
    this.setState({
      modalUserInfo: !this.state.modalUserInfo,
    })
  }



  initModalUser(userID){
    this.setState({
      modalUserInfo: true,
      uid: userID,
    })
  }



  render() {
    return (
      <div>
        {data.length>0?
          <ListGroup style={{cursor: 'pointer'}}>
            {data.map((obj,elem) =>
              <ListGroupItem key={elem} onClick={()=>this.initModalUser(obj.uid)} action>
                {obj.nome}
              </ListGroupItem>)}
          </ListGroup>
          :
          <Alert color="success">
            Não há atletas lesionados
          </Alert>
        }

        <ModalUserInfo toggle={this.toggle} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} />
      </div>
    );
  }

}

export default Lesionados;
