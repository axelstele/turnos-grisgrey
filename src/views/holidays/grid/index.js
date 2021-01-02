import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector } from 'redux/selectors/holidays';
import { columns } from 'constants/holidays';
import sortAlphabeticallyByField from 'utils/arrays';
import GridContainer from 'components/grid-container';

const Grid = ({ handleRowSelected }) => {
  const holidaysData = useSelector(formattedDataSelector, shallowEqual);

  return (
    <GridContainer>
      <DataGrid
        checkboxSelection
        columns={columns}
        disableSelectionOnClick
        onRowSelected={handleRowSelected}
        rows={sortAlphabeticallyByField(holidaysData, 'description')}
      />
    </GridContainer>
  );
};

Grid.propTypes = {
  handleRowSelected: PropTypes.func,
};

export default Grid;
