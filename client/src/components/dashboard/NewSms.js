import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import mentee from './mentee.jpg';

class NewSms extends Component {
  state = {
    sms: {
      recipient: '',
      textmessage: '',
    },
  };

  handleChangesInput = event => {
    const { sms } = this.state;
    // console.log("The handleChangesInput() function was triggered!");
    event.preventDefault();
    this.setState({ sms: { ...sms, recipient: event.target.value } });
  };

  handleChangesTextarea = event => {
    const { sms } = this.state;
    // console.log("The handleChangesTextarea() function was successful!");
    event.preventDefault();
    this.setState({ sms: { ...sms, textmessage: event.target.value } });
  };

  sendSms(event) {
    const { sms } = this.state;

    event.preventDefault();

    const tagline = `***Hi! You've received this SMS from a user who's exploring Tico Thepsourinthone's LATEST Build-Weeks Project at Lambda School! 
		Check out Tico's FUN project for yourself (https://pacific-dusk-14025.herokuapp.com/) and have a BLESSED day!*** || ~TICO'S APP USER~ says, "`;

    if (this.state.sms.recipient === '' || !this.state.sms.recipient) {
      return;
    } else {
      axios
        .get(
          `/api/messages/newsms?recipient=${
            sms.recipient
          }&textmessage=${tagline + sms.textmessage + '"'}`
        )
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });

      this.setState({
        sms: {
          recipient: '',
          textmessage: '',
        },
      });
    }
  }

  render() {
    return (
      <div className='App-container'>
        <Link to='/students' className='btn-flat waves-effect'>
          <i className='material-icons left'>keyboard_backspace</i> Back to
          Students
        </Link>
        <div className='App-content'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Create an Appointment Reminder
          </Typography>
          <Typography
            variant='h6'
            align='center'
            color='textSecondary'
            paragraph
          >
            With appointment reminders, simply enter in your mentee's phone
            number, using this format "xxx-xxx-xxxx", & write out a short
            message for them. Then, click the 'Send SMS' button!
          </Typography>
          <div className='meme-container'>
            <div className='image-container'>
              <img
                className='image'
                src={mentee}
                alt="'Ain't nobody got time for that' meme."
              />
            </div>
          </div>
          <form
            className='new-sms-form'
            onSubmit={event => this.sendSms(event)}
          >
            <div className='phone-number-container'>
              <label className='phone-number-label'>Phone Number:</label>
              <input
                className='phone-number-input'
                type='sms'
                value={this.state.sms.recipient}
                onChange={this.handleChangesInput}
                placeholder='Phone Number'
              />
            </div>
            <div className='message-container'>
              <label className='message-label'>Message:</label>
              <textarea
                type='sms'
                value={this.state.sms.textmessage}
                onChange={this.handleChangesTextarea}
                placeholder='Message'
              />
            </div>
            <button className='send-button' type='submit'>
              Send SMS
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewSms;
