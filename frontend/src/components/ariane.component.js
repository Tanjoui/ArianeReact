import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArianeEdt = props => (
        <Link to={"/"+props.edt.edt_id}>{props.edt.edt_name}></Link>
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

    getCurrent(id){
        let currentEdt = this.state.edt.map(function(currentEdt, i){
            if(currentEdt.edt_id===id){ //on est à l'élément fils 
            console.log(currentEdt)
                return currentEdt
            }
        })   
        console.log(currentEdt)
        return currentEdt
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
        //console.log("l'id du fils est " + id)
        //console.log("l'id du parent est " + parent_id)
        this.state.edt.map(function(pere, i){
            if(pere.edt_id===parent_id){ //on est à l'élément père 
                pere_edt = pere
            }
        })
        return pere_edt
    }

    clearArray(array) {
        while (array.length) {
          array.pop();
        }
      }

    //ajoute a l'attribut tableau les differents pere d'un fils à l'id donné
    listParents(id){
        if(id == 0) return (<div></div>);//nous sommes à la racine
        else{//sinon
            let parent = this.getParent(id)//on récupère le noeud parent 
            if(parent != null){
                this.tableau.edt.push(parent)
                console.log(this.tableau)
                return this.listParents(parent.edt_id)
            }else{
                return (<div>(</div>)
            }
        }
    }
    /*
    listParents(id){
        let current = this.getParent(3)
        console.log(current)
        while(current.edt_id != 1){ //tant qu'on tombe pas sur le premier
            let parent = this.getParent(current.edt_id)
            this.tableau.edt.push(current) //on ajoute le noeud quand on trouve son parent
            current = parent //un fois trouvé, on recommence avec le parent
            }
    }*/

    //prints l'Ariane partant du fils à droite à l'id donné
    printAriane(){

        let id = this.getIdParameter()+1

        this.clearArray(this.tableau.edt)
        this.listParents(id) //on met a jour le tableau

        this.tableau.edt.reverse() //on le met dans le bon sens
        console.log(this.tableau)

        return this.tableau.edt.map(function(currentEdt, i){
                return <ArianeEdt edt={currentEdt} key={i} />;
                })
        }
    
    getIdParameter(){
        return parseInt(this.props.id_parameter)
    }
    
    
    render() {
        return (
            <div class="breadcrumb flat">
                { 
                    this.printAriane() 
                }
            </div>
        )
    }
}
