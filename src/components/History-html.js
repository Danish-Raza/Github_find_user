import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

function CustomizedTable(props) {
  const { classes, removeHandler } = props;
  return (
    <Paper className={classes.root}>
      <div style={{ margin: 20 }}>
        <NavLink to={"/history/form"} className="btn">Create User </NavLink>
      </div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>UserName</CustomTableCell>
            <CustomTableCell align="right">Edit</CustomTableCell>
            <CustomTableCell align="right">Remove</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.owners && props.owners.map((row, index) => (
            <TableRow className={classes.row} key={index}>
              <CustomTableCell component="th" scope="row">
                {row}
              </CustomTableCell>
              <CustomTableCell align="right"><NavLink to={`/history/form/${row}`} className="btn">Edit</NavLink></CustomTableCell>
              <CustomTableCell align="right"><button className="btn" onClick={() => removeHandler(row)}>Remove</button></CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);