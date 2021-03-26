import React, { Component } from 'react';
import axios from 'axios';

export default class EditEdt extends Component {

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

    componentDidMount() {
        axios.get('http://localhost:4000/edt/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    edt_description: response.data.edt_id,
                    edt_responsible: response.data.edt_parent_id,
                    edt_priority: response.data.edt_name
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
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
        const obj = {
            edt_id: this.state.edt_id,
            edt_parent_id: this.state.edt_parent_id,
            edt_name: this.state.edt_name
        };
        console.log(obj);
        axios.post('http://localhost:4000/edt/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Edt</h3>
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
                        <label>Parent Id: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.edt_name}
                                onChange={this.onChangeEdtName}
                                />
                    </div>
                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Edt" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}