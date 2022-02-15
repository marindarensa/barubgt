import React from "react"
import Navbar from "../component/Navbar"

export default class User extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <Navbar />
                <h1>Ini Halaman User</h1>
            </div>
        )
    }
}
