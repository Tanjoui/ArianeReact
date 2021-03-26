import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArianeEdt = props => (
            <Link to={"/"+props.edt._id}>{props.edt.edt_name}</Link>
)

export default class Ariane extends Component{

    constructor(props){
        super(props);
        this.state = {edt: []}; //le state est une liste d'edt
    }

    componentDidMount() {
        axios.get('http://localhost:4000/edt/') //appel au backend pour lister tous les edt dans le state
            .then(response => {
                this.setState({ edt: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    getParent(id){
        let parent_id
        this.state.edt.map(function(currentEdt, i){
            if(currentEdt.edt_id==id){ //on est à l'élément fils 
            parent_id = currentEdt.edt_parent_id// on récupère l'id du père
            }
        })
        console.log(parent_id)
        this.state.edt.map(function(pere, i){
            if(pere.edt_id==parent_id){ //on est à l'élément père 
                //console.log(pere)
                return pere
            }
        })
    }

    listParents(id){
        if(id === 0) return null;
        else{

            let current = this.getParent(id)
            console.log(current)
            if(current != null){
                this.listParents(current.edt_parent_id)
                return <ArianeEdt edt={current}/>;
            }else{
                return "debut"
            }
            
        }
       
    }

    render() {
        return (
            <div class="breadcrumb flat">
                test
                { 
                    this.listParents(3) 
                }
            </div>
        )
    }
}
