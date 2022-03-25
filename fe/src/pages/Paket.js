import React from "react"
import Navbar from "../component/Navbar"
import PaketList from "../component/PaketList"
import { base_url, image_url } from "../Config.js"
import $ from "jquery"
import axios from "axios"


export default class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            paket: [],
            token: "",
            action: "",
            jenis: "",
            harga: "",
            image: "",
            uploadFile: true,
            fillPassword: true,
            id_paket: "",
            user: ""
        }

        if (localStorage.getItem("token") && localStorage.getItem("user")) {
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

    getPaket = () => {
        let url = base_url + "/paket"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ paket: response.data.data })
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
        $("#modal_paket").modal("show")
        this.setState({
            action: "insert",
            id_paket: 0,
            jenis: "",
            harga: "",
            image: null,
            fillPassword: true,
            uploadFile: true
        })
    }


    Edit = selectedItem => {
        $("#modal_paket").modal("show")
        this.setState({
            action: "update",
            id_paket: selectedItem.id_paket,
            jenis: selectedItem.jenis,
            harga: selectedItem.harga,
            image: null,
            uploadFile: false,
            fillPassword: false,
        })
    }

    savePaket = event => {
        event.preventDefault()
        $("#modal_paket").modal("hide")
        let form = new FormData()
        form.append("id_paket", this.state.id_paket)
        form.append("jenis", this.state.jenis)
        form.append("harga", this.state.harga)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/paket"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getPaket()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getPaket()
                })
                .catch(error => console.log(error))
        }
    }

    dropPaket = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/paket/" + selectedItem.id_paket
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPaket()
                })
                .catch(error => console.log(error))
        }
    }

    componentDidMount() {
        this.getPaket()
    }

    render() {
        if (this.state.user.role === "admin") {
            return (
                <div>
                    <Navbar />
                    <div className="container">
                        <h3 className="text-bold text-info mt-2">Paket List</h3>
                        <div className="row">
                            {this.state.paket.map(item => (
                                <PaketList
                                    key={item.id_paket}
                                    jenis={item.jenis}
                                    harga={item.harga}
                                    image={image_url + "/" + item.image}
                                    onEdit={() => this.Edit(item)}
                                    onDrop={() => this.dropPaket(item)}
                                />
                            ))}
                        </div>
                        <button className="btn btn-success" onClick={() => this.Add()}>
                            Add Paket
                        </button>
                    </div>

                    {/* modal paket  */}
                    <div className="modal fade" id="modal_paket">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Paket</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.savePaket(ev)}>
                                        Jenis
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.jenis}
                                            onChange={ev => this.setState({ jenis: ev.target.value })}
                                            required
                                        />

                                        Harga
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.harga}
                                            onChange={ev => this.setState({ harga: ev.target.value })}
                                            required
                                        />

                                        {this.state.action === "update" && this.state.uploadFile === false ? (
                                            <button className="btn btn-sm btn-dark mb-1 btn-block"
                                                onClick={() => this.setState({ uploadFile: true })}>
                                                Change Paket Image
                                            </button>
                                        ) : (
                                            <div>
                                                Paket Image
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