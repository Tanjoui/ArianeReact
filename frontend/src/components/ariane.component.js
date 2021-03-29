import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArianeEdt = props => (
            <Link to={"/"+props.edt._id}>{props.edt.edt_name}></Link>
)


export default class Ariane extends Component{

    constructor(props){
        super(props);
        this.state ={edt: []}; //le state est une liste d'edt
        this.tableau = {edt: []};
        this.current_id = 1;
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

    //Retourne le noeud père d'un fils à l'id donné
    getParent(id){
        let parent_id
        let pere_edt
        this.state.edt.map(function(currentEdt, i){
            if(currentEdt.edt_id===id){ //on est à l'élément fils 
            parent_id = currentEdt.edt_parent_id// on récupère l'id du père
            }
        })
        console.log("l'id du fils est " + id)
        console.log("l'id du parent est " + parent_id)
        this.state.edt.map(function(pere, i){
            if(pere.edt_id==parent_id){ //on est à l'élément père 
                pere_edt = pere
                
            }
        })
        return pere_edt
    }

    //ajoute a l'attribut tableau les differents pere d'un fils à l'id donné
    listParents(id){
        if(id === 0) return (<div>)</div>);//nous sommes à la racine
        else{
            let current = this.getParent(id)
            if(current != null){
                this.tableau.edt.push(current)
                //<ArianeEdt edt={current}/>;
                return this.listParents(current.edt_id)
            }else{
                return (<div>(</div>)
            }
        }
    }

    getNumberById(id){
        this.state.edt.map(function(currentEdt, i){
            if(currentEdt._id===id){ //on est à l'élément fils 
            return currentEdt.edt_id
            }
        })
    }

    //prints l'Ariane partant du fils à droite à l'id donné
    printAriane(id){
        //let number = this.getNumberById(id)
        this.listParents(id) //on met a jour le tableau
        console.log(this.tableau.edt)
        this.tableau.edt.reverse() //on le met dans le bon sens

        return this.tableau.edt.map(function(currentEdt, i){
                console.log(currentEdt)
                return <ArianeEdt edt={currentEdt} key={i} />;
                })
        }
    
    getId(){
        console.log(this.current_id)
        console.log(this.props)
        if(this.props.match.params.id != null){
            this.current_id = this.props.match.params.id
        }
        else{
            this.current_id = 1
        }
    }

    
    
    render() {
        return (
            <div class="breadcrumb flat">
                { 
                    this.printAriane(3) 
                }
            </div>
        )
    }
}
