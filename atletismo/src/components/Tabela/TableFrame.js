import React from 'react';
import 'react-table/react-table.css'
import Table from "./TableReact.js";

class TableFrame extends React.Component {
    /** Necessary props
     *  1. data prop with the pure data that will be passed to the table.
     *  2. Columns props for the table
     *  3. elements prop which is an array with the elements  that should be created.
     *      An element is a composed of
     *          1. A div element
     *          2. A h5 element
     *          3. A select element with n options.
     *      It's data structure should be:
     *          {
     *              name: Name placed in the h5 element
     *              id: id used in the select element
     *              classnames: which is an array where classnames[0] will be used as the class of the div element
     *                          and classnames[1] as the class of the select element
     *              contenue: the list of the options that need to be showed, all the options can be selected,
     *                        the first seen value when opening the page is the first element of this component
     *              filter: which is a function that receive 2 elements, where the first is the an element of the data passed, and the second the
     *                      select option of this select element. The filter function should take into account the value "" as it is the iniciaiazed
     *                      value of all select elements, which means that the first call of this function will always have, as it's second value "".
     *        }
     *       All of it's component is necessary
     * @param props
     */
    constructor(props){
        super(props);
        this.state = {
            keys: this.createKeyArray(this.props.elements.length)
        }
    }

    createKeyArray(number){
        let keys = Array(number);
        for(let i = 0; i < number; i++)
            keys[i] = "";// to change...
        return keys;
    }

    filter(data) {
        let d = data;
        let i = 0;
         this.props.elements.forEach((html_element) =>{
            d = d.filter((data) => html_element.filter(data, this.state.keys[i]));
            i++;
        })
        return d;
    }

    renderOptions(elementindex){
        if(this.props.elements.length > elementindex && elementindex >= 0 && this.props.elements[elementindex])
    return ( this.props.elements[elementindex].contenue.map( (element) =>
                        (<option value={element} key={""+elementindex +""+element}>{element}</option> ))
    );

    }


    createElements(){
        let i = 0;
        return this.props.elements.map( (element) => this.createElement(element,i++));
    }
    createElement(element,i){
        return (<div className={element.classnames[0]} key={i}>
            <h5> {element.name}</h5>
            <select className={element.classnames[1]} id={element.id} name={element.name}
                    defaultValue={"" + element.contenue[0]}
                    onChange={
                        (v) => {
                            console.log(v);
                            const doc = document.getElementById(element.id);
                            let keys = [...this.state.keys]; // Só quero atualizar um elemento...
                            keys[i] = doc.options[doc.selectedIndex].value;
                            console.log("Changed.");
                            this.setState({
                                keys: keys
                            });
                            console.log(this.state.keys);
                        }
                    }>
                {this.renderOptions(i)}
            </select>
        </div>);
    }


    render(){
        return (
            <div>
                <div className="table-top">
                    {   this.createElements() }
                </div>
                <Table data={this.filter(this.props.data)} columns={this.props.columns}/>
            </div>
        );
    }
}

export default TableFrame


/*
this.state = {

            data: [ 1,2,1,2,3,1,2,3],
            elements:[ {
                name: "hello",
                contenue: [1, 2, 3],
                classnames: ["hello", "printable"],
                filter: (a,b) => a === b // b é o elemento selecionado
            },{
                name: "hello",
                contenue: [1, 2, 3],
                classnames: ["hello", "printable"],
                filter: (a,b) => a === b // b é o elemento selecionado
            }],
            keys: this.createKeyArray(/*this.state.elements.length2)
}*/