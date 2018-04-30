import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'


class TableReact extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <ReactTable
                    data={this.props.data}
                    columns ={this.props.columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default TableReact