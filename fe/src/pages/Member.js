import React from "react"
import Navbar from "../component/Navbar"
import MemberList from "../component/MemberList";

export default class Member extends React.Component{
    render(){
        return(
            <div>
            <Navbar />
            <div className="container">
                <h3 className="text-bold text-info mt-2">Customer List</h3>
                <div className="row">
                    
                        <MemberList
                        // key = "1"
                        // name = "1"
                        // phone = "1"
                        // address = "1"
                        // image = "1"
                         />
                   
                </div>
                <button className="btn btn-success" >
                    Add Customer
                </button>
             </div>

              {/* modal customer  */}
              {/* <div className="modal fade" id="modal_customer">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header bg-info text-white">
                              <h4>Form Customer</h4>
                          </div>
                          <div className="modal-body">
                              <form onSubmit={ev => this.saveCustomer(ev)}>
                                  Customer Name
                                  <input type="text" className="form-control mb-1"
                                  value={this.state.name}
                                  onChange={ev => this.setState({name: ev.target.value})}
                                  required
                                  />
                                 Customer Phone
                                  <input type="text" className="form-control mb-1"
                                  value={this.state.phone}
                                  onChange={ev => this.setState({phone: ev.target.value})}
                                  required
                                  />
                                 Customer Address
                                  <input type="text" className="form-control mb-1"
                                  value={this.state.address}
                                  onChange={ev => this.setState({address: ev.target.value})}
                                  required
                                  />
                                 Username
                                  <input type="text" className="form-control mb-1"
                                  value={this.state.username}
                                  onChange={ev => this.setState({username: ev.target.value})}
                                  required
                                  />

                                 { this.state.action === "update" && this.state.uploadFile === false ? (
                                     <button className="btn btn-sm btn-dark mb-1 btn-block"
                                     onClick={() => this.setState({uploadFile: true})}>
                                         Change Customer Image
                                     </button>
                                 ) : (
                                     <div>
                                         Customer Image
                                         <input type="file" className="form-control mb-1"
                                         onChange={ev => this.setState({image: ev.target.files[0]})}
                                         required
                                         />
                                     </div>
                                 ) }

                                 { this.state.action === "update" && this.state.fillPassword === false ? (
                                     <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                     onClick={() => this.setState({fillPassword: true})}>
                                         Change Password
                                     </button>
                                 ) : (
                                     <div>
                                         Password
                                         <input type="password" className="form-control mb-1"
                                         value={this.state.password}
                                         onChange={ev => this.setState({password: ev.target.value})}
                                         required
                                         />
                                     </div>
                                 ) }
                                 <button type="submit" className="btn btn-block btn-success">
                                     Simpan
                                 </button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div> */}
         </div>
        )
    }
}
