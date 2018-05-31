import React from 'react';
import {
    Button,ButtonGroup,CardFooter,
    Navbar,NavbarBrand
}
from 'reactstrap';
import * as FontAwesome from 'react-icons/lib/fa'

class StupidPassNav extends React.Component {

    constructor(props){
        super(props);
    }

    handleAddClick(){
        //
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
                    <Button outline color="info" disabled={this.props.getViewState == 0 ? "true" : "false"} onClick={this.handleGetClick.bind(this)}>
                        <FontAwesome.FaSearch/> 
                    </Button>
                    <Button outline color="info" onClick={this.handleHomeClick.bind(this)}>
                        <FontAwesome.FaHome/> 
                    </Button>
                </ButtonGroup>
            </Navbar>
        )
    }

}