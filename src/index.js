import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import formatText from  './functions.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FontAwesome from 'react-icons/lib/fa'
import {
    Container,CardHeader,
    CardBlock,Row,Col,Card,
    CardTitle,CardText,CardImg,
    CardBody,CardSubtitle,Button,ButtonGroup,CardFooter,
    FormGroup,Label,Input,Navbar,NavbarBrand,Alert
}
from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import ReactLoading from 'react-loading';

const MySwal = withReactContent(Swal);

const LoadingBar = ({ type, color }) => (
    <Col sm="12" md={{ size: 12, offset: 5 }} xs={{ size: 6, offset: 4 }}>
        <ReactLoading type={"bars"} color={"#000"} height={150} width={100} />
    </Col>
    
);

//users for testing 
const testUsernames = ["test_user_1","test_user_2","test_user_3"];


class StupidPassApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            view: 1,
            show_alert:false,
            has_errors:false,
            errors:[],
        }
    }

    changeViewState(view){
        this.setState({
            view: 3
        });
        setTimeout(function() { 
            this.setState({view: view}); 
        }.bind(this), 1000);
    }

    getViewState(){
        return this.state.view;
    }

    verifyIdentity(username){
        var text = username;

        if(!testUsernames.includes(username)){
            let errors = this.state.errors;
            errors.push(`We don't recognize ${username}`);

            this.setState({
                has_errors: true,
                errors: errors
            });
        }
        else{
            this.setState({
                show_alert: true,
            });
    
            MySwal.fire({
                input: 'text',
                animation: false,
                title: <b>Verifying Identity</b>,
                text: "We sent a code to your phone. Please enter it now.",
                width: 600,
                padding: '3em',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                customClass: "alertStupid animated fadeInDown",
                confirmButtonText:
                'Verify Me!',
                inputValidator: (value) => {
                    return !value && 'You need to write something!'
                },
                backdrop: `
                    rgba(0,0,123,0.4)
                    center left
                    no-repeat
                `,
                preConfirm: (textcode) => {
                    if(textcode === "test")
                        return MySwal.fire({
                            title: <b>Identity Verified!</b>,
                            type: 'success',
                            animation: false,
                            customClass: 'animated fadeInUp',
                            text: "Your identity has been verified!",
                        });
                    else
                        return MySwal.fire(<p>Failed</p>);    
                }
              })
        }

        
    }

    render(){
        let viewToRender = '';
        switch(this.state.view){
            case 0:
                viewToRender = <GetPasswordInput 
                                    verifyIdentity={this.verifyIdentity.bind(this)}
                               />
                break;
            case 1:
                viewToRender = <HomeView 
                                    changeViewState={this.changeViewState.bind(this)}
                                />
                break;
            case 2:
                viewToRender = <AddPassword 
                                    verifyIdentity={this.verifyIdentity.bind(this)}
                                />
                break;

            case 3: 
                viewToRender = <LoadingBar/>
                break;    
        }

        return (
            <Container className="mainInput">
                {this.state.has_errors === true ? <StupidAlert alert_text={this.state.errors.join("<br>")}/> : ""}
                <Card className="animated fadeInDown">
                {this.state.view != 1 && <StupidPassNav changeViewState={this.changeViewState.bind(this)}/>}
                {this.state.view == 1 && <StupidPassHeader getViewState={this.getViewState.bind(this)}/>}
                    <CardBody>
                    <CardText>
                        {viewToRender}
                    </CardText>
                    </CardBody>
                    <CardFooter>
                        <small>Copyright 2018-2020 Pasley Hill LLC</small>
                    </CardFooter>
                </Card>
            
            </Container>
        )
    
    }
}

class StupidAlert extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        visible: true,
        alert_text: this.props.alert_text
      };
  
      this.onDismiss = this.onDismiss.bind(this);
    }
  
    onDismiss() {
      this.setState({ visible: false });
    }
  
    render() {
      return (
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            {this.state.alert_text}
        </Alert>
      );
    }
  }

class StupidPassNav extends React.Component {

    constructor(props){
        super(props);
    }

    handleAddClick(){
        this.props.changeViewState(2);
    }

    handleGetClick(){
        this.props.changeViewState(0);
    }

