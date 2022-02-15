import React from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../Config"

export default class Home extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, </strong>
                    </h3>
                    <div className="row">
                        {/* products count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-dark">
                                        <strong>Products Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>0</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* customer count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-info">
                                    <h4 className="text-dark">
                                        <strong>Customers Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>0</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* transactions count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-warning">
                                    <h4 className="text-dark">
                                        <strong>Transactions Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>0</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* admins count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-dark">
                                        <strong>Admins Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>0</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
