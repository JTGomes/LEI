import React from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';



class TEnviarEmail extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      emails: [],
      conteudo: "",
      ficheiros: [],
      tamanho:0
    }
  }

  renderPersonalMailSelect(){
    return (
      <FormGroup>
        <Label for="exampleSelectMulti">Select Multiple</Label>
        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      )
  }
  renderMultipleFileInsert(){
    return (
      <div></div>
    );
  }

  render(){
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <Input type="text" name="emails" id="exampleEmail" placeholder="insert emails or select them" />
          </Col>
        </FormGroup>
        {this.renderPersonalMailSelect()}
        {this.renderMultipleFileInsert()}
        <FormGroup>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
        </FormGroup>
      </Form>
      )
  }
}

export default TEnviarEmail;