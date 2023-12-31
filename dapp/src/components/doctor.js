
import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import web3 from '.././web3';
import contract from '.././contract';

class Doctor extends Component {
  state = {
    current: 0,
    makepdv: 0,
    tid: 0,
    ppid: 0,
    pid: 0,
    did: 0,
    digno: '',
    test: '',
    bill: 0,
    tpdate: '',
    date: '',
    dpacn: '',
    precau: '',
    tppacn: 0,
    tpdid: 0,
    tpdiagno: '',
    tptests: '',
    tpbill: 0,
    tpmed: '',
    tptid: 0,
    inkpid: 0,
    inkmed: '',
    adpid: 0,
    addt: '',
    adrs: '',
    drprc: '',
    drtid: [],
  };

  render() {
    return (
      <div id="center-content">
        <div className="sidenav">
          <center><h4>Doctor</h4></center>
          <br></br>
          <center><h6><button onClick={() => {
            this.setState({ current: 1 });
            this.setState({ makepdv: 0 });
          }} className="btn btn-light">Get Treatment Details</button></h6></center>

          <center><h6><button onClick={() => {
            this.setState({ current: 2 });
            this.setState({ makepdv: 0 });
          }} className="btn btn-light">Update Precaution</button></h6></center>

          <center><h6><button onClick={() => {
            this.setState({ current: 3 });
            this.setState({ makepdv: 0 });
          }} className="btn btn-light">Treat Patient</button></h6></center>

          <center><h6><button id="toomuch3" onClick={() => {
            this.setState({ current: 4 });
            this.setState({ makepdv: 0 });
          }} className="btn btn-light">Send Medication to Insurance</button></h6></center>

          <center><h6><button id="toomuch3" onClick={() => {
            this.setState({ current: 5 });
            this.setState({ makepdv: 0 });
          }} className="btn btn-light">Raise Emergency</button></h6></center>
        </div>

        {(this.state.current === 1) ? (
          <form id="gtd" className="abc">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Patient Id</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Patient ID"></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Treatment ID</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Treatment ID"></input>
            </div>
            <div className="aab">
              <button onClick={async (event) => {
                event.preventDefault();
                const accounts = await web3.eth.getAccounts();
                let x = document.querySelector("#gtd");
                this.setState({ ppid: x.elements[0].value, tid: x.elements[1].value });
                x.elements[0].value = '';
                x.elements[1].value = '';

                await contract.methods.getTreatmentDetails(this.state.ppid, this.state.tid)
                  .call({ from: accounts[0] }, (error, result) => {
                    if (!error) {
                      this.setState({
                        pid: result[0],
                        did: result[1],
                        digno: result[2],//web3.utils.hexToAscii(result[2]),
                        test: result[3],//web3.utils.hexToAscii(result[3]),
                        bill: result[4],
                        date: result[5]
                      });
                      this.setState({ makepdv: 1 });
                    }
                    else {
                      console.log("unsuccessful");
                      this.setState({ makepdv: 7 });
                    }
                  })
              }} className="btn btn-primary">Submit</button>
            </div>
          </form>
        ) : (<span></span>)}

        {(this.state.current === 2) ? (
          <form id="udp" className="abc">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Patient Adhar Card No.</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Patient Adhar Card No."></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">New Precaution</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter New Precaution"></input>
            </div>
            <div className="aab">
              <button onClick={async (event) => {
                event.preventDefault();
                const accounts = await web3.eth.getAccounts();
                let x = document.querySelector("#udp");
                this.setState({ dpacn: x.elements[0].value, precau: x.elements[1].value });//web3.utils.asciiToHex(x.elements[1].value)
                x.elements[0].value = '';
                x.elements[1].value = '';
                await contract.methods.UpdatePrecautions(this.state.dpacn, this.state.precau)
                  .send({ from: accounts[0] });
              }} className="btn btn-primary">Submit</button>
            </div>
          </form>
        ) : (<span></span>)}

        {/* More form sections ... */}

        {/* Display sections ... */}
      </div>
    );
  }
}

export default Doctor;
