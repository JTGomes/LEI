import React from 'react';
//import { Link, WrappedLink } from 'react-router-dom'
import './css/documentos.css'

class Documentos extends React.Component {

  constructor(props){
    super(props);
    if(props.data){
        this.state = {
            foto: 'none',
            cc: 'none',
            am: 'none',
            socio: props.data.socio,
            nsocio: props.data.nsocio,
        }
    }else this.state = {
        foto: 'none',
        cc: 'none',
        am: 'none',
        socio: '',
        nsocio: '',
    }
  }


  onChange=(e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit = (e) => {
        const response = this.props.mutate({
            variables: this.state,
        });
        console.log(response);
    };

    onFileChange(event){
        const target = event.target;
        const files  = target.files;
        console.log(files);
        const formData = Object.assign(this.state.fileData,new FormData());
        console.log(formData);
        if (files.length > 0){
            // One or more files selected, process the file upload
            // loop through all the selected files
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                // add the files to formData object for the data payload
                formData.set(target.name, file, file.name);
            }
        }
        this.setState({
            fileData: formData
        });
        console.log(formData);
        fetch('http://localhost:4500/api/ativos/uploads/',{
            method: 'POST',
            body: formData
        }).then( answer => console.log(answer));
    };

  render () {
    return (
      <div className="imagem">

    <div id="formulario">
      <h1>Documentos</h1>
      <h3>Forneça os documentos pedidos</h3><br/><br/>
    <form>
      Foto<br/>
      <label id="label">
        <input
          name="foto"
          type="file"
          onChange={e => this.onChange(e)}
        /><br/>
      </label><br/>
      Cartão do Cidadão<br/>
      <label id="label">
        <input
          name="cc"
          type="file"
          onChange={e => this.onChange(e)}
        /><br/>
      </label><br/>
      Atestado Médico<br/>
      <label id="label">
        <input
          name="am"
          type="file"
          onChange={e => this.onChange(e)}
        /><br/>
      </label><br/>
      Sócio do SC Braga<br/>
        <input
          name="socio"
          type="radio"
          onChange={e => this.onChange(e)}
          value={"sim"}
        />Sim&nbsp;
        <input
          name="socio"
          type="radio"
          onChange={e => this.onChange(e)}
          value={"nao"}
        />Não<br/><br/>
      Número de Sócio<br/>
        <input
          name="nsocio"
          type="text"
          placeholder="Número"
          onChange={e => {if(this.state.socio === 'sim') this.onChange(e);}}
          value={this.state.nsocio}
          style={{minWidth: '200px'}}
        /><br/><br/>
    </form>

    <form>
      <button id="anterior" formAction="file:contactos.html" onClick={(e) => this.props.onPrev(3,this.state)}>
        Anterior
      </button>
      <button id="seguinte" formAction="file:conclusao.html" onClick={(e) => this.props.onNext(3,this.state)}>
        Registar
      </button>
    </form>

    </div>
    </div>
    );
  }
}

export default Documentos;
