import React from "react"

export default class MemberList extends React.Component{
    render(){
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-3">
                        {/* image */}
                        <img alt={this.props.nama} src={this.props.image} 
                        className="img rounded-circle" width="150" height="150" />
                    </div>
                    <div className="col-sm-7">
                        {/* description */}
                        <h5 className="text-bold">Nama Member: {this.props.nama}</h5>
                        <h6>Alamat Member: {this.props.alamat}</h6>
                        <h6>Jenis Kelamin: {this.props.jenis_kelamin}</h6>
                        <h6>No Telpon: {this.props.telp}</h6>
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