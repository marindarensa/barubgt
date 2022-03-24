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
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: "",
            user: [],
            outlet: [],
            action: "",
            selectedItem: null,
            userData: "",
            paket: [],
            user: [],
            member: [],
            detail_transaksi: [
                {id_paket: 0, qty:0}
            ]
        }


        /* logika if-else --> untuk mengecek apakah user yg mengakses telah melakukan
           login sebagai admin atau belum
        */
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            this.state.userData = JSON.parse(localStorage.getItem("user"))
        } else {
            window.location = "/login"
        }
    }

    // header config -> untuk memberikan header berupa 'beare token' sebagai request API
    // sebelum mengakses data
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    // get paket for dropdown
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

    // get member for dropdown
    getMember = () => {
        let url = base_url + "/member"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ member: response.data.data })
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

    // get user for dropdown
    getUser = () => {
        let url = base_url + "/user"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ user: response.data.data })
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

    // get outlet for dropdown
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

    // getTransaksi -> untuk mengakses API get transaksi
    getTransaksi = () => {
        let url = base_url + "/transaksi"
        axios.get(url, this.headerConfig())
            .then(response => {
                // let dataTransaksi 
                let dataTransaksi = response.data.data //array transaksi
                if (dataTransaksi !== null || dataTransaksi !== undefined) {
                    dataTransaksi.map((item, i) => {
                        let details = item.detail_transaksi //array detail
                        let total = 0

                        details.map((detail) => {
                            let qty = detail.qty
                            let harga = detail.paket.harga

                            total += qty * harga
                        })

                        dataTransaksi[i].total = total
                    })
                }
                this.setState({ transaksi: dataTransaksi })
                // console.log(this.state.transaksi);
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        console.log(error.response.status)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    Add = () => {
        $("#modal_transaksi").modal("show")
        this.setState({
            action: "insert",
            id_transaksi: 0,
            id_member: 0,
            id_user: this.state.userData.id_user,
            id_outlet: 0,
            status: "",
            dibayar: ""
        })
    }


    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()} `
    }

    Edit = selectedItem => {
        $("#modal_transaksi").modal("show")
        this.setState({
            action: "update",
            id_transaksi: selectedItem.id_transaksi,
            id_member: selectedItem.id_member,
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
        $("#modal_transaksi").modal("hide")
        const form = {
            id_user: this.state.id_user,
            id_member: this.state.id_member,
            id_outlet: this.state.id_outlet,
            dibayar: this.state.dibayar,
            detail_transaksi: this.state.detail_transaksi
        }

        let url = base_url + "/transaksi"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getTransaksi()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getTransaksi()
                })
                .catch(error => console.log(error))
        }
    }

    dropTransaksi = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/transaksi/" + selectedItem.id_transaksi
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getTransaksi()
                })
                .catch(error => console.log(error))
        }
    }

    handleDetail = (i, id, e) => {
        e.preventDefault();
        console.log(e.target.value)
        let detail = [...this.state.detail_transaksi]
        detail[i] = { ...detail[i], [id]: e.target.value }
    
        this.setState({detail_transaksi:detail})
      }

    componentDidMount() {
        this.getTransaksi()
        this.getPaket()
        this.getMember()
        this.getUser()
        this.getOutlet()
    }

    render() {
        if (this.state.userData.role === "admin" || this.state.userData.role === "kasir") {
            return (
                <div>
                    <Navbar />
                    <div className="container">
                        <h3 className="text-bold text-info mt-2">Transaksi List</h3>
                        <div className="row">
                            {this.state.transaksi.map(item => (
                                <TransaksiList
                                    key={item.id_transaksi}
                                    id_transaksi={item.id_transaksi}
                                    nama={item.member.nama}
                                    outlet={item.outlet.tempat}
                                    paket={item.detail_transaksi.paket}
                                    status={item.status}
                                    dibayar={item.dibayar}
                                    tgl={item.tgl}
                                    total={item.total}
                                    onEdit={() => this.Edit(item)}
                                    onDrop={() => this.dropTransaksi(item)}
                                />
                            ))}
                        </div>
                        <button className="btn btn-success" onClick={() => this.Add()}>
                            Add Transaksi
                        </button>

                    </div>

                    {/* modal transaksi  */}
                    <div className="modal fade" id="modal_transaksi">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Transaksi</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveTransaksi(ev)}>

                                        <div class="input-group my-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="inputGroupSelect01">Dibayar</label>
                                            </div>
                                            <select class="custom-select" id="inputGroupSelect01" onChange={ev => this.setState({ dibayar: ev.target.value })}>
                                                <option selected>Choose...</option>
                                                <option value="dibayar">dibayar</option>
                                                <option value="belum_dibayar">belum dibayar</option>
                                            </select>
                                        </div>

                                        <div class="input-group my-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="inputGroupSelect01">Status</label>
                                            </div>
                                            <select class="custom-select" id="inputGroupSelect01" onChange={ev => this.setState({ status: ev.target.value })}>
                                                <option selected>Choose...</option>
                                                <option value="baru">baru</option>
                                                <option value="proses">proses</option>
                                                <option value="selesai">selesai</option>
                                                <option value="diambil">diambil</option>
                                            </select>
                                        </div>

                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="inputGroupSelect01">Member</label>
                                            </div>
                                            <select class="custom-select" id="inputGroupSelect01" onChange={ev => this.setState({ id_member: ev.target.value })}>
                                                <option selected>Choose...</option>
                                                {
                                                    this.state.member.map((item, i) => (
                                                        <option value={item.id_member}>{item.nama}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="inputGroupSelect01">Outlet</label>
                                            </div>
                                            <select class="custom-select" id="inputGroupSelect01" onChange={ev => this.setState({id_outlet:ev.target.value})}>
                                                <option selected>Choose...</option>
                                                {
                                                    this.state.outlet.map((item, i) => (
                                                        <option value={item.id_outlet}>{item.tempat}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        Petugas
                                        <input type="text" className="form-control mb-1" disabled
                                            value={this.state.userData.nama}
                                            required
                                        />

                                        {/* mulai detail */}
                                        <b>Detail Paket Dipilih</b>
                                        <div className="mt-3">
                                            <p>Paket 1</p>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text" for="inputGroupSelect01">Paket</label>
                                                </div>
                                                <select class="custom-select" id="inputGroupSelect01" 
                                                value={this.state.detail_transaksi[0].id_paket}
                                                onChange={ev => this.handleDetail(0, "id_paket", ev)}>
                                                    <option selected>Choose...</option>
                                                    {
                                                        this.state.paket.map((item, i) => (
                                                            <option value={item.id_paket}>{item.jenis} / {item.harga}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                            Jumlah kg
                                            <input type="number" className="form-control mb-1"
                                                value={this.state.detail_transaksi[0].qty}
                                                onChange={ev => this.handleDetail(0, "qty", ev)}
                                                required
                                            />
                                        </div>
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
        else {
            return (
                <h1>Access Denied</h1>
            )
        }
    }
}
