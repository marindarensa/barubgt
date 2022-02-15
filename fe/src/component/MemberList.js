import React from "react"

export default class MemberList extends React.Component{
    render(){
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-3">
                        {/* image */}
                        <img alt="gambar" src="../image.jpg" 
                        className="img rounded-circle" width="150" height="150" />
                    </div>
                    <div className="col-sm-7">
                        {/* description */}
                        <h5 className="text-bold">Customer Name: Rensa</h5>
                        <h6>Customer Phone: 090920910</h6>
                        <h6>Customer Address: MALANG</h6>
                    </div>
                    <div className="col-sm-2">
                        {/* action */}
                        <button className="btn btn-sm btn-primary btn-block"
                        >
                            Edit
                        </button>

                        <button className="btn btn-sm btn-danger btn-block"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}