import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import web3 from '.././web3';
import contract from '.././contract';

class Home extends Component {
  state = {
    redirectTo: null,
    isAddDataMode: false,
  };

  async handleMetamaskLogin() {
    try {
      // Enable Metamask provider
      await window.ethereum.enable();

      // Get Metamask accounts
      const accounts = await web3.eth.getAccounts();

      console.log("Metamask account:", accounts[0]);

      // Call your contract's Identify method
      const result = await contract.methods.Identify().call({ from: accounts[0] });

      console.log("Contract result:", result);

      // Use withRouter to programmatically redirect the user
      const { history } = this.props;
      switch (result) {
        case "1": // Use string "1" to match the contract result
          history.push("/patient");
          break;
        case "2":
          history.push("/doctor");
          break;
        case "3":
          history.push("/insurancecompany");
          break;
        case "chemist":
          history.push("/chemist");
          break;
        default:
          console.error("Invalid result:", result);
          break;
      }
    } catch (error) {
      console.error("Metamask login error:", error);
    }
  }

  handleAddDataClick() {
    // You can add your logic for handling the "Add Data" button click here
    // For example, you can navigate to a new route or show a form.
    console.log('Add Data button clicked');
  }

  render() {
    return (
      <div id="home-body">
        <br />
        <br />
        <br />
        <br />
        <h2>Sign Up via Metamask</h2>
        {!this.state.isAddDataMode ? (
          <div>
            <button
              onClick={() => this.setState({ isAddDataMode: true })}
              className="btn btn-primary"
            >
              <h4>Add Data</h4>
            </button>
          </div>
        ) : (
          <div>
            {/* Add routes for different user types */}
            <div>
              <NavLink to="/newpatient" className="btn btn-primary">
                <h4>As a Patient</h4>
              </NavLink>
            </div>
            <br />
            <div>
              <NavLink to="/newdoctor" className="btn btn-primary">
                <h4>As a Doctor</h4>
              </NavLink>
            </div>
            <br />
            <div>
              <NavLink to="/newinsurancecompany" className="btn btn-primary">
                <h4>As an Insurance Company</h4>
              </NavLink>
            </div>
            <br />
            <div>
              <NavLink to="/newchemist" className="btn btn-primary">
                <h4>As a Chemist</h4>
              </NavLink>
            </div>
            <br />
            <button
              onClick={() => this.setState({ isAddDataMode: false })}
              className="btn btn-primary"
            >
              <h4>Back</h4>
            </button>
          </div>
        )}
        <h2>Already registered?</h2>
        <button
          onClick={() => this.handleMetamaskLogin()}
          className="btn btn-primary"
        >
          <h4>Login via Metamask</h4>
        </button>
        {this.state.isAddDataMode && (
          <button
            onClick={() => this.handleAddDataClick()}
            className="btn btn-primary"
          >
            <h4>Add Data</h4>
          </button>
        )}
      </div>
    );
  }
}

export default withRouter(Home);

