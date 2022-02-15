import React from "react"
import Navbar from "../component/Navbar"
import TransaksiList from "../component/TransaksiList"

export default class Transaksi extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <Navbar />

                <div className="container">
                    <h3 className="text-bold text-info mt-2">Transactions List</h3>
                   
                        <TransaksiList
                        // key = {item.transaksi_id}
                        // transaction_id = {item.transaksi_id}
                        // customer_name = {item.customer.name}
                        // customer_address = {item.customer.address}
                        // time = {item.waktu}
                        // products = {item.detail_transaksi}
                         />
                  
                </div>
            </div>
        )
    }
}
