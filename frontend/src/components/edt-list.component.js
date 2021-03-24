import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Edt = props => (
    <tr>
        <td>{props.edt.edt_id}</td>
        <td>{props.edt.edt_parent_id}</td>
        <td>{props.edt.edt_name}</td>
        <td>
            <Link to={"/edit/"+props.edt._id}>Edit</Link>
        </td>
    </tr>
)

export default class EdtsList extends Component {

    constructor(props) {
        super(props);
        this.state = {edt: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/edt/')
            .then(response => {
                this.setState({ edt: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    edtList() {
        return this.state.edt.map(function(currentEdt, i){
            return <Edt edt={currentEdt} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Edts List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Parent Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.edtList() }
                    </tbody>
                </table>
            </div>
        )
    }
}