import React from "react";

export default class TransaksiList extends React.Component {
    render() {
        return (
            <div>
                {/* list */}
                <div className="card col-sm-12 my-1">
                    <div className="card-body row">
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-info">Member</small>
                            <h6>{this.props.nama_member}</h6>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-info">Alamat</small>
                            <h6>{this.props.alamat}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-info">Total</small>
                            <h6 className="text-danger">Rp {this.getAmount(this.props.paket)}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-bold text-info">
                                Time: {this.convertTime(this.props.tgl)}
                            </small>
                            <button className="btn btn-sm btn-block btn-success" data-toggle="modal"
                                data-target={`#modalDetail${this.props.id_transaksi}`}>
                                Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* modal component */}
                <div className="modal fade" id={`modalDetail${this.props.id_transaksi}`}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5>Detail of Transaksi</h5>
                            </div>
                            <div className="modal-body">
                                <h5>Member: {this.props.nama_member}</h5>
                                <h6>Time: {this.convertTime(this.props.tgl)}</h6>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Paket</th>
                                            <th>Harga</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.props.paket.map((item, index) => (
                                            <tr key={item.id_paket}>
                                                <td>{`${index + 1}`}</td>
                                                <td>{item.paket.jenis_paket}</td>
                                                <td>Rp {item.paket.harga}</td>
                                                <td>{item.qty}</td>
                                                <td className="text-right">Rp {item.paket.harga * item.qty}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className="text-danger text-bold">
                                                <h4>Total</h4>
                                            </td>
                                            <td className="text-right text-danger text-bold">
                                                <h4>
                                                    Rp {this.getAmount(this.props.paket)}
                                                </h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}