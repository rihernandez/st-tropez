import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default class Reservation extends Component {

    state = {
        users: [],
        tables: [],
        unSelected: '',
        name: '',
        customer: '',
        table: '',
        numberOfPerson: '',
        date: new Date(),
        status: 'New',
        tableid: ''
    }
    componentDidMount() {
        this.getUser();
        this.getTables();
    }

    getUser = async () => {
        let res = await axios.get("http://localhost:7000/users")
        this.setState({ 
            users: res.data
        })
    }

    getTables = async () => {
        let res = await axios.get("http://localhost:7000/tables")
        this.setState({ tables: res.data })
        console.log(res);
    }

    onSubmit = async (e) => {
        e.preventDefault();
       // console.log(this.state.unSelected, this.state.name, this.state.title, this.state.content, this.state.date)
       await axios.put("http://localhost:7000/tables/"+this.state.table,{
           status: "Busy"
       })

       let newTable = await axios.get("http://localhost:7000/tables/",+ this.state.table)
        this.setState({tables: newTable.data,
            table: this.state.tables[this.state.table].reference
        })

       await axios.post("http://localhost:7000/reservations",{
        customer: this.state.customer,
        table: this.state.table,
        numberOfPerson: this.state.numberOfPerson,
        date: this.state.date,
        status: 'New',
        tableid:''
       })

       console.log(this.state.table);
      
        
    }


    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date })
    }


    render() {
        return (
            <div>
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body">
                        <h1>Create Reservation</h1>

                        {/**Select * USER */}
                        <div className="form-group">
                            <select className="form-control" name="customer" onChange={this.onInputChange}>
                                {
                                    this.state.users.map(user => <option key={user.id} value={user.name+' '+user.lastname}>{user.name} {user.lastname}</option>)
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="form-control" name="table" onChange={ this.onInputChange}>
                                {
                                    this.state.tables.map(function (table, i) {
                            
                                        if (table.status !== 'Busy') {
                                           
                                            return <option key={table.id} value={table.id}>{table.reference}</option>;
                                        }
                            
                                        return '';
                                        
                                    })

                                    //this.state.tables.map(table => <option key={table.id} value={table.reference}>{table.reference}</option>)
                                }
                               
                            </select>
                        </div>


                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Number Of Person" name="numberOfPerson" required onChange={this.onInputChange} />
                        </div>

                        <div className="form-group">
                            <textarea name="comment" id="" cols="50" rows="1" className="form-control" placeholder="Comment" required onChange={this.onInputChange}></textarea>
                        </div>

                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.date} name="date" onChange={this.onChangeDate} />
                        </div>

                        <form onSubmit={this.onSubmit}>
                            <button type="submit" className="bnt btn-primary"> save </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
