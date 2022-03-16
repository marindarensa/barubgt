import React from "react"
import "../App.css"
import axios from "axios"
import { base_url } from "../Config"
import { event } from "jquery"

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: false,
            token: "",
        };
        // dapetin token dari localstorage
        // if (localStorage.getItem("token")) {
        //     this.state.token = localStorage.getItem("token");
        //     window.location = "/";
        // }
    }

    Login = (event) => {
        event.preventDefault(); // menghilangkan effect refreshpage

        let data = {
            username: this.state.username,
            password: this.state.password,
        };

        let url = "http://localhost:4000/api/user/auth";

        axios
            .post(url, data)
            .then((response) => {
                this.setState({
                    logged: response.data.logged,
                });
                if (this.state.logged) {
                    let user = response.data.data;
                    let token = response.data.token;

                    // set to local storage
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);

                    // redirect
                    // this.props.history.push("/dashboard")
                    window.location = "/";
                } else {
                    this.setState({
                        message: response.data.message,
                    });
                    // alert(this.state.message);
                }
            })
            .catch((error) => console.log(error));
    };

    render() {
        return (
            <div className="maincontainer">
                <div class="container-fluid">
                    <div class="row no-gutter">
                        <div class="col-md-6 d-none d-md-flex bg-image"></div>

                        <div class="col-md-6 bg-light">
                            <div class="login d-flex align-items-center py-5">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-10 col-xl-7 mx-auto">
                                            <h3 class="display-4">MR Laundry</h3>
                                            <p class="text-muted mb-4">Terjamin bersihnya!</p>
                                            <form onSubmit={(ev) => this.Login(ev)}>
                                                <div class="form-group mb-3">
                                                    <input
                                                        id="username"
                                                        type="username"
                                                        placeholder="Username"
                                                        name="username"
                                                        value={this.state.username}
                                                        onChange={(ev) =>
                                                            this.setState({ username: ev.target.value })
                                                        }
                                                        required=""
                                                        autofocus=""
                                                        class="form-control rounded-pill border-0 shadow-sm px-4"
                                                    />
                                                </div>
                                                <div class="form-group mb-3">
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={this.state.password}
                                                        onChange={(ev) =>
                                                            this.setState({ password: ev.target.value })
                                                        }
                                                        required=""
                                                        class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                                >
                                                    Sign in
                                                </button>
                                                <div class="text-center d-flex justify-content-between mt-4">
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;