import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

let counter = 0;
function createData(message, menteefirstName, menteeLastName, group, RSVP) {
  counter += 1;
  return { id: counter, message, menteefirstName, menteeLastName, group, RSVP };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'message', numeric: false, disablePadding: true, label: 'Message' },
  {
    id: 'menteefirstName',
    numeric: true,
    disablePadding: false,
    label: "Recipient's First Name",
  },
  {
    id: 'menteeLastName',
    numeric: true,
    disablePadding: false,
    label: "Recipient's Last Name",
  },
  { id: 'group', numeric: true, disablePadding: false, label: 'Group' },
  { id: 'RSVP', numeric: true, disablePadding: false, label: 'RSVP' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title='Sort'
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color='inherit' variant='subtitle1'>
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant='h6' id='tableTitle'>
            ***FOR PRESENTATIONAL PURPOSES ONLY***
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title='Delete'>
            <IconButton aria-label='Delete'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Filter list'>
            <IconButton aria-label='Filter list'>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Messages extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'menteefirstName',
    selected: [],
    data: [
      createData(
        '!Hola, mi BroMigo! ?Como estas, BroChacho? ?Porque NADAAAAAAAAAA?',
        'Julian',
        'Moreno',
        'Cohort',
        '1'
      ),
      createData(
        'Hey, B-Dawg! How much can you bench press now?',
        'Brandon',
        'Gardner',
        'Cohort',
        '0'
      ),
      createData(
        'Dang, dude! How much bread are you making from working on Saturdays at the bakery?',
        'Ryan',
        'Clark',
        'Cohort',
        '0'
      ),
      createData(
        "You're making more bread than Kanye West (insert emoji with large eyes here)!",
        'Ryan',
        'Clark',
        'Cohort',
        '0'
      ),
      createData(
        'Did Ryan Hamblin REALLY say that Web17 was the best cohort to ever come through Lambda???',
        'Jake',
        'Thomas',
        'PM',
        '1'
      ),
      createData(
        "C'mon, Jamie! You know you can't use your ACTUAL cat for 'Rubber Ducky Debugging,' right?",
        'Jamie',
        'Goodnight',
        'PM',
        '1'
      ),
      createData(
        'Are you serious about waving the ISA for my PM group, Austen??? Thanks, man!!',
        'Austen',
        'Allred',
        'CEO',
        '0'
      ),
      createData(
        "Have you heard Dustin's new pre-lecture playlist?!? It's like 'Techno' and 'Star Wars' had a baby!",
        'Lowell',
        'Richardson',
        'Cohort',
        '0'
      ),
      createData(
        "Oh, my bad! I thought you meant 'bread', as in the slang-term for 'money' (insert shrug emoji here). LOL.",
        'Ryan',
        'Clark',
        'Cohort',
        '0'
      ),
      createData(
        "Dude, Mikaela just posted a puke vid in the pomodoro-hack channel from last weekend's half-marathon! Dope!",
        'Jake',
        'Thomas',
        'PM',
        '1'
      ),
      createData(
        'BIG KNELL-Y KNELL! If I pay you in Bitcoin, would you be willing to perform a drop-thumb banjo solo at my birthday party?',
        'Josh',
        'Knell',
        'Instructor',
        '1'
      ),
      createData(
        'Hey, Luis, when my airtable form throws an error and fails to submit, does it go to some sort of SQL-purgatory or nahhh???',
        'Luis',
        'Hernandez',
        'Instructor',
        '0'
      ),
      createData(
        "Do people still make ring-tones for their phones? Because I just made a DOPE one of Luis saying, 'SUUUUCCCCCCEEEESSSSSSSSSSSSSSSSS'!",
        'Julian',
        'Moreno',
        'Cohort',
        '1'
      ),
      createData(
        "What do you mean the new Lambda School 'Tiger-Woods-Victory-Red-Masters-Edition' golf polo swag is SOLD OUT already??? Say it ain't so, HOLDY!!",
        'Ryan',
        'Holdaway',
        'Staff',
        '0'
      ),
    ],
    page: 0,
    rowsPerPage: 10,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <Link to='/dashboard' className='btn-flat waves-effect'>
          <i className='material-icons left'>keyboard_backspace</i> Back to home
        </Link>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role='checkbox'
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component='th' scope='row' padding='none'>
                        {n.message}
                      </TableCell>
                      <TableCell align='right'>{n.menteefirstName}</TableCell>
                      <TableCell align='right'>{n.menteeLastName}</TableCell>
                      <TableCell align='right'>{n.group}</TableCell>
                      <TableCell align='right'>{n.RSVP}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

Messages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Messages);
