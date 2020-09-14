import React, {Component} from 'react';
// import {Col, Row } from 'reactstrap';
import ItemList from '../itemList';
import PersonDetails, { Field } from '../personDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {
    gotService = new gotService();
    
    state = {
        selectedChar: 130,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    };

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={ ({ name, gender }) => `${name} (${gender})` }/>
        )

        const charDetails = (
            <PersonDetails charId={this.state.selectedChar}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </PersonDetails>
        )
        
        return (
            <RowBlock left={ itemList } right={ charDetails }/>
        )
    }
}