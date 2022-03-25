import React from "react"
import Navbar from "../component/Navbar"
import UserList from "../component/UserList"
import { base_url, image_url } from "../Config.js"
import $ from "jquery"
import axios from "axios"


export default class User extends React.Component {
    constructor() {
        super()
        this.state = {
            user: [],
            token: "",
            action: "",
            nama: "",
            username: "",
            password: "",
            email: "",
            role: "",
            image: "",
            uploadFile: true,
            fillPassword: true,
            id_user: "",
            userData: ""
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            this.state.userData = JSON.parse(localStorage.getItem("user"))
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

    Add = () => {
        $("#modal_user").modal("show")
        this.setState({
            action: "insert",
            id_user: 0,
            nama: "",
            username: "",
            password: "",
            email: "",
            role: "",
            image: null,
            fillPassword: true,
            uploadFile: true
        })
    }


    Edit = selectedItem => {
        $("#modal_user").modal("show")
        this.setState({
            action: "update",
            id_user: selectedItem.id_user,
            nama: selectedItem.nama,
            username: selectedItem.username,
            password: selectedItem.password,
            email: selectedItem.email,
            role: selectedItem.role,
            image: null,
            uploadFile: false,
            fillPassword: false,
        })
    }

    saveUser = event => {
        event.preventDefault()
        $("#modal_user").modal("hide")
        let form = new FormData()
        form.append("id_user", this.state.id_user)
        form.append("nama", this.state.nama)
        form.append("username", this.state.username)
        form.append("password", this.state.password)
        form.append("email", this.state.email)
        form.append("role", this.state.role)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/user"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getUser()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getUser()
                })
                .catch(error => console.log(error))
        }
    }

    dropUser = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/user/" + selectedItem.id_user
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getUser()
                })
                .catch(error => console.log(error))
        }
    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        if (this.state.userData.role === "admin") {
            return (
                <div>
                    <Navbar />
                    <div className="container">
                        <h3 className="text-bold text-info mt-2">User List</h3>
                        <div className="row">
                            {this.state.user.map(item => (
                                <UserList
                                    key={item.id_user}
                                    nama={item.nama}
                                    username={item.username}
                                    password={item.password}
                                    email={item.username}
                                    role={item.role}
                                    image={image_url + "/" + item.image}
                                    onEdit={() => this.Edit(item)}
                                    onDrop={() => this.dropUser(item)}
                                />
                            ))}
                        </div>
                        <button className="btn btn-success" onClick={() => this.Add()}>
                            Add User
                        </button>
                    </div>

                    {/* modal user  */}
                    <div className="modal fade" id="modal_user">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form User</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveUser(ev)}>
                                        Nama
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.nama}
                                            onChange={ev => this.setState({ nama: ev.target.value })}
                                            required
                                        />

                                        Username
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.username}
                                            onChange={ev => this.setState({ username: ev.target.value })}
                                            required
                                        />

                                        Password
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.password}
                                            onChange={ev => this.setState({ password: ev.target.value })}
                                            required
                                        />

                                        <div class="input-group my-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="inputGroupSelect01">Role</label>
                                            </div>
                                            <select class="custom-select" id="inputGroupSelect01" onChange={ev => this.setState({ role: ev.target.value })}>
                                                <option selected>Choose...</option>
                                                <option value="admin">admin</option>
                                                <option value="kasir">kasir</option>
                                                <option value="owner">owner</option>
                                            </select>
                                        </div>

                                        {this.state.action === "update" && this.state.uploadFile === false ? (
                                            <button className="btn btn-sm btn-dark mb-1 btn-block"
                                                onClick={() => this.setState({ uploadFile: true })}>
                                                Change User Image
                                            </button>
                                        ) : (
                                            <div>
                                                User Image
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