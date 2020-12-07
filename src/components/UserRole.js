import React, { Component } from 'react'
import axios from 'axios';

export default class Products extends Component {

    state = {
        roles: [],
        description:''

    }

    async componentDidMount() {
        this.getRoles();
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:7000/roles", {
            description: this.state.description
        })
        this.setState({  description: ''})
        this.getRoles();
    }

    getRoles = async () => {
        let res = await axios.get("http://localhost:7000/roles")
        this.setState({ roles: res.data })
    }

    deleteRoles = async (id) => {
        await axios.delete("http://localhost:7000/roles/" + id)
        this.getRoles();
    }

    tableRender(){
        return this.state.roles.map(rol => {
            if (rol.description !==''){
            return(
              <tr key={rol.id} onDoubleClick={() => this.deleteRoles(rol.id)}>
                <td>{rol.id}</td>
               <td>{rol.description}</td>
            </tr>
            )} 
        })

    }


    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                <div className="card card-body" >
                        <h3>Create a new role</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.onInputChange} placeholder="Description" name="description"/>
                            </div>
                            <button type="submit" className="btn btn-large btn-primary">
                                Send
                        </button>

                        </form>
                    </div>
                </div>
                <div className="col-md-8">

                {/** 
                <ul className="list-group">
                        {
                            this.state.users.map(user => <li className="list-group-item list-group-item-action" key={user.id} onDoubleClick={() => this.deleteUsers(user.id)}>{user.name}</li>)
                        }
                </ul>
                **/}

                    <div>
                        <h1 id='title'>List of roles</h1><span></span><h6>(Doble clic to delete roles)</h6>
                        <table className="table" id='students'>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.tableRender()}
                            </tbody>
                        </table>
                    </div>


                </div>



            </div>
        )
    }
}
