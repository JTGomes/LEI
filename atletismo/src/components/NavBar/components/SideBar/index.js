import React, { Component }  from 'react';
import { NavLink } from 'react-router-dom';
import HideIcon from 'react-icons/lib/fa/angle-left';
import ShowIcon from 'react-icons/lib/fa/angle-right';
import TooltipItem from '../../../Tooltip';



class SideBar extends Component{
  constructor(props){
    super(props);
    this.state={
      toggle: false,
    };
  }

  toggleSideBar(){
    this.setState({toggle:!this.state.toggle});
      document.body.classList.toggle('sidebar-minimized');
    }



    getLinkNav(elem,link,icon,text){

      return <li key={elem} className="nav-item" >
        <TooltipItem placement="right"  target={'tooltip'+elem} text={text}  toggle={this.state.toggle} />
        <NavLink to={link} id={'tooltip'+elem} activeClassName="active" className="nav-link" >
          {icon}
          <span className="nav-link-text">{text}</span>
        </NavLink>
      </li>
    }


    render(){

      return(
        <ul className={ (this.state.toggle? "mini " : "")+"navbar-nav navbar-sidenav" }>
          {this.props.sidebarLinks.map((obj,elem)=> this.getLinkNav(elem,obj.link,obj.icon,obj.text))}

          <li id="hide" className="nav-item text-center" onClick={()=>this.toggleSideBar()}>
            {this.state.toggle ?
              <ShowIcon className="arrow"/> :
                <HideIcon className="arrow"/> }
                </li>
              </ul>
            );
    }
  }

export default SideBar;
