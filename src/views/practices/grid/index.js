import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector } from 'redux/selectors/practices';
import { columns } from 'constants/practices';
import useStyles from './styles';

const Grid = ({ handleRowSelected }) => {
  const classes = useStyles();
  const practicesData = useSelector(formattedDataSelector, shallowEqual);

  return (
    <div className={classes.container}>
      <DataGrid
        checkboxSelection
        columns={columns}
        onRowSelected={handleRowSelected}
        rows={practicesData}
      />
    </div>
  );
};

Grid.propTypes = {
  handleRowSelected: PropTypes.func,
};

export default Grid;
