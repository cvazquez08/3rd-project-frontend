import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // this comes from req.body.(name of each input feild)
      fullName: "",
      email: "",
      originalPassword: "",
      message: null,
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/signup", // MANDATORY => which route from backend
        this.state, // MANDAOTRY => what are you sending to backend (POST ROUTE MUST SEND SOME DATA TO BACKEND)
        { withCredentials: true } // optional: credentials = true CORS
      )
      .then(responseFromServer => {
        // console.log("Response is: ", responseFromServer);
        const { userDoc } = this.responseFromServer.data;
        this.props.onUserChange(userDoc);
      })
      .catch(error => {
        // console.log("Error while signup: ", error);
        if(error.response && error.response.data){
          return this.setState({message: error.response.data.message })
        }
      });
  }

  render() {
    if(this.props.currentUser){
        return( 
          <section>
            <h2> You are signed in already</h2>
            <p>Welcome, {this.props.currentUser.fullName}! 
                Your email is: {this.props.currentUser.email} </p>

          </section>
        )
    }
    return (
      <section>
        <h2> Sign Up </h2>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label> Full Name </label>
          <input
            value={this.state.fullName}
            onChange={event => this.genericSync(event)}
            type="text"
            name="fullName"
            placeholder="John Smith"
          />
          <label> Email </label>
          <input
            value={this.state.email}
            onChange={event => this.genericSync(event)}
            type="email"
            name="email"
            placeholder="John.Smith@gmail.com"
          />
          <label> Password </label>
          <input
            value={this.state.originalPassword}
            onChange={event => this.genericSync(event)}
            type="password"
            name="originalPassword"
            placeholder="**********"
          />
          <button> Sign Up </button>
        </form>
        {/* if message !=null then display */}
        { this.state.message && <div> { this.state.message } </div>}
      </section>
    );
  }
}

export default Signup;
