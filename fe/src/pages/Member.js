import React from "react"
import Navbar from "../component/Navbar"
import MemberList from "../component/MemberList"
import { base_url, image_url } from "../Config.js"
import $ from "jquery"
import axios from "axios"


export default class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            member: [],
            token: "",
            action: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            telp: "",
            image: "",
            uploadFile: true,
            fillPassword: true,
            id_member: "",
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

    Add = () => {
        $("#modal_member").modal("show")
        this.setState({
            action: "insert",
            id_member: 0,
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            telp: "",
            image: null,
            fillPassword: true,
            uploadFile: true
        })
    }


    Edit = selectedItem => {
        $("#modal_member").modal("show")
        this.setState({
            action: "update",
            id_member: selectedItem.id_member,
            nama: selectedItem.nama,
            alamat: selectedItem.alamat,
            jenis_kelamin: selectedItem.jenis_kelamin,
            telp: selectedItem.telp,
            image: null,
            uploadFile: false,
            fillPassword: false,
        })
    }

    saveMember = event => {
        event.preventDefault()
        $("#modal_member").modal("hide")
        let form = new FormData()
        form.append("id_member", this.state.id_member)
        form.append("nama", this.state.nama)
        form.append("alamat", this.state.alamat)
        form.append("jenis_kelamin", this.state.jenis_kelamin)
        form.append("telp", this.state.telp)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/member"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getMember()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getMember()
                })
                .catch(error => console.log(error))
        }
    }

    dropMember = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/member/" + selectedItem.id_member
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMember()
                })
                .catch(error => console.log(error))
        }
    }

    componentDidMount() {
        this.getMember()
    }

    render() {
        if (this.state.user.role == "admin" || this.state.user.role == "kasir") {
            return (
                <div>
                    <Navbar />
                    <div className="container">
                        <h3 className="text-bold text-info mt-2">Member List</h3>
                        <div className="row">
                            {this.state.member.map(item => (
                                <MemberList
                                    key={item.id_member}
                                    nama={item.nama}
                                    alamat={item.alamat}
                                    jenis_kelamin={item.jenis_kelamin}
                                    telp={item.telp}
                                    image={image_url + "/" + item.image}
                                    onEdit={() => this.Edit(item)}
                                    onDrop={() => this.dropMember(item)}
                                />
                            ))}
                        </div>
                        <button className="btn btn-success" onClick={() => this.Add()}>
                            Add Member
                        </button>
                    </div>

                    {/* modal member  */}
                    <div className="modal fade" id="modal_member">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Member</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveMember(ev)}>
                                        Nama Member
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.nama}
                                            onChange={ev => this.setState({ nama: ev.target.value })}
                                            required
                                        />
                                        Alamat
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.alamat}
                                            onChange={ev => this.setState({ alamat: ev.target.value })}
                                            required
                                        />
                                        Jenis Kelamin
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.jenis_kelamin}
                                            onChange={ev => this.setState({ jenis_kelamin: ev.target.value })}
                                            required
                                        />
                                        Telpon
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.telp}
                                            onChange={ev => this.setState({ telp: ev.target.value })}
                                            required
                                        />

                                        {this.state.action === "update" && this.state.uploadFile === false ? (
                                            <button className="btn btn-sm btn-dark mb-1 btn-block"
                                                onClick={() => this.setState({ uploadFile: true })}>
                                                Change Member Image
                                            </button>
                                        ) : (
                                            <div>
                                                Member Image
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
        } else {
            window.alert("Access Denied")
            window.location = '/'
        }
    }
}