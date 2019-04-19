import React, { Component } from 'react';
import '../../App.css';

class NewSms extends Component {
  state = {
    text: {
      recipient: '',
      textmessage: ''
    }
  };

  handleChangesInput = e => {
    const { text } = this.state;
    // console.log("The handleChangesInput() function was triggered!");
    e.preventDefault();
    this.setState({ text: {...text, recipient: e.target.value}});
  }

  handleChangesTextarea = e => {
    const { text } = this.state;
    // console.log("The handleChangesTextarea() function was successful!");
    e.preventDefault();
    this.setState({ text: {...text, textmessage: e.target.value}});
  }

  sendText = _ => {
    console.log("Your text message was sent successfully!");
    const { text } = this.state;
    //pass variables within the query string
    fetch(`http://localhost:5000/api/messages/newsms?recipient=${text.recipient}&textmessage=${text.textmessage}`)
    .catch(err => console.error(err));

    this.setState({
      text: {
        recipient: '',
        textmessage: ''
      }
    });
  }

  render() {
    return (
      <div className="App-container">
        <h1 className="App-title">Send an Appointment Reminder to Your Student</h1>
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
              type="text"
              value={this.state.text.recipient}
              onChange={this.handleChangesInput}
              placeholder="Phone Number"
            />
          </div>
          <div className="container-message">
            <label className="label-message">Message:</label>
            <textarea 
              className="text-area-message"
              type="text"
              value={this.state.text.textmessage}
              onChange={this.handleChangesTextarea}
              placeholder="Message"
            />
          </div>
          <button 
            className="send-button"
            onClick={this.sendText}
          >
            Send Text
          </button>
        </div>
      </div>
    );
  }
}

export default NewSms;
