import React from 'react';
import './style.css';


class ErrorPage extends React.Component {


  render () {
    return (

      <div className="errorPage">
      <div className="cont">
        <input type="checkbox" id="switch"/>
        <div className="ellipse"></div>
        <div className="ray"></div>
        <div className="head"></div>
        <div className="neck"></div>
        <div className="body">
          <label htmlFor="switch"></label>
        </div>
      </div>
      <div className="cont">
        <div className="msg msg_1">404</div>
        <div className="msg msg_2">Page Not Found</div>
      </div>
      <div  style={{background:'black',height:'100vh', width:'100%'}}></div>
      </div>
    );
  }
}

export default ErrorPage;
