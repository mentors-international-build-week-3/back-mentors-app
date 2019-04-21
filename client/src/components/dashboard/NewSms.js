import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../App.css';

class NewSms extends Component {

  state = {
    sms: {
      recipient: '',
      textmessage: ''
    }
  };

  handleChangesInput = e => {
    const { sms } = this.state;
    // console.log("The handleChangesInput() function was triggered!");
    e.preventDefault();
    this.setState({ sms: {...sms, recipient: e.target.value}});
  }

  handleChangesTextarea = e => {
    const { sms } = this.state;
    // console.log("The handleChangesTextarea() function was successful!");
    e.preventDefault();
    this.setState({ sms: {...sms, textmessage: e.target.value}});
  }

  sendSms = e => {
    const { sms } = this.state;

    e.preventDefault();
	const tagline = `*** Hi! You've received this text message from a user who's exploring Tico Thepsourinthone's LATEST Build-Weeks Project at Lambda School! 
		See how AWESOME this app is for yourself at https://pacific-dusk-14025.herokuapp.com/ !*** MESSAGE FROM APP USER: `;

    axios.post(`http://localhost:5000/api/messages/newsms?recipient=${sms.recipient}&textmessage=${tagline + '"' + sms.textmessage + '"'}`)
      .then(res => {
        console.log(this.state.sms.textmessage);
      })
      .catch(error => {
        console.log(error);
      });

      this.setState({
        sms: {
          recipient: '',
          textmessage: ''
        }
    });
  }

  render() {
    return (
      <div className="App-container">
        <Link to="/students" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i> Back to
            Students                      
        </Link>
        <div className="App-content">
          <h2 className="App-content-heading">Create an Appointment Reminder for Your Client!</h2> 
          <div className="meme-container">         
            <div className="image-container">
              <img 
                className="image"
                src="https://sayingimages.com/wp-content/uploads/group-texting-aint-nobody-got-time-for-that-text-meme.jpg" 
                alt="'Ain't nobody got time for that' meme."
              />
            </div>            
          </div>
		  <form className="new-sms-form" onSubmit={this.sendSms}>
			<div className="phone-number-container">
				<label className="phone-number-label">Phone Number:</label>
				<input 
				className="phone-number-input"
				type="sms"
				value={this.state.sms.recipient}
				onChange={this.handleChangesInput}
				placeholder="Phone Number"
				/>
			</div>
			<div className="message-container">
				<label className="message-label">Message:</label>
				<textarea 
					type="sms"
					value={this.state.sms.textmessage}
					onChange={this.handleChangesTextarea}
					placeholder="Message"
				/>
			</div>
			<button 
				className="send-button"
				type="submit"
			>
				Send SMS
			</button>			  
		  </form>
        </div>
      </div>
    );
  }
}

export default NewSms;
