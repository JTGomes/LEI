import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import SendTrainingPlan from '../../components/SendNotificationAll/SendNotification'
import SendNotification from '../../components/SendNotification/index'
import { Button } from 'reactstrap';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import './css/TPlayersFrame.css';

const CheckboxTable = checkboxHOC(ReactTable);

class TPlayersFrame extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      meusAtletas: [
        {
          _id:1,
          name: "João Nuno Gomes Rogrigues de Almeida",
          page: "Atleta/sASD2"
        },
        {
          _id:2,
          name: "João Tiago Rocha Gomes",
          page: "Atleta/JTAW23"
        },
        {
          _id:3,
          name: "Usain Bolt",
          page: "Atleta/USAWFB7"
        }
      ],
      aConfirmar: [{
        id: 235,
        nome: "Patricia Mbengani Bravo Mamona"
      }],
      selection: [],
      selectAll: false,
      modalTP:false,
      modalN: false
    }

    this.toggleAll = this.toggleAll.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.getTrProps = this.getTrProps.bind(this);
    this.toggleTP = this.toggleTP.bind(this);
    this.toggleN = this.toggleN.bind(this);
  }

  createColumns(){
    return [
      {
        Header:"Nome Atleta",
        accessor: 'name'
      }
    ]
  }

  toggleSelection(key, shift, row){
    //console.log(row);
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  }

  toggleAll(){
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original._id);
      });
    }
    this.setState({ selectAll, selection });
  }

  isSelected(key){
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  }

  toggleTP(){
    if(this.state.selection)
    this.setState({
      modalTP: !this.state.modalTP
    })
  }

  toggleN(){
    if(this.state.selection)
    this.setState({
      modalN: !this.state.modalN
    })
  }

  getTrProps(s, r) {
    // someone asked for an example of a background color change
    // here it is...
    //console.log(s);
    //console.log(r);
    if( r ){
    const selected = this.isSelected(r.original._id);
    return {
      style: {
        backgroundColor: selected ? "lightgreen" : "inherit"
        // color: selected ? 'white' : 'inherit',
      }
    }}
    else return { style: {}};
  }

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      getTrProps: this.getTrProps
    };

    return (
      <div className={'coach-players container-fluid'}>
        <div>
          <h2>Meus Atletas</h2>
          <CheckboxTable
            ref={r => (this.checkboxTable = r)}
            data={ this.state.meusAtletas}
            columns={this.createColumns()}
            defaultPageSize={5}
            className="-striped -highlight"
            { ...checkboxProps}
           />
        </div>
        <div className={'coach-players-buttons'}>
          <div className={'coach-players-button-left'}><Button onClick={() => this.toggleN()} >Enviar Notificação</Button></div>
          <div className={'coach-players-button-right'}><Button onClick={() => this.state.meusAtletas.map((d) =>this.toggleTP())} >Enviar Plano de Treino</Button></div>
        </div>
        <SendTrainingPlan isOpen={this.state.modalTP} toggle={this.toggleTP} to={this.state.meusAtletas.filter( (atleta) => this.state.selection.indexOf(atleta._id) !== -1).map(a => a.name)} />
        <SendNotification isOpen={this.state.modalN} toggle={this.toggleN} user={'1'} />
        <div>
          <h1>Confirmação pendente</h1>
          <ul id="listAconfirmar">
            {this.state.aConfirmar.map(
              atleta => (
                <div className="list-confirmacao-element">
                  <li className="celement"> {atleta.nome}</li>
                </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TPlayersFrame;