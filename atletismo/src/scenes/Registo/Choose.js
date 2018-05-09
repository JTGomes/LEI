import React from 'react';
import { Link, WrappedLink } from 'react-router-dom'
//import './css/choose.css'

class Choose extends React.Component {
  render () {
    return (
      <div>
  <section className="intro">
    <row>
      <div className="col-lg-6 col-sm-12 left">
      <Link to='/InfoPessT'>
        <p>
          TREINADORES
        </p>
        </Link>
      </div>
      <div className="col-lg-6 col-sm-12 right">
      <Link to='/InfoPess'>
        <p>
          ATLETAS
        </p>
        </Link>
      </div>
    </row>
  </section>
      </div>
    );
  }
}

export default Choose;
