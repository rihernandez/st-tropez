import React, { Component } from 'react'
import axios from 'axios';
import icons from 'glyphicons'

export default class ReservationList extends Component {
    state = {
        reservations: []
    }

    async getReservations() {
        let result = await axios.get("http://localhost:7000/reservations");
        this.setState({ reservations: result.data });
        console.log(result);
    }

    componentDidMount() {
        this.getReservations();
        console.info('I' + icons.heart + ' Glyphicons!');
    }

    checkStatus() {


        // {icons.crossHeavy}
        //{icons.checkHeavy}
        //{icons.eye}

    }

    render() {
        return (
            <div>
                <div className="row">
                    {
                        this.state.reservations.map(reserv => (
                            <div className="col-md-4 p-2" key={reserv.id}>
                                <div className="card">
                                    <div className="card-header">
                                        <h5>{reserv.table}</h5><span name="pp" >{icons.checkHeavy}</span>


                                    </div>
                                    <div className="card-body">
                                        <h3>{reserv.customer}</h3>
                                        <p>Reserved for {reserv.numberOfPerson} people | on date {reserv.date}</p>

                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-outline-danger">Reject</button>
                                        <button className="btn btn-outline-success">Accept</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
