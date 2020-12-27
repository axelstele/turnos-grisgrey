import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector } from 'redux/selectors/patients';
import { columns } from 'constants/patients';
import sortAlphabeticallyByField from 'utils/arrays';
import GridContainer from 'components/grid-container';

const Grid = ({ handleRowSelected }) => {
  const patientsData = useSelector(formattedDataSelector, shallowEqual);

  return (
    <GridContainer>
      <DataGrid
        checkboxSelection
        columns={columns}
        disableSelectionOnClick
        onRowSelected={handleRowSelected}
        rows={sortAlphabeticallyByField(patientsData, 'surname')}
      />
    </GridContainer>

  );
};

Grid.propTypes = {
  handleRowSelected: PropTypes.func,
};

export default Grid;
