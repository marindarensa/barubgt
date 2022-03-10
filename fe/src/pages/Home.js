import React from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../Config"

export default class Home extends React.Component {
    constructor() {
        super()

        this.state = {
            token: "",
            adminName: null,
            memberCount: 0,
            outletCount: 0,
            paketCount: 0,
            transaksiCount: 0,
            userCount: 0
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            // window.location = "/login"
        }
    }

    getMember = () => {
        let url = base_url + "/member"
        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(response => {
                this.setState({ memberCount: response.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        // window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    getOutlet = () => {
        let url = base_url + "/outlet"
        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(response => {
                this.setState({ outletCount: response.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        // window.alert(error.response.data.message)

                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    getPaket = () => {
        let url = base_url + "/paket"
        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(response => {
                this.setState({ paketCount: response.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        // window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    getUsers = () => {
        let url = base_url + "/user"
        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(response => {
                this.setState({ usersCount: response.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        // window.alert(error.response.data.message + " getUsers")
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error)
                }

            })
    }

    getTransaksi = () => {
        let url = base_url + "/transaksi"
        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(response => {
                this.setState({ transaksiCount: response.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        // window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    getUser = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({ userName: user.name })
    }

    componentDidMount() {
        this.getMember()
        this.getOutlet()
        this.getPaket()
        this.getUsers()
        this.getTransaksi()
        this.getUser()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, {this.state.user} </strong>
                    </h3>
                    <div className="row">
                        {/* member count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-dark">
                                        <strong>Member Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.member}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* outlet count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-info">
                                    <h4 className="text-dark">
                                        <strong>Outlet Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.outlet}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* paket count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-warning">
                                    <h4 className="text-dark">
                                        <strong>Paket Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.paket}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* users count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-dark">
                                        <strong>User Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.user}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* transaksi count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-secondary">
                                    <h4 className="text-dark">
                                        <strong>Transaksi Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.transaksi}</strong>
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
