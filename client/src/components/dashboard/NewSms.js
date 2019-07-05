import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import Typography from '@material-ui/core/Typography';
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

    const tagline = `Hi! You've received this SMS Appointment Reminder from your mentor on Tico Thepsourinthone's 'Mentors International Training Reminders' App! Your mentor says: "`;

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
            Create an Appointment Reminder
          </Typography>
          <div className='App-content-subheading'>
            <Typography
              variant='h6'
              align='center'
              color='textSecondary'
              paragraph
            >
              Just follow the 3 steps below to make sure your mentee is aware of
              an upcoming appointment!
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
                2) Add a message to the "Message" field, including the date &
                time of their next appointment.
              </Typography>
              <Typography
                variant='h6'
                align='left'
                color='textSecondary'
                paragraph
              >
                3) Then, click the 'Send SMS' button! And Voila!
              </Typography>
            </div>
          </div>
        </div>
        <div className='img-form-container'>
          <div className='image-container'>
            <img
              className='image'
              src={mentee}
              alt='A mentor working with a mentee.'
            />
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
                placeholder='i.e. 123-456-7891'
              />
            </div>
            <div className='message-container'>
              <label className='message-label'>Message:</label>
              <textarea
                type='sms'
                value={this.state.sms.textmessage}
                onChange={this.handleChangesTextarea}
                placeholder='Hi, Ronaldo! Your next appointment with me is on Thursday, June 27, 2019, at 1:15 PM.'
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
