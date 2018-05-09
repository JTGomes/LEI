import React from 'react';
import {  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Card,  CardText, CardBody, CardSubtitle, Button ,CardColumns} from 'reactstrap';
import './css/arquivos.css'

class TAdicionarArquivos extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            filename: "",
            filepath:"",
            file:""
        }
    }

    handleChange(e){
        console.log(e.target);
        alert("Adicionado o ficheiro: " + e.target.files[0].name + " tamanho " + e.target.files[0].size +" bytes");
    }

    renderFileCards(){
        return this.props.files.map(
        (filedata) => { return(
            <Card>
                <img width="85px" height="85px"
                     title={filedata.name}
                     src={filedata.src}
                     alt={filedata.name} />
                <CardBody>
                    <CardSubtitle>{filedata.name}</CardSubtitle>
                    <CardText>Addicionado em : {filedata.added}</CardText>
                    <Button><a href={filedata.src} target="_blank"> Ver </a></Button>
                </CardBody>
            </Card>)
        }
        )
    }

    render(){


        return (
            <div className={'container-fluid'}>
                <Form method="POST" onSubmit={ (e) => this.handleChange(e)} className={"hello"}>
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input id="formControlsFile" type="file" name="Ficheiro" accept={".pdf"} onChange={(e) => this.handleChange(e)}/>
                        <FormText color="muted">
                            Seleciona um ficheiro a adicionar.
                        </FormText>
                        <Button>Confirmar (A não carregar no momento)</Button>
                    </FormGroup>
                </Form>
                <h5> Documentos presentes</h5>
                <CardColumns>
                    <Card>
                        <img width="85px" height="85px"
                                 title={"name.pdf"}
                                 src='https://www.linuxvoice.com/wp-content/uploads/2016/12/adobe-pdf-icon.png'
                                 alt="name.pdf" />
                        <CardBody>
                            <CardSubtitle>Card title</CardSubtitle>
                            <CardText>Addicionado em :</CardText>
                            <Button>Ver</Button>
                        </CardBody>
                    </Card>
                    <Card>
                        <img width="85px" height="85px"
                             title={"name.pdf"}
                             src='https://www.linuxvoice.com/wp-content/uploads/2016/12/adobe-pdf-icon.png'
                             alt="name.pdf" />
                        <CardBody>
                            <CardSubtitle>Card title</CardSubtitle>
                            <CardText>Addicionado em :</CardText>
                            <Button>Ver</Button>
                        </CardBody>
                    </Card>
                    <Card>
                        <img width="85px" height="85px"
                             title={"name.pdf"}
                             src='https://www.linuxvoice.com/wp-content/uploads/2016/12/adobe-pdf-icon.png'
                             alt="name.pdf" />
                        <CardBody>
                            <CardSubtitle>Card title</CardSubtitle>
                            <CardText>Addicionado em :</CardText>
                            <Button>Ver</Button>
                        </CardBody>
                    </Card>
                    <Card>
                        <img width="85px" height="85px"
                             title={"name.pdf"}
                             src='https://www.linuxvoice.com/wp-content/uploads/2016/12/adobe-pdf-icon.png'
                             alt="name.pdf" />
                        <CardBody>
                            <CardSubtitle>Card title</CardSubtitle>
                            <CardText>Addicionado em :</CardText>
                            <Button>Ver</Button>
                        </CardBody>
                    </Card>
                    <Card>
                        <img width="85px" height="85px"
                             title={"name.pdf"}
                             src='https://www.linuxvoice.com/wp-content/uploads/2016/12/adobe-pdf-icon.png'
                             alt="name.pdf" />
                        <CardBody>
                            <CardSubtitle>Card title</CardSubtitle>
                            <CardText>Addicionado em :</CardText>
                            <Button>Ver</Button>
                        </CardBody>
                    </Card>
                </CardColumns>
            </div>
        );
    }


}


export default TAdicionarArquivos