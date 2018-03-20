import React, { Component } from 'react';
import { Switch, HashRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Nav from './Nav';
import Users from './Users';
import Products from './Products';
import Create from './UserForm';
import UpdateDelete from './Update';

import store from './store';


//store.subscribe(()=> {
//    console.log(store.getState());
//})

class App extends Component{
    constructor() {
        super();
        this.state = {
            users: []
        };
        this.onCreateUser = this.onCreateUser.bind(this);
        this.onUpdateUser = this.onUpdateUser.bind(this);
    }

    onCreateUser(user) {
        axios.post('/api/users', user)
            .then(result => result.data)
            .then(user => {
                store.dispatch({
                    type: 'CREATE_USER',
                    user
                })
            })
            .then(()=> document.location.hash = '/');
    }

    onUpdateUser(user) {
        axios.put(`/api/users/${user.id}`, user)
            .then(result => result.data)
            .then(user => {
                store.dispatch({
                    type: 'UPDATE_USER',
                    user
                })
            })
     
            .then(()=> document.location.hash = '/');
    }

    componentDidMount() {
        axios.get('/api/users')
            .then(result => result.data)
            .then(users => {
                store.dispatch({
                    type: 'SET_USERS',
                    users
                });
            })
    }

    render() {
        const { onCreateUser, onUpdateUser } = this;
        return (
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={ Users } />
                        <Route exact path='/products' component={ Products } />
                        <Route exact path='/users/create' render={()=> <Create onCreateUser={ onCreateUser }/> } />  
                        <Route path='/users/:id' render={({ match })=> 
                            <UpdateDelete 
                                id={ match.params.id }
                                update={ onUpdateUser }
                            /> 
                        } /> 
                    </Switch>
                </div>
            </Router>
        )
    }
}
 



export default App;