import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MediaCard from './MediaCard';

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Students(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Link to='/dashboard' className='btn-flat waves-effect'>
        <i className='material-icons left'>keyboard_backspace</i> Back to home
      </Link>
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
              Students
            </Typography>
            <Typography
              variant='h6'
              align='center'
              color='textSecondary'
              paragraph
            >
              Now, with text reminders, you can give your students a heads up on
              their next mentoring session to improve their attendance. That's
              not all! Try using our new SMS chatbot to get a RSVP count for a
              future mentor session!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify='center'>
                <Grid item>
                  <Link
                    to='/newsms'
                    href='/newsms'
                    style={{
                      width: '150px',
                      borderRadius: '3px',
                      letterSpacing: '1.5px',
                      margin: '1rem',
                    }}
                    className='btn btn-large waves-effect waves-light hoverable pink accent-5'
                  >
                    New SMS
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to='/rsvpbot'
                    href='/rsvpbot'
                    style={{
                      width: '150px',
                      borderRadius: '3px',
                      letterSpacing: '1.5px',
                      margin: '1rem',
                    }}
                    className='btn btn-large waves-effect waves-light hoverable purple accent-5'
                  >
                    RSVP bot
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
            {cards.map(card => (
              <Grid item key={card} sm={6} md={4} lg={3}>
                <MediaCard />
              </Grid>
            ))}
          </Grid>
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

Students.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Students);
