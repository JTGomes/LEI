import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Select from 'react-select';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormGroup, Label, Input, Button, Col } from 'reactstrap';

class ModalAddResults extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nome: "",
      disciplina: "",
      data: "",
      local: "",
      resultado: "",
      classificacao: "1",
      user: props.userId,
      type: 0, //0-segundos, 1-metros, 2-pontos
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    //chama atualização da tabela
    const data={
      nome: this.state.nome,
      disciplina: this.state.disciplina.label,
      data: this.state.data,
      local: this.state.local,
      resultado: this.state.resultado,
      classificacao: this.state.classificacao+'º',
      atleta: this.props.user,
      id: 123,
    };
    this.props.addEntryTable(data);

    let config = {
      headers: {'Authorization' : 'Bearer ' + this.props.token},
    }

    const pars = {
      nome: this.state.nome,
      disciplina: this.state.disciplina.label,
      data: this.state.data,
      local: this.state.local,
      resultado: this.state.resultado,
      classificacao: this.state.classificacao+'º',
      userId: this.props.user
    }
    console.log(this.props.user);
    axios.post(`http://localhost:3000/api/resultados/adicionarResultados`, pars, config)
      .then(response => {
        //this.props.toggle();
        })
      .catch(error => console.log(error))
    this.setState({
      nome:"",
      disciplina:"",
      local: "",
      resultado: "",
      classificacao: "1",
      type: 0,
    })
  }

  handleChangeDisciplina = (disciplina) => {
    this.setState({disciplina});
    if(!disciplina) return;
    if(disciplina.value>15 && disciplina.value<24)
      this.setState({
        type: 1,
      });
    else if(disciplina.value==='24' || disciplina.value==='26')
      this.setState({
        type: 2,
      });
    else
      this.setState({
        type: 0,
      });
  }

  onChangeClassific = (e) => {
    if(e.target.value>0)
      this.setState({
        'classificacao': e.target.value
      })
  }

  onChangeRes = (e) => {
    //se nao for numero nao insere
    if(!isNaN(e.target.value))
      this.setState({
        resultado: e.target.value,
      })
  }

  componentWillMount() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var day = today.getDate();

    if (day.toString().length == 1)
      day = "0"+day;
    if (month.toString().length == 1)
      month = "0"+month;

    const date = year+'-'+month+'-'+day;
    //console.log(date);

    this.setState({
      data: date,
    });
  }

  renderSubmitButton() {
    if(!this.state.nome || !this.state.disciplina || !this.state.local || !this.state.resultado) {
      var st = {
        color: 'red',
        fontSize: 10
      }
      return(<div>
                <a style={st}>*Campos por preencher </a>
                <Button disabled color="success" type="submit">
                  <FaCheck />{' '}
                    Submeter
                </Button>
             </div>);
    }
    else
      return (<Button color="success" type="submit" onClick={this.props.toggle}>
                <FaCheck />{' '}
                  Submeter
              </Button>);
  }

  renderLabel() {
    if(this.state.type===0) {
      return <Label for="resultado">Marca (Segundos)</Label>
    }
    else if (this.state.type===1) {
      return <Label for="resultado">Marca (Metros)</Label>
    }
    else {
      return <Label for="resultado">Marca (Pontos)</Label>
    }
  }

  render() {
    return(
      <Modal isOpen={this.props.modalAddResults} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Adicionar Resultado'}</ModalHeader>
        <Form onSubmit={this.onSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="competicao">Competição</Label>
              <Input onChange={event => this.setState({
                  'nome': event.target.value
                })} />
              <FormText>Ex: Prova Europeia, Jogos Olímpicos, ...</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="disciplina">Disciplina</Label>
              <Select
                name="form-disciplina"
                value={this.state.disciplina}
                onChange={this.handleChangeDisciplina}
                placeholder="Selecione as Disciplinas..."
                options={[
                  {value: '1', label: '100m'},
                  {value: '2', label: '200m'},
                  {value: '3', label: '400m'},
                  {value: '4', label: '800m'},
                  {value: '5', label: '1500m'},
                  {value: '6', label: '5000m'},
                  {value: '7', label: '1000m'},
                  {value: '8', label: '110m Barreiras'},
                  {value: '9', label: '400m Barreiras'},
                  {value: '10', label: '3000m Obstáculos'},
                  {value: '11', label: '4x100m'},
                  {value: '12', label: '4x400m'},
                  {value: '13', label: 'Maratona'},
                  {value: '14', label: '20Km Marcha'},
                  {value: '15', label: '50Km Marcha'},
                  {value: '16', label: 'Salto em Comprimento'},
                  {value: '17', label: 'Triplo Salto'},
                  {value: '18', label: 'Salto em Altura'},
                  {value: '19', label: 'Salto à Vara'},
                  {value: '20', label: 'Lançamento do Peso'},
                  {value: '21', label: 'Lançamento do Disco'},
                  {value: '22', label: 'Lançamento do Dardo'},
                  {value: '23', label: 'Lançamento do Martelo'},
                  {value: '24', label: 'Decatlo'},
                  /*Disciplinas femininas*/
                  {value: '25', label: '100m Barreiras'},
                  {value: '26', label: 'Heptatlo'}
                ]} />
            </FormGroup>
            <FormGroup>
              <Label for="provadata">Data</Label>
              <Input type="date" id="provadata" value={this.state.data} onChange={event => this.setState({
                  'data': event.target.value
                })} />
            </FormGroup>
            <FormGroup>
              <Label for="local">Local</Label>
              <Input onChange={event => this.setState({
                  'local': event.target.value
                })} />
              <FormText>Ex: Braga, Porto, ...</FormText>
            </FormGroup>
            <FormGroup>
              {this.renderLabel()}
              <Input value={this.state.resultado} onChange={e => this.onChangeRes(e)}
              />
              <FormText>NOTA: Valores decimais são definidos com um ponto (Ex: 10.56, 11.2, ...)</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="classificacao">Classificação</Label>
              <Input type="number" value={this.state.classificacao} onChange={e => this.onChangeClassific(e)} />
              <FormText>Indica a classificação na tabela</FormText>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          {this.renderSubmitButton()}{' '}
        </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default ModalAddResults;