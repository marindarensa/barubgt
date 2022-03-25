import React from "react"
import Navbar from "../component/Navbar"
import OutletList from "../component/OutletList"
import { base_url, image_url } from "../Config.js"
import $ from "jquery"
import axios from "axios"


export default class Outlet extends React.Component {
    constructor() {
        super()
        this.state = {
            outlet: [],
            token: "",
            action: "",
            tempat: "",
            image: "",
            uploadFile: true,
            fillPassword: true,
            id_outlet: "",
            user: ""
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            this.state.user = JSON.parse(localStorage.getItem("user"))
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getOutlet = () => {
        let url = base_url + "/outlet"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ outlet: response.data.data })
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

    Add = () => {
        $("#modal_outlet").modal("show")
        this.setState({
            action: "insert",
            id_outlet: 0,
            tempat: "",
            image: null,
            fillPassword: true,
            uploadFile: true
        })
    }


    Edit = selectedItem => {
        $("#modal_outlet").modal("show")
        this.setState({
            action: "update",
            id_outlet: selectedItem.id_outlet,
            tempat: selectedItem.tempat,
            image: null,
            uploadFile: false,
            fillPassword: false,
        })
    }

    saveOutlet = event => {
        event.preventDefault()
        $("#modal_outlet").modal("hide")
        let form = new FormData()
        form.append("id_outlet", this.state.id_outlet)
        form.append("tempat", this.state.tempat)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/outlet"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getOutlet()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getOutlet()
                })
                .catch(error => console.log(error))
        }
    }

    dropOutlet = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/outlet/" + selectedItem.id_outlet
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getOutlet()
                })
                .catch(error => console.log(error))
        }
    }

    componentDidMount() {
        this.getOutlet()
    }

    render() {
        if (this.state.user.role === "admin") {
            return (
                <div>
                    <Navbar />
                    <div className="container">
                        <h3 className="text-bold text-info mt-2">Outlet List</h3>
                        <div className="row">
                            {this.state.outlet.map(item => (
                                <OutletList
                                    key={item.id_outlet}
                                    tempat={item.tempat}
                                    image={image_url + "/" + item.image}
                                    onEdit={() => this.Edit(item)}
                                    onDrop={() => this.dropOutlet(item)}
                                />
                            ))}
                        </div>
                        <button className="btn btn-success" onClick={() => this.Add()}>
                            Add Outlet
                        </button>
                    </div>

                    {/* modal outlet  */}
                    <div className="modal fade" id="modal_outlet">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Outlet</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveOutlet(ev)}>
                                        Tempat
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.tempat}
                                            onChange={ev => this.setState({ tempat: ev.target.value })}
                                            required
                                        />

                                        {this.state.action === "update" && this.state.uploadFile === false ? (
                                            <button className="btn btn-sm btn-dark mb-1 btn-block"
                                                onClick={() => this.setState({ uploadFile: true })}>
                                                Change Outlet Image
                                            </button>
                                        ) : (
                                            <div>
                                                Outlet Image
                                                <input type="file" className="form-control mb-1"
                                                    onChange={ev => this.setState({ image: ev.target.files[0] })}
                                                    required
                                                />
                                            </div>
                                        )}

                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else {
            window.alert("Access Denied")
            window.location = '/'
        }
    }
}