    handleHomeClick(){
        this.props.changeViewState(1);
    }

    render(){
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">StupidPass</NavbarBrand>
                <ButtonGroup>
                    <Button outline color="info" onClick={this.handleAddClick.bind(this)}>
                        <FontAwesome.FaPlus/> 
                    </Button>
                    <Button outline color="info"  onClick={this.handleGetClick.bind(this)}>
                        <FontAwesome.FaSearch/> 
                    </Button>
                    <Button outline color="info" onClick={this.handleHomeClick.bind(this)}>
                        <FontAwesome.FaHome/> 
                    </Button>
                    <Button outline color="info" onClick={this.handleHomeClick.bind(this)}>
                        <FontAwesome.FaPencilSquare/> 
                    </Button>
                </ButtonGroup>
            </Navbar>
        )
    }

}

class HomeView extends React.Component {
    constructor(props){
        super(props);
    }

    handleAddClick(){
        this.props.changeViewState(2);
    }

    handleGetClick(){
        this.props.changeViewState(0);
    }

    render(){
        return (
            <Row>
                <Col lg="4" md="4"  className="stupidTitle">
                    <Button outline large block color="info" onClick={this.handleAddClick.bind(this)}>
                        <h2><FontAwesome.FaPlus /> Add Pass</h2>
                    </Button>
                 </Col>
                <Col lg="4" md="4"  className="stupidTitle">
                    <Button outline large block color="info" onClick={this.handleGetClick.bind(this)}>
                        <h2><FontAwesome.FaSearch /> Get Pass</h2>
                    </Button>
                </Col>
                <Col lg="4" md="4"  className="stupidTitle">
                    <Button outline large block color="info" onClick={this.handleGetClick.bind(this)}>
                        <h2><FontAwesome.FaPencilSquare /> New Here</h2>
                    </Button>
                </Col>
            </Row>
            
        )
    }
}

class StupidPassHeader extends React.Component {
    render(){
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand>
                <h3 className="stupidTitle">StupidPass</h3>
                </NavbarBrand>
                
            </Navbar>
            
        )
    }
    
}

class AddPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            pass_label: '',
            the_pass: '',
            show_alert: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.verifyIdentity = this.props.verifyIdentity.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value  = target.value;
        const name   = target.name;
        this.setState({
            [name]: value,
        });
    }

    handleClick(event){
         this.verifyIdentity(this.state.username);
    }

    render() {
        return (
          <FormGroup className="fadeInDown">
              <Input 
                  name="username" 
                  id="username" 
                  placeholder="enter your username" 
                  value={this.state.username}
                  onChange={this.handleChange}
              />
              <Input 
                  name="pass_label" 
                  id="pass_label" 
                  placeholder="enter password label" 
                  value={this.state.pass_label}
                  onChange={this.handleChange}
              />
              <Input 
                  name="the_pass" 
                  id="the_pass" 
                  type="password"
                  placeholder="enter actual password" 
                  value={this.state.the_pass}
                  onChange={this.handleChange}
              />
              <Button outline color="info" block onClick={this.handleClick}>Store password</Button>
              
          </FormGroup>
        )
      }
    
}

class GetPasswordInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            pass_label:'',
            show_alert: false,
            isHidden: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.verifyIdentity = this.props.verifyIdentity.bind(this);
    }

    toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }

    handleChange(event){
        const target = event.target;
        const value  = target.value;
        const name   = target.name;
        this.setState({
            [name]: value,
        });
    }

    handleClick(event){
        var text = this.state.username;
        this.verifyIdentity(text);
    }


    render() {
      return (
          
        <FormGroup className="fadeInDown">
            <Input 
                name="username" 
                id="username" 
                placeholder="enter your username" 
                value={this.state.username}
                onChange={this.handleChange}
            />
            <Input 
                name="pass_label" 
                id="pass_label" 
                placeholder="enter password label" 
                value={this.state.pass_label}
                onChange={this.handleChange}
            />
            <Button outline color="info" block onClick={this.handleClick}>Get password</Button>
            
        </FormGroup>
      )
    }
  }

ReactDOM.render(
    <StupidPassApp/>
    ,
    document.getElementById('root')    
)