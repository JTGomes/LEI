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
      type: 0, //0-segundos, 1-metros, 2-pontos, 3-minutos, 4-horas
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    //console.log("This is the user data!: "+this.props.userData);
    const res = this.determineRes(this.state.resultado);
    let config = {
      headers: {'Authorization' : 'Bearer ' + this.props.token},
    }
    if(this.props.role==='Diretor') {
      const pars = {
        nome: this.state.nome,
        disciplina: this.state.disciplina.label,
        data: this.state.data,
        local: this.state.local,
        resultado: res,
        classificacao: this.state.classificacao+'º',
        id: this.props.data.original.id,
        atleta: this.props.data.original.atleta,
        user: this.props.userData,
      }
      //chama atualização da tabela (dinamismo)
      this.props.update(pars, this.props.data.index);

      axios.put(`http://localhost:3000/api/resultados`, pars, config)
        .then(response => {
          //console.log("success");
          })
        .catch(error => console.log(error))
    }
    else {
      const pars = {
        nome: this.state.nome,
        disciplina: this.state.disciplina.label,
        data: this.state.data,
        local: this.state.local,
        resultado: res,
        classificacao: this.state.classificacao+'º',
        userId: this.props.user
      }
      //chama atualização da tabela (dinamismo)
      this.props.addEntryTable(pars);

      //console.log(this.props.user);
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
  }

  determineClassific(c) {
    if(c==='100m') return {value: '1', label: '100m'};//segundos ▼
    else if(c==='100m') return {value: '2', label: '200m'};
    else if(c==='400m') return {value: '3', label: '400m'};
    else if(c==='800m') return {value: '4', label: '800m'}; //minutos ▼
    else if(c==='1500m') return {value: '5', label: '1500m'};
    else if(c==='5000m') return {value: '6', label: '5000m'};
    else if(c==='1000m') return {value: '7', label: '1000m'};
    else if(c==='110m Barreiras') return {value: '8', label: '110m Barreiras'};//segundos ▼
    else if(c==='400m Barreiras') return {value: '9', label: '400m Barreiras'};
    else if(c==='3000m Obstáculos') return {value: '10', label: '3000m Obstáculos'};// minutos
    else if(c==='4x100m') return {value: '11', label: '4x100m'}; //segundos
    else if(c==='4x400m') return {value: '12', label: '4x400m'}; //minutos
    else if(c==='Maratona') return {value: '13', label: 'Maratona'}; //horas ▼
    else if(c==='20Km Marcha') return {value: '14', label: '20Km Marcha'};
    else if(c==='50Km Marcha') return {value: '15', label: '50Km Marcha'};
    else if(c==='Salto em Comprimento') return {value: '16', label: 'Salto em Comprimento'}; //metros
    else if(c==='Triplo Salto') return {value: '17', label: 'Triplo Salto'};
    else if(c==='Salto em Altura') return {value: '18', label: 'Salto em Altura'};
    else if(c==='Salto à Vara') return {value: '19', label: 'Salto à Vara'};
    else if(c==='Lançamento do Peso') return {value: '20', label: 'Lançamento do Peso'};
    else if(c==='Lançamento do Disco') return {value: '21', label: 'Lançamento do Disco'};
    else if(c==='Lançamento do Dardo') return {value: '22', label: 'Lançamento do Dardo'};
    else if(c==='Lançamento do Martelo') return {value: '23', label: 'Lançamento do Martelo'};
    else if(c==='Decatlo') return {value: '24', label: 'Decatlo'}; //pontos
    /*Disciplinas femininas*/
    else if(c==='100m Barreiras') return {value: '25', label: '100m Barreiras'}; //segundos
    else if(c==='Heptatlo') return {value: '26', label: 'Heptatlo'}; //pontos
  }

  determineRes(r) {
    if(this.state.type===0)
      return r+' segundos';
    else if(this.state.type===1)
      return r+' metros';
    else if(this.state.type===2)
      return r+' pontos';
    else if(this.state.type===3)
      return r+' minutos';
    else
      return r+' horas';
  }

  handleChangeDisciplina = (disciplina) => {
    this.setState({disciplina});
    if(!disciplina) return;
    const v = disciplina.value;
    if(v>15 && v<24) //metros
      this.setState({
        type: 1,
      });
    else if(v==='24' || v==='26') //pontos
      this.setState({
        type: 2,
      });
    else if(v>3 && v<8 || v==='10' || v==='12') //minutos
      this.setState({
        type: 3,
      });
    else if(v>12 && v<16) //horas
      this.setState({
        type: 4,
      });
    else //segundos
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
    else if (this.state.type===2) {
      return <Label for="resultado">Marca (Pontos)</Label>
    }
    else if (this.state.type===3) {
      return <Label for="resultado">Marca (Minutos)</Label>
    }
    else {
      return <Label for="resultado">Marca (Horas)</Label>
    }
  }

  renderHeader() {
    if(this.props.role==='Diretor') {
      return <ModalHeader toggle={this.props.toggle}>{'Editar Resultado'}</ModalHeader>
    }
    else
      return <ModalHeader toggle={this.props.toggle}>{'Adicionar Resultado'}</ModalHeader>
  }

  componentWillMount() {
    //console.log(this.props.data);
    if(this.props.role==='Diretor') {
      const row = this.props.data.original;
      //console.log(row);
      const classif = row.classificacao.slice(0, -1)
      const discip = this.determineClassific(row.disciplina);
      var str = "10h";
      //remover o indicar de unidade dos resultados
      const res = row.resultado.split(" ")[0];
      this.setState({
        nome: row.nome,
        disciplina: discip,
        data: row.data,
        local: row.local,
        resultado: res,
        classificacao: classif,
      });
      this.handleChangeDisciplina(discip);
    }
    else {
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
  }

  render() {
    return(
      <Modal isOpen={this.props.modalAddResults} toggle={this.props.toggle}>
        {this.renderHeader()}
        <Form onSubmit={this.onSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="competicao">Competição</Label>
              <Input value={this.state.nome} onChange={event => this.setState({
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
              <Input value={this.state.local} onChange={event => this.setState({
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