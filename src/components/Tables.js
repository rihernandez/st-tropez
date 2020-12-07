import React, { Component } from 'react'
import axios from 'axios';

export default class Tables extends Component {

    state = {
        tables:[],
        reference:'',
        location:'',
        capacity:'',
        status:''

    }

    async componentDidMount() {
        this.getTables();
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:7000/tables", {
            reference: this.state.reference,
            location: this.state.location,
            capacity: this.state.capacity,
            status: this.state.status
        })
        this.setState({
            reference:'',
            location:'',
            capacity:'',
            status:''
        })
        this.getTables();
    }

    getTables = async () => {
        let res = await axios.get("http://localhost:7000/tables")
        this.setState({ tables: res.data })
    }

    deleteTables = async (id) => {
        await axios.delete("http://localhost:7000/tables/" + id)
        this.getTables();
    }

    tableRender(){
        return this.state.tables.map(table => {
            if (table.reference !==''){
            return(
              <tr key={table.id} onDoubleClick={() => this.deleteTables(table.id)}>
                <td>{table.id}</td>
               <td>{table.reference}</td>
               <td>{table.location}</td>
               <td>{table.capacity}</td>
               <td>{table.status}</td>
            </tr>
            )} 
        })

    }


    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                <div className="card card-body" >
                        <h3>Create a new table</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.onInputChange} placeholder="Reference" name="reference" />
                                <input type="text" className="form-control" onChange={this.onInputChange} placeholder="Location" name= "location" />
                                <input type="text" className="form-control" onChange={this.onInputChange} placeholder="Capacity" name = "capacity" />
                                <input type="text" className="form-control" onChange={this.onInputChange} placeholder="Status" name= "status"/>
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
                        <h1 id='title'>List of tables</h1><span></span><h6>(Doble clic to delete tables)</h6>
                        <table className="table" id='students'>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Reference</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Capacity</th>
                                    <th scope="col">Status</th>
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
