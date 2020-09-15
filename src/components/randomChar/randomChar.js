import React, {useState, useEffect} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner/';
import ErrorMessage from '../errorMessage/';
 
function RandomChar () {
    const [char, updateCharState] = useState({});
    const [loading, onCharLoadedState] = useState(true);
    const [error, onErrorState] = useState(false);
 
    useEffect(() => {
        updateChar();
    }, []);
 
    const gotService = new GotService();
 
    const updateChar = () => {
        console.log('update');
        const id = Math.floor(Math.random() * 140 + 25);
        gotService.getCharacter(id)
            .then((data) => {
                updateCharState(data);
                onCharLoadedState(false);
            })
            .catch(() => {
                onErrorState(true);
                onCharLoadedState(false);
            });
    }
    
    const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
    const spinner = loading ? <Spinner></Spinner> : null;
    const content = !(loading || error) ? <View char={char}></View> : null;
    
    return (
        <div className="random-block rounded">
            { errorMessage }
            { spinner }
            { content }
        </div>
    );
}
 
const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    
    return ( 
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
export default RandomChar;