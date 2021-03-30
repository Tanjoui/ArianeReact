import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Ariane from "./ariane.component";

const Edt = props => (
    <tr>
        <td>{props.edt.edt_id}</td>
        <td>{props.edt.edt_parent_id}</td>
        <td>
        <Link to={"/"+props.edt.edt_id}>{props.edt.edt_name}</Link>
        </td>
        <td>
            <Link to={"/edit/"+props.edt.edt_id}>Edit</Link>
        </td>
    </tr>
)

export default class EdtsList extends Component {

    constructor(props) {
        super(props);
        this.state = {edt: []}; //le state est une liste d'edt
    }

    componentDidMount() {
        console.log("params id:")
        console.log(this.props.match.params.id)
        axios.get('http://localhost:4000/edt/') //appel au backend pour lister tous les edt dans le state
            .then(response => {
                this.setState({ edt: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    getNumberById(id){
        this.state.edt.map(function(currentEdt, i){
            if(currentEdt._id===id){ //on est à l'élément fils 
            return currentEdt.edt_id
            }
        })
    }

    getIdParameter(){
        let id;
        if(this.props.match.params.id == null){
            id = 0;
        }else{
            id = parseInt(this.props.match.params.id)

        }
        return id
    }

    //Liste tous les fils à un id donné
    edtListSons(){
        //let id = this.props.match.params.id
        let id = this.getIdParameter()

        return this.state.edt.map(function(currentEdt, i){
            if(currentEdt.edt_parent_id===id){
                return <Edt edt={currentEdt} key={i} />;
            }
        })
    }

    render() {
        return (
            <div>
                <Ariane id_parameter={this.getIdParameter()}/>
                <h3>Liste des modules fils</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Parent Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.edtListSons() }
                    </tbody>
                </table>
            </div>
        )
    }
}