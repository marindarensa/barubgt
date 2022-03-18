import React from "react";

export default class TransaksiList extends React.Component {
    getAmount = paket => {
        let total = 0
        // console.log(paket)
        // paket.map(it => {
        //     total += Number(it.paket.harga) * Number(it.qty)
        // })
        return total
    }

    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()} `
    }

    render() {
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-10">
                        {/* description */}
                        <h5 className="text-bold">Nama member: {this.props.nama}</h5>
                        <h6>Outlet: {this.props.outlet}</h6>
                        <h6>Status: {this.props.status}</h6>
                        <h6>Pembayaran: {this.props.dibayar}</h6>
                        <h6>Tanggal: {this.convertTime(this.props.tgl)}</h6>
                        <h6>Total: Rp {this.getAmount(this.props.paket)}</h6>
                    </div>
                    <div className="col-sm-2">
                        {/* action */}
                        <button className="btn btn-sm btn-primary btn-block"
                            onClick={this.props.onEdit}>
                            Edit
                        </button>

                        <button className="btn btn-sm btn-danger btn-block"
                            onClick={this.props.onDrop}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}