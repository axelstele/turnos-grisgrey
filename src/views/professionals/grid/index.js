import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector } from 'redux/selectors/professionals';
import { columns } from 'constants/professionals';
import GridContainer from 'components/grid-container';

const Grid = ({ handleRowSelected }) => {
  const professionalsData = useSelector(formattedDataSelector, shallowEqual);

  return (
    <GridContainer>
      <DataGrid
        checkboxSelection
        columns={columns}
        onRowSelected={handleRowSelected}
        rows={professionalsData}
      />
    </GridContainer>
  );
};

Grid.propTypes = {
  handleRowSelected: PropTypes.func,
};

export default Grid;
