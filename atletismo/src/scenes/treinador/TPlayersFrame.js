import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import SendNotificationModal from '../../components/SendNotificationAll/SendNotification.js'
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
      modalState:false
    }

    this.toggleAll = this.toggleAll.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.getTrProps = this.getTrProps.bind(this);
    this.toggle = this.toggle.bind(this);
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
    console.log(row);
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
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?

      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).

      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).

      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'.
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
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

  toggle(){
    this.setState({
      modalState: !this.state.modalState
    })
  }

  getTrProps(s, r) {
    // someone asked for an example of a background color change
    // here it is...
    console.log(s);
    console.log(r);
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
          <h2> Meus Atletas </h2>
          <CheckboxTable
            ref={r => (this.checkboxTable = r)}
            data={ this.state.meusAtletas}
            columns={this.createColumns()}
            defaultPageSize={10}
            className="-striped -highlight"
            { ...checkboxProps}
           />
        </div>
        <div className={'coach-players-buttons'}>
        <Button onClick={() => console.log(this.state.meusAtletas.map((d) =>this.state.selection.indexOf(d._id)) )} > Envia email </Button>
        <Button onClick={() => console.log(this.state.meusAtletas.map((d) =>this.toggle()) )} > Envia notificação </Button>
        </div>
        <SendNotificationModal isOpen={this.state.modalState} toggle={this.toggle} to={this.state.meusAtletas.filter( (atleta) => this.state.selection.indexOf(atleta._id) !== -1).map(a => a.name)} />
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

export default TPlayersFrame