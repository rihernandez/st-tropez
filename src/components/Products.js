import React, { Component } from 'react'
import axios from 'axios';

export default class Products extends Component {

    state = {
        products:[],
        description:'',
        price:'',
        quantity:'',
        status:''
    }

    async componentDidMount() {
        this.getProducts()
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

    onInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:7000/products", {
            description: this.state.description,
            price: this.state.price,
            quantity: this.state.quantity,
            status: this.state.status
        })
        this.setState({
            description:'',
            price:'',
            quantity:'',
            status:''
        })
        this.getProducts();
    }

    getProducts = async () => {
        let res = await axios.get("http://localhost:7000/products")
        this.setState({ products: res.data })
       // console.log(this.state.products)
    }

    deleteProducts = async (id) => {
        await axios.delete("http://localhost:7000/products/" + id)
        this.getProducts();
    }

    tableRender(){
        return this.state.products.map(product => {
            if (product.name !==''){
            return(
              <tr key={product.id} onDoubleClick={() => this.deleteProducts(product.id)}>
                <td>{product.id}</td>
               <td>{product.description}</td>
               <td>{product.price}</td>
               <td>{product.quantity}</td>
               <td>{product.status}</td>
            </tr>
            )} 
        })

    }


    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                <div className="card card-body" >
                        <h3>Create a new product</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.onInputChange} placeholder="Description" name ="description"/>
                                <input type="text" className="form-control" onChange={this.onInputChange} placeholder="Price" name="price" />
                                <input type="text" className="form-control" onChange={this.onInputChange} placeholder="Quantity" name="quantity" />
                                <input type="text" className="form-control" onChange={this.onInputChange} placeholder="Status" name="status"/>
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
                        <h1 id='title'>List of products</h1><span></span><h6>(Doble clic to delete Products)</h6>
                        <table className="table" id='students'>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
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
