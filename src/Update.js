import React, { Component } from 'react';

import store from './store';

export default class UpdateDelete extends Component {
    constructor() {
        super();
        this.state = {
            name: '', 
            users: store.getState().users
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.setUser = this.setUser.bind(this);
        this.update = this.update.bind(this);
    }

    setUser(id) {
        store.subscribe(() => {
            this.setState({ users: store.getState().users })
        })
        const { users } = this.state;
        const selectedUser = users.find(user => user.id === id);
        if(selectedUser) {
            this.setState({ name: selectedUser.name });
        }
    }

/*   componentWillReceiveProps(nextProps) {
        this.setUser(nextProps.id*1)
    }
*/
    componentDidMount() {
 //     console.log(this.props)
        this.setUser(this.props.id*1)
    }

    onChangeName(ev) {
        this.setState({ name: ev.target.value });
    }

    update(ev) {
        ev.preventDefault();
        this.props.update({ id: this.props.id, name: this.state.name })
    }

    render() {
       const { onChangeName, update } = this;
       const { name } = this.state;
        return (
            <form onSubmit={ update }>
                <input value={ name } onChange={ onChangeName } />
                <button disabled={ name.length === 0 }>Update</button>
                <button>Delete</button>
            </form>
        )
    }


}