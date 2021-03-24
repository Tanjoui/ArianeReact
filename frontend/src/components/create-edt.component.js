import React, { Component } from 'react';
import axios from 'axios';

export default class CreateEdt extends Component {

    constructor(props) {
        super(props);

        this.onChangeEdtId = this.onChangeEdtId.bind(this);
        this.onChangeEdtParentId = this.onChangeEdtParentId.bind(this);
        this.onChangeEdtName = this.onChangeEdtName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            edt_id: '',
            edt_parent_id: '',
            edt_name: ''
        }
    }

    onChangeEdtId(e) {
        this.setState({
            edt_id: e.target.value
        });
    }

    onChangeEdtParentId(e) {
        this.setState({
            edt_parent_id: e.target.value
        });
    }

    onChangeEdtName(e) {
        this.setState({
            edt_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Edt Id: ${this.state.edt_id}`);
        console.log(`Edt Parent Id: ${this.state.edt_parent_id}`);
        console.log(`Edt Name: ${this.state.edt_name}`);
     
        const newEdt = {
            edt_id: this.state.edt_id,
            edt_parent_id: this.state.edt_parent_id,
            edt_name: this.state.edt_name
        };

        axios.post('http://localhost:4000/edt/add', newEdt)
            .then(res => console.log(res.data));

        this.setState({
            edt_id: '',
            edt_parent_id: '',
            edt_name: ''
        })
    }


    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Edt</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Id: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.edt_id}
                                onChange={this.onChangeEdtId}
                                />
                    </div>
                    <div className="form-group">
                        <label>Parent Id: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.edt_parent_id}
                                onChange={this.onChangeEdtParentId}
                                />
                    </div>

                    <div className="form-group">
                    <label>Name: </label>
                    <input 
                            type="text" 
                            className="form-control"
                            value={this.state.edt_name}
                            onChange={this.onChangeEdtName}
                            />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Edt" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}