import React from "react"
import Navbar from "../component/Navbar"
import TransaksiList from "../component/TransaksiList"
import { base_url } from "../Config.js"
import $ from "jquery"
import axios from "axios"

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            transaksi: [],
            paket: [],
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: "",
            user: [],
            outlet: [],
            selectedItem: null
        }

        /* logika if-else --> untuk mengecek apakah user yg mengakses telah melakukan
           login sebagai admin atau belum
        */
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }

        // header config -> untuk memberikan header berupa 'beare token' sebagai request API
        // sebelum mengakses data
        headerConfig = () => {
            let header = {
                headers: { Authorization: `Bearer ${this.state.token}` }
            }
            return header
        }

        // getTransaksi -> untuk mengakses API get transaksi
        getTransaksi = () => {
            let url = base_url + "/transaksi"
            axios.get(url, this.headerConfig())
                .then(response => {
                    this.setState({ transaksi: response.data })
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
            window.$("#modal_transaksi").modal("show")
            this.setState({
                action: "insert",
                id_transaksi: 0,
                id_member: 0,
                id_paket: 0,
                tgl: "",
                batas_waktu: "",
                tgl_bayar: "",
                status: "",
                dibayar: "",
                id_user: 0,
                id_outlet: 0,
                fillPassword: true,
                uploadFile: true
            })
        }


        Edit = selectedItem => {
            window.$("#modal_transaksi").modal("show")
            this.setState({
                action: "update",
                id_transaksi: selectedItem.id_transaksi,
                id_member: selectedItem.id_member,
                id_paket: selectedItem.id_paket,
                tgl: selectedItem.tgl,
                batas_waktu: selectedItem.batas_waktu,
                tgl_bayar: selectedItem.tgl_bayar,
                status: selectedItem.status,
                dibayar: selectedItem.dibayar,
                id_user: selectedItem.id_user,
                id_outlet: selectedItem.id_outlet,
                uploadFile: false,
                fillPassword: false,
            })
        }

        saveTransaksi = event => {
            event.preventDefault()
            window.$("#modal_transksi").modal("hide")
            let form = new FormData()
            form.append("id_transaksi", this.state.id_transaksi)
            form.append("id_member", this.state.id_member)
            form.append("tgl", this.state.tgl)
            form.append("batas_waktu", this.state.batas_waktu)
            form.append("tgl_bayar", this.state.tgl_bayar)
            form.append("status", this.state.status)
            form.append("dibayar", this.state.dibayar)
            form.append("id_user", this.state.id_user)
            form.append("id_outlet", this.state.id_outlet)
            form.append("id_paket", this.state.id_paket)

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

        dropTransaksi = selectedItem => {
            if (window.confirm("are you sure will delete this item?")) {
                let url = base_url + "/transksi/" + selectedItem.id_transaksi
                axios.delete(url, this.headerConfig())
                    .then(response => {
                        // window.alert(response.data.message)
                        this.getPaket()
                    })
                    .catch(error => console.log(error))
            }
        }
    }
    componentDidMount() {
        this.getTransaksi()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Transaksi List</h3>
                    {this.state.transaksi.map(item => (
                        <TransaksiList
                            key={item.id_transaksi}
                            id_transaksi={item.id_transaksi}
                            nama_member={item.member.nama_member}
                            alamat={item.member.alamat}
                            tgl={item.tgl}
                            paket={item.detail_transaksi}
                        />
                    ))}
                </div>

                {/* modal transaksi  */}
                <div className="modal fade" id="modal_paket">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Transaksi</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveTransaksi(ev)}>
                                    Id Member
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.id_member}
                                        onChange={ev => this.setState({ id_member: ev.target.value })}
                                        required
                                    />

                                    Id Paket
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.id_paket}
                                        onChange={ev => this.setState({ id_paket: ev.target.value })}
                                        required
                                    />

                                    Tanggal
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.tgl}
                                        onChange={ev => this.setState({ tgl: ev.target.value })}
                                        required
                                    />

                                    Batas Waktu
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.batas_waktu}
                                        onChange={ev => this.setState({ batas_waktu: ev.target.value })}
                                        required
                                    />

                                    Tanggal Dibayar
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.tgl_bayar}
                                        onChange={ev => this.setState({ tgl_bayar: ev.target.value })}
                                        required
                                    />

                                    Status
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.status}
                                        onChange={ev => this.setState({ status: ev.target.value })}
                                        required
                                    />

                                    Dibayar
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.dibayar}
                                        onChange={ev => this.setState({ dibayar: ev.target.value })}
                                        required
                                    />

                                    Id User
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.id_user}
                                        onChange={ev => this.setState({ id_user: ev.target.value })}
                                        required
                                    />

                                    Id Outlet
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.id_outlet}
                                        onChange={ev => this.setState({ id_outlet: ev.target.value })}
                                        required
                                    />

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
    }
}
