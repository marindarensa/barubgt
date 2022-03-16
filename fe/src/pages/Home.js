import React from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../Config"

export default class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",
            username: "",
            member: 0,
            outlet: 0,
            paket: 0,
            transaksi: 0,
            user: 0,
        }
        if (localStorage.getItem("token")) {
            // console.log("ada")
            this.state.token = localStorage.getItem("token")
        } else {
            // console.log("tdk ada")
            window.location = "/login"
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
                this.setState({ member: response.data.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        console.log(error.response.status)
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
                this.setState({ outlet: response.data.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        // window.alert(error.response.data.message)

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
                this.setState({ paket: response.data.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        // window.alert(error.response.data.message)
                    }
                } else {
                    console.log(error);
                }
            })
    }

    getUser = () => {
        let url = base_url + "/user"
        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(response => {
                this.setState({ user: response.data.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        // window.alert(error.response.data.message + " getUsers")
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
                this.setState({ transaksi: response.data.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        // window.alert(error.response.data.message)
                    }
                } else {
                    console.log(error);
                }
            })
    }

    getUsers = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({ username: user.nama })
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
                        <strong>Welcome back, {this.state.username} </strong>
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
