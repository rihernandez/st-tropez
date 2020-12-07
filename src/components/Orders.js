import React, { Component } from 'react'
import axios from 'axios';

export default class UserAdmin extends Component {

    state = {
        orders:[],
        products:[],
        price:'',
        users: [],
        name: '',
        lastname: '',
        phone: '',
        email: '',
        employee:" ",
        product: " ",
        quantity: " ",
        subtotal: " ",
        comment: "",
        tatus:"Nueva",
        description: ''

    }

    async componentDidMount() {
        this.getUsers();
        this.getProduct();
        this.getOrders();
    }

    getProduct = async () =>{
        let res = await axios.get("http://localhost:7000/products")
        this.setState({ products: res.data })   
        console.log(this.state.products);
    }

    onInputChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:7000/orders", {
            employee:" ",
            product: this.state.description,
            quantity: this.state.quantity,
            subtotal: this.state.price,
            comment: "",
            tatus:"Nueva"
        })
        this.setState({
            employee:" ",
            product: " ",
            quantity: " ",
            subtotal: " ",
            comment: "",
            tatus:" ",
            price: ''
        })
        this.getUsers();
    }

    getUsers = async () => {
        let res = await axios.get("http://localhost:7000/users")
        this.setState({ users: res.data })
    }

    getOrders = async () => {
        let res = await axios.get("http://localhost:7000/orders")
        this.setState({ orders: res.data })
    }

    deleteOrders = async (id) => {
        await axios.delete("http://localhost:7000/orders/" + id)
        this.getOrder();
    }

    onInputChange = (e) =>{
        this.setState({
           [e.target.name] : e.target.value 
        })
    }
    
    tableRender(){
        return this.state.orders.map(order => {
            if (order.product !==''){
            return(
              <tr key={order.id} onDoubleClick={() => this.deleteOrders(order.id)}>
               <td>{order.product}</td>
               <td>{order.quantity}</td>
               <td>{order.subtotal}</td>
               <td>{order.status}</td>
            </tr>
            )} 
        })

    }


    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                <div className="card card-body" >
                        <h3>Create a new order</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                            <div className="form-group">
                            <select className="form-control" name="description" onChange={ this.onInputChange}>
                                {
                                    this.state.users.map(function (user, i) {
                            
                                        if (user.status !== 'Busy') {
                                           
                                            return <option key={user.id} value={user.name} >{user.name}{user.lastname}</option>;
                                        }
                                        return '';
                                        
                                    })

                                    //this.state.tables.map(table => <option key={table.id} value={table.reference}>{table.reference}</option>)
                                } 
                            </select>
                        </div>
                        <div className="form-group">
                            <select className="form-control" name="product" onChange={ this.onInputChange}>
                                {
                                    this.state.products.map(function (product, i) {
                            
                                        if (product.status !== 'Busy') {
                                           
                                            return <option key={product.id} value={product.description} >{product.description} [{product.price}/unid]    </option>;
                                        }
                                        return '';
                                        
                                    })

                                    //this.state.tables.map(table => <option key={table.id} value={table.reference}>{table.reference}</option>)
                                } 
                            </select>
                        </div>
                                <input type="text" className="form-control" onChange={this.onInputChange} placeholder="Cantidad" value={this.state.name} name="cantidad" />
                            </div>
                            <button type="submit" className="btn btn-large btn-primary">
                                Send
                        </button>

                        </form>
                    </div>
                </div>
                <div className="col-md-4">

                {/** 
                <ul className="list-group">
                        {
                            this.state.users.map(user => <li className="list-group-item list-group-item-action" key={user.id} onDoubleClick={() => this.deleteUsers(user.id)}>{user.name}</li>)
                        }
                </ul>
                **/}

                    <div>
                        <h1 id='title'>List of Items in this Order</h1><span></span><h6>(Doble clic to delete item)</h6>
                        <table className="table" id='students'>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
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
