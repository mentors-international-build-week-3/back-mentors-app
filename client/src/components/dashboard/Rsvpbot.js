import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import Typography from '@material-ui/core/Typography';
import rsvpbot from './rsvpbot.jpg';

class Rsvpbot extends Component {
  state = {
    sms: {
      recipient: '',
      textmessage:
        'Please reply to this text message with "RSVP" to reserve your spot with our chat bot now!',
    },
  };

  handleChangesInput = event => {
    const { sms } = this.state;
    // console.log("The handleChangesInput() function was triggered!");
    event.preventDefault();
    this.setState({ sms: { ...sms, recipient: event.target.value } });
  };

  rsvpAlert = () => {
    setTimeout(function() {
      alert(`Your RSVP bot has been deployed!`);
    }, 2000);
  };

  sendSms(event) {
    const { sms } = this.state;

    event.preventDefault();

    const rsvp_tagline = `Hi! You've received this RSVP request from your mentor on Tico Thepsourinthone's 'Mentors International Training Reminders' App!`;

    if (this.state.sms.recipient === '' || !this.state.sms.recipient) {
      return;
    } else {
      axios
        .get(
          `/api/messages/newsms?recipient=${
            sms.recipient
          }&textmessage=${rsvp_tagline + sms.textmessage}`
        )
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });

      this.rsvpAlert();

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
        <div className='students-nav-bar'>
          <Link
            to='/students'
            className='btn-flat waves-effect back-to-students-link'
          >
            <i className='material-icons left'>keyboard_backspace</i> Back to
            Students
          </Link>
        </div>
        <div className='App-content'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Deploy the RSVP Bot
          </Typography>
          <div className='App-content-subheading'>
            <Typography
              variant='h6'
              align='center'
              color='textSecondary'
              paragraph
            >
              To deploy the RSVP Bot, just follow the steps below!
            </Typography>
            <div className='steps-new-sms'>
              <Typography
                variant='h6'
                align='left'
                color='textSecondary'
                paragraph
              >
                1) Enter your mentee's phone number into the "Phone Number"
                field below.
              </Typography>
              <Typography
                variant='h6'
                align='left'
                color='textSecondary'
                paragraph
              >
                2) Then, click the 'Deploy Bot' button! That's it!
              </Typography>
            </div>
          </div>
        </div>
        <div className='img-form-container'>
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
                placeholder='i.e. 123-456-7891'
              />
            </div>
            <button className='send-button' type='submit'>
              Deploy Bot
            </button>
          </form>
          <div className='rsvpbot-image-container'>
            <img
              className='image'
              src={rsvpbot}
              alt='A mentor working with a mentee.'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Rsvpbot;
