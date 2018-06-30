import React from 'react';
//import { Link, WrappedLink } from 'react-router-dom'
import './css/documentos.css'

class Documentos extends React.Component {

  constructor(props){
    super(props);
    if(props.data){
        this.state = {
            foto: props.data.foto,
            cc: props.data.cc,
            am: props.data.am,
            socio: props.data.socio,
            nsocio: props.data.nsocio,
            fileData: props.fileData ? props.fileData : new FormData()
        }
    }else this.state = {
        foto: "none",
        cc: "none",
        am: "none",
        socio: 'nao',
        nsocio: '',
        fileData: new FormData()
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
    };

    onFileChange(event){
        const target = event.target;
        const files  = target.files;
        const formData = Object.assign(this.state.fileData,new FormData());
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
            [event.target.name]: files.length > 0 ? files[0].name : 'none',
            fileData: formData
        });

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
          onChange={e => {this.onFileChange(e);}}
        /><br/>
      </label><br/>
      Cartão do Cidadão<br/>
      <label id="label">
        <input
          name="cc"
          type="file"
          onChange={e => {this.onFileChange(e);}}
        /><br/>
      </label><br/>
      Atestado Médico<br/>
      <label id="label">
        <input
          name="am"
          type="file"
          onChange={e => {this.onFileChange(e);}}
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
