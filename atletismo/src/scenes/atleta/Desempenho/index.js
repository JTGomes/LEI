import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Line} from 'react-chartjs-2';
import Select from 'react-select';
import { Label } from 'reactstrap';
import './Performance.css';

class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userId,
      datas: [],
      rawData: [],
      chartData: {
        labels: [],
        datasets: []
      },
      discipOptions: [],
      currentDiscip: undefined,
      dateRange: [],
      sinceOptions: [],
      untilOptions: [],
      currentSince: undefined,
      currentUntil: undefined,
      placeOptions: [],
      currentPlace: {value: '1', label: '-Todos-'},
    }
    this.changeDiscip = this.changeDiscip.bind(this);
    this.changeSince = this.changeSince.bind(this);
    this.changeUntil = this.changeUntil.bind(this);
    this.changePlace = this.changePlace.bind(this);
  }

  determineClassific(c) {
    if(c==='100m') return {value: '1', label: '100m'};//segundos ▼
    else if(c==='100m') return {value: '2', label: '200m'};
    else if(c==='400m') return {value: '3', label: '400m'};
    else if(c==='800m') return {value: '4', label: '800m'}; //minutos ▼
    else if(c==='1500m') return {value: '5', label: '1500m'};
    else if(c==='5000m') return {value: '6', label: '5000m'};
    else if(c==='1000m') return {value: '7', label: '1000m'};
    else if(c==='110m Barreiras') return {value: '8', label: '110m Barreiras'};//segundos ▼
    else if(c==='400m Barreiras') return {value: '9', label: '400m Barreiras'};
    else if(c==='3000m Obstáculos') return {value: '10', label: '3000m Obstáculos'};// minutos
    else if(c==='4x100m') return {value: '11', label: '4x100m'}; //segundos
    else if(c==='4x400m') return {value: '12', label: '4x400m'}; //minutos
    else if(c==='Maratona') return {value: '13', label: 'Maratona'}; //horas ▼
    else if(c==='20Km Marcha') return {value: '14', label: '20Km Marcha'};
    else if(c==='50Km Marcha') return {value: '15', label: '50Km Marcha'};
    else if(c==='Salto em Comprimento') return {value: '16', label: 'Salto em Comprimento'}; //metros
    else if(c==='Triplo Salto') return {value: '17', label: 'Triplo Salto'};
    else if(c==='Salto em Altura') return {value: '18', label: 'Salto em Altura'};
    else if(c==='Salto à Vara') return {value: '19', label: 'Salto à Vara'};
    else if(c==='Lançamento do Peso') return {value: '20', label: 'Lançamento do Peso'};
    else if(c==='Lançamento do Disco') return {value: '21', label: 'Lançamento do Disco'};
    else if(c==='Lançamento do Dardo') return {value: '22', label: 'Lançamento do Dardo'};
    else if(c==='Lançamento do Martelo') return {value: '23', label: 'Lançamento do Martelo'};
    else if(c==='Decatlo') return {value: '24', label: 'Decatlo'}; //pontos
    /*Disciplinas femininas*/
    else if(c==='100m Barreiras') return {value: '25', label: '100m Barreiras'}; //segundos
    else if(c==='Heptatlo') return {value: '26', label: 'Heptatlo'}; //pontos
  }

  determineUnits(d) {
    const v = d.value;
    if(v>15 && v<24) //metros
      return "Metros";
    else if(v==='24' || v==='26') //pontos
      return "Pontos";
    else if(v>3 && v<8 || v==='10' || v==='12') //minutos
      return "Minutos";
    else if(v>12 && v<16) //horas
      return "Horas";
    else //segundos
      return "Segundos";
  }

  determineSince() {
    const dr = this.state.dateRange;
    const newSince = [];
    for(let i=0; i<dr.length; i++) {
      if(dr[i].label<=this.state.currentUntil.label)
        newSince.push(dr[i]);
    }
    this.setState({
      sinceOptions: newSince,
    });
  }

  determineUntil() {
    const dr = this.state.dateRange;
    const newUntil = [];
    for(let i=0; i<dr.length; i++) {
      if(dr[i].label>=this.state.currentSince.label)
        newUntil.push(dr[i]);
    }
    this.setState({
      untilOptions: newUntil,
    });
  }

  getAtletaId() {
    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }
    return axios.get(`http://localhost:3000/api/Atleta?filter[where][userId]=${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
          return response.data[0].id;
      })
      .catch(error => console.log(error))
  }

  getPerformance() {
    return this.getAtletaId().then(data => {
    return axios.get(`http://localhost:3000/api/Atleta/${data}/resultados`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
          var d = []
          for(let i=0; i<response.data.length; i++) {
            const temp = response.data[i];
            const elem = {
              atleta: temp.atleta,
              classificacao: temp.classificacao,
              data: temp.data,
              disciplina: temp.disciplina,
              id: temp.id,
              local: temp.local,
              nome: temp.nome,
              resultado: temp.resultado.split(" ")[0], //remover unidades dos resultados
          };
          d.push(elem);
        }
        console.log(d);
        this.setState({
          rawData: d,
        });
        return d;
      })
      .catch(error => console.log(error))
    });
  }

  getDiscipOptions(d) {
    for(let i = 0; i < d.length; i++) {
      const label = this.determineClassific(d[i].disciplina);
      var labelList = this.state.discipOptions;
      if(!this.state.currentDiscip)
        this.setState({
          currentDiscip: label,
        });
      if(labelList.filter(e => e.label===d[i].disciplina).length===0) {
        labelList.push(label);
        this.setState({
          discipOptions: labelList,
        });
      }
    }
  }

  getDateOptions(d) {
    var dates = [];
    var labelDates = [];
    if(this.state.currentPlace.label==='-Todos-') {
      for(let i=0; i<d.length; i++) {
        if(this.state.currentDiscip.label===d[i].disciplina) {
          const data = d[i].data;
          dates.push(data);
        }
      }
      dates.sort();
      for(let i=0; i<dates.length; i++) {
        const label = {value: i+1, label: dates[i]};
        labelDates.push(label);
      }
      //console.log(labelDates);
      this.setState({
        dateRange: labelDates,
        sinceOptions: labelDates,
        untilOptions: labelDates,
        currentSince: labelDates[0],
        currentUntil: labelDates[labelDates.length-1],
      });
    }
    else {
      for(let i=0; i<d.length; i++) {
        if(this.state.currentDiscip.label===d[i].disciplina &&
           this.state.currentPlace.label===d[i].local) {
          const data = d[i].data;
          dates.push(data);
        }
        dates.sort();
        for(let i=0; i<dates.length; i++) {
          const label = {value: i+1, label: dates[i]};
          labelDates.push(label);
        }
        this.setState({
          sinceOptions: labelDates,
          untilOptions: labelDates,
          currentSince: labelDates[0],
          currentUntil: labelDates[labelDates.length-1],
        });
      }
    }
  }

  getPlaceOptions(d) {
    var locais = [];
    var labelLocais = [];
    for(let i=0; i<d.length; i++) {
      if(d[i].disciplina===this.state.currentDiscip.label &&
         d[i].data>=this.state.currentSince.label &&
         d[i].data<=this.state.currentUntil.label) {
        const local = d[i].local;
        locais.push(local);
      }
    }
    labelLocais.push({value: '1', label: '-Todos-'});
    for(let i=0; i<locais.length; i++) {
      const label = {value: i+2, label: locais[i]};
      labelLocais.push(label);
    }
    this.setState({
      placeOptions: labelLocais,
      currentPlace: labelLocais[0],
    });
  }

  setCurrentDataset(d) {
    var sortedData = d;
    var unit = this.determineUnits(this.state.currentDiscip);
    var data = [];
    var datasets = [];
    var labels = [];
    sortedData.sort((a,b)=>{
      if (a.data < b.data)
        return -1;
      if (a.data > b.data)
        return 1;
      return 0;
    });
    //falta implementar verificaçao de local
    if(this.state.currentPlace.label==='-Todos-')
      for(let i=0; i<d.length; i++) {
        if(d[i].disciplina===this.state.currentDiscip.label &&
           d[i].data>=this.state.currentSince.label &&
           d[i].data<=this.state.currentUntil.label) {
          data.push(d[i].resultado);
          labels.push(d[i].data);
        }
      }
    else
      for(let i=0; i<d.length; i++) {
        if(d[i].disciplina===this.state.currentDiscip.label &&
           d[i].data>=this.state.currentSince.label &&
           d[i].data<=this.state.currentUntil.label &&
           d[i].local<=this.state.currentPlace.label) {
          data.push(d[i].resultado);
          labels.push(d[i].data);
        }
      }
    const blob = {
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderJoinStyle: "miter",
      data: data,
      label: unit,
    };
    datasets.push(blob);
    const chartData = {
      datasets: datasets,
      labels: labels,
    };
    this.setState({
      chartData: chartData,
    });
  }

  changeDiscip(v) {
    //console.log(v);
    this.setState({
      currentDiscip: v,
    }, async ()=>{ //async necessario senao dados nao aparecem atualizados na proxima funçao
      await this.getDateOptions(this.state.rawData);
      await this.getPlaceOptions(this.state.rawData);
      await this.setCurrentDataset(this.state.rawData);
    });
  }

  changeSince(v) {
    this.setState({
      currentSince: v,
    }, async ()=>{
      await this.determineUntil();
      await this.getPlaceOptions(this.state.rawData);
      await this.setCurrentDataset(this.state.rawData);
    });
  }

  changeUntil(v) {
    this.setState({
      currentUntil: v,
    }, async ()=>{
      await this.determineSince();
      await this.getPlaceOptions(this.state.rawData);
      await this.setCurrentDataset(this.state.rawData);
    });
  }

  changePlace(v) {
    this.setState({
      currentPlace: v,
    }, async ()=>{
      await this.getDateOptions(this.state.rawData);
      await this.setCurrentDataset(this.state.rawData);
    })
  }

  componentDidMount() {
    this.getPerformance().then(async (dados) => {
      //preencher opções de seleçao
      await this.getDiscipOptions(dados);
      await this.getDateOptions(dados);
      await this.getPlaceOptions(dados);
      //preencher dados da tabela
      await this.setCurrentDataset(dados);
      this.setState({
        rawData: dados,
      });
      console.log(this.state.chartData);
    });
  }

  //Line corresponde a um grafico de linhas. Outras opções, como um gráfico de barras estão disponíveis
  render() {
  return(
    <div className='chart container-fluid'>
      <Line
        data={this.state.chartData}
        options={{
          maintainAspectRatio: true,
          elements: {
            line: {
              tension: 0, // disables bezier curves
            }
          },
          title:{
            display: 'Tempos',
            text: 'Registo dos Resultados de Provas',
            fontSize:25
          }
        }}
        height="130"
      />
      <hr/>
      <div className="performance-filters">
        <div className="performance-item">
          <Label for="disciplina">Disciplina</Label>
          <Select
            name="form-disciplina"
            placeholder="Selecione as Disciplinas..."
            value={this.state.currentDiscip}
            options={this.state.discipOptions}
            onChange={this.changeDiscip} />
        </div>
        <div className="performance-item">
          <Label for="data">Datas</Label>
          <Select
            name="form-since"
            placeholder="Desde..."
            value={this.state.currentSince}
            options={this.state.sinceOptions}
            onChange={this.changeSince} />
          <Select
            name="form-until"
            placeholder="Até..."
            value={this.state.currentUntil}
            options={this.state.untilOptions}
            onChange={this.changeUntil} />
        </div>
        <div className="performance-item">
          <Label for="local">Local</Label>
          <Select
            name="form-place"
            placeholder="Selecione o Local"
            value={this.state.currentPlace}
            options={this.state.placeOptions}
            onChange={this.changePlace} />
        </div>
      </div>
    </div>
  );
}
}

function mapStateToProps(state){
  return {
    userId: state.user,
    token: state.token
  };
}


export default connect(mapStateToProps)(Performance);
