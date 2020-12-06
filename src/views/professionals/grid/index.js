import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector } from 'redux/selectors/professionals';
import { columns } from 'constants/professionals';
import useStyles from './styles';

const Grid = ({ handleRowSelected }) => {
  const classes = useStyles();
  const professionalsData = useSelector(formattedDataSelector, shallowEqual);

  return (
    <div className={classes.container}>
      <DataGrid
        checkboxSelection
        columns={columns}
        onRowSelected={handleRowSelected}
        rows={professionalsData}
      />
    </div>
  );
};

Grid.propTypes = {
  handleRowSelected: PropTypes.func,
};

export default Grid;
