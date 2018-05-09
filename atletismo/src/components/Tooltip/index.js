import React, { Component }  from 'react';
import { Tooltip } from 'reactstrap';





class TooltipItem extends Component{
  constructor(props){
    super(props);
    this.state={
      tooltipOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    if(this.props.toggle){
      this.setState({
        tooltipOpen: !this.state.tooltipOpen
      });
    }

  }


  render(){

    return(
      <Tooltip delay={{show:0,hide:0}} placement={this.props.placement} isOpen={this.state.tooltipOpen && this.props.toggle } target={this.props.target} toggle={this.toggle}>
      {this.props.text}
      </Tooltip>
    );
  }
}

export default TooltipItem;
