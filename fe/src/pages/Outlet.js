import React from "react"
import Navbar from "../component/Navbar"

export default class Outlet extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Navbar />
                <h1>Ini Halaman Outlet</h1>
            </div>
        )
    }
}
