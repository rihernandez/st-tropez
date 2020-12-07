import React, { Component } from 'react'
import axios from 'axios';

export default class Menu extends Component {

    state = {
        products: [],
        description: '',
        price: '',
        quantity: '',
        status: '',
        image:''

    }

    async componentDidMount() {
        this.getProducts();
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

    getProducts = async () => {
        let res = await axios.get("http://localhost:7000/products")
        this.setState({ products: res.data });
        
    }

 
    BufferToBase64(buffer) {
        var binary = '';
        var byte = new Uint8Array( buffer );
        var byteLen = byte.byteLength;
        for (var i = 0; i < byteLen; i++) {
            binary += String.fromCharCode( byte[ i ] );
        }
        console.log("klk" +window.btoa( binary ));
        return window.btoa( binary );
    }
    

    deleteUsers = async (id) => {
        await axios.delete("http://localhost:7000/users/" + id)
        this.getUsers();
    }

    tableRender(){
        return this.state.products.map(product => {
            if (product.description !==''){
            return(
              <tr key={product.id} onDoubleClick={() => this.deleteUsers(product.id)}>
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
                
                <div className="col-md-8">
                    

                {/** 
                <ul className="list-group">
                        {
                            this.state.users.map(user => <li className="list-group-item list-group-item-action" key={user.id} onDoubleClick={() => this.deleteUsers(user.id)}>{user.name}</li>)
                        }
                </ul>
                **/}

                    <div>
                        <h1 id='title'>Products</h1><span></span><h6>(Doble clic to add product to this order)</h6>
                        <table className="table" id='students'>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
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
