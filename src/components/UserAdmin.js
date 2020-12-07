import React, { Component } from 'react'
import axios from 'axios';

export default class UserAdmin extends Component {

    state = {
        users: [],
        name: '',
        lastname: '',
        phone: '',
        email: ''

    }

    async componentDidMount() {
        this.getUsers();
    }

    onChangeLastName = (e) => {
        this.setState({ lastname: e.target.value })
    }

    onChangePhone = (e) => {
        this.setState({ phone: e.target.value })
    }
    onChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }
    onChangeName = (e) => {
        this.setState({ name: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:7000/users", {
            name: this.state.name,
            lastname: this.state.lastname,
            phone: this.state.phone,
            email: this.state.email
        })
        this.setState({ name: '', lastname: '', phone: '', email: '' })
        this.getUsers();
    }

    getUsers = async () => {
        let res = await axios.get("http://localhost:7000/users")
        this.setState({ users: res.data })
    }

    deleteUsers = async (id) => {
        await axios.delete("http://localhost:7000/users/" + id)
        this.getUsers();
    }

    tableRender(){
        return this.state.users.map(user => {
            if (user.name !==''){
            return(
              <tr key={user.id} onDoubleClick={() => this.deleteUsers(user.id)}>
                <td>{user.id}</td>
               <td>{user.name}</td>
               <td>{user.lastname}</td>
               <td>{user.phone}</td>
               <td>{user.email}</td>
            </tr>
            )} 
        })

    }


    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                <div className="card card-body" >
                        <h3>Create a new user</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.onChangeName} placeholder="Name" value={this.state.name} />
                                <input type="text" className="form-control" onChange={this.onChangeLastName} placeholder="Last Name" value={this.state.lastname} />
                                <input type="text" className="form-control" onChange={this.onChangePhone} placeholder="Phone" value={this.state.phone} />
                                <input type="text" className="form-control" onChange={this.onChangeEmail} placeholder="Email" value={this.state.email} />
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
                        <h1 id='title'>List of users</h1><span></span><h6>(Doble clic to delete users)</h6>
                        <table className="table" id='students'>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Last name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Email</th>
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
