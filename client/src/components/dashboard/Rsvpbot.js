import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

function Rsvpbot(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <div className='students-nav-bar'>
        <Link
          to='/students'
          className='btn-flat waves-effect back-to-students-link'
        >
          <i className='material-icons left'>keyboard_backspace</i> Back to
          Students
        </Link>
      </div>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              RSVP BOT
            </Typography>
            <Typography
              variant='h6'
              align='center'
              color='textSecondary'
              paragraph
            >
              Want to know how many clients will be attending your mentor
              session DAYS before you have it? Let our RSVP bot do all the heavy
              lifting for you! Simply, create a new SMS and send a text to your
              class. Then, have each student respond with 'RSVP' as a reply to
              your text to deploy RSVP bot. And voila!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify='center' />
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40} />
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant='h6' align='center' gutterBottom>
          Mentors International ©
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='textSecondary'
          component='p'
        >
          Lambda School Build Week April 15-19
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Rsvpbot.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rsvpbot);
