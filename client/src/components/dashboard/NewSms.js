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

  sendSms = _ => {
    console.log("Your sms message was sent successfully!");
    const { sms } = this.state;
    //pass variables within the query string
    fetch(`http://localhost:5000/api/messages/newsms?recipient=${sms.recipient}&textmessage=${sms.textmessage}`)
    .catch(err => console.error(err));

    // axios.get('http://jsonplaceholder.typicode.com/todos')
    //   .then(function (response) {
    //     resultElement.innerHTML = generateSuccessHTMLOutput(response);
    //   })
    //   .catch(function (error) {
    //     resultElement.innerHTML = generateErrorHTMLOutput(error);
    //   });  

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
          <h2 className="App-content-heading">Send an Appointment Reminder to Your Student!</h2> 
          <div className="App-images-container">         
            <i className="fas fa-basketball-ball"></i>
            <div className="image-meme-container">
              <img 
                className="image-meme"
                src="https://sayingimages.com/wp-content/uploads/group-texting-aint-nobody-got-time-for-that-text-meme.jpg" 
                alt="'Ain't nobody got time for that' meme."
              />
            </div>            
            <i className="far fa-comments"></i>
          </div>
          <div className="container-recipient">
            <label className="label-recipient">Phone Number:</label>
            <input 
              className="input-recipient"
              type="sms"
              value={this.state.sms.recipient}
              onChange={this.handleChangesInput}
              placeholder="Phone Number"
            />
          </div>
          <div className="container-message">
            <label className="label-message">Message:</label>
            <textarea 
              className="sms-area-message"
              type="sms"
              value={this.state.sms.textmessage}
              onChange={this.handleChangesTextarea}
              placeholder="Message"
            />
          </div>
          <button 
            className="send-button"
            onClick={this.sendSms}
          >
            Send Text
          </button>
        </div>
      </div>
    );
  }
}

export default NewSms;
