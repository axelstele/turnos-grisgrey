import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector } from 'redux/selectors/practices';
import { columns } from 'constants/practices';
import sortAlphabeticallyByField from 'utils/arrays';
import GridContainer from 'components/grid-container';

const Grid = ({ handleRowSelected }) => {
  const practicesData = useSelector(formattedDataSelector, shallowEqual);

  return (
    <GridContainer>
      <DataGrid
        checkboxSelection
        columns={columns}
        disableSelectionOnClick
        onRowSelected={handleRowSelected}
        rows={sortAlphabeticallyByField(practicesData, 'description')}
      />
    </GridContainer>

  );
};

Grid.propTypes = {
  handleRowSelected: PropTypes.func,
};

export default Grid;
