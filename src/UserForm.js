import React, { Component } from 'react';

export default class Create extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        };
        this.onSave = this.onSave.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
    }
    onSave(ev) {
        ev.preventDefault();
        this.props.onCreateUser({ name: this.state.name });
    }

    onChangeName(ev) {
        this.setState({ name: ev.target.value })
    }

    render() {
        const { name } = this.state;
        const { onSave, onChangeName } = this;
        return (
            <form onSubmit = { onSave }>
                <input value = { name } onChange = { onChangeName } />
                <button disabled = { name.length === 0 }>Create</button>        
            </form>
        )
    }
}

/*export class UpdateDelete extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        }
    }
    render() {
        return (
            <div>
            console.log('hello')
            <form>
                <input />
                <button>Update</button>
                <button>Delete</button>
            </form>
            </div>
        )
    }

}*/
