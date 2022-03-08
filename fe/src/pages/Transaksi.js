import React from "react"
import Navbar from "../component/Navbar"
import TransaksiList from "../component/TransaksiList"

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            transaksi: [],
            // paket: [],
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
                            window.alert(error.response.data.message)
                            this.props.history.push("/login")
                        }
                    } else {
                        console.log(error);
                    }
                })
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
            </div>
        )
    }
}
