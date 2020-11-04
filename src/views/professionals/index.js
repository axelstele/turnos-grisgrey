import React, { useState } from 'react';
// import { useSelector, shallowEqual } from 'react-redux';
// import { formattedDataSelector } from 'redux/selectors/professionals';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddProfessionalDialog from './add-professional-dialog';

const Professionals = () => {
  // const professionalsData = useSelector(formattedDataSelector, shallowEqual);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Fab color="primary" aria-label="add" onClick={handleOpenDialog}>
        <AddIcon />
      </Fab>
      <AddProfessionalDialog handleCloseDialog={handleCloseDialog} openDialog={openDialog} />
      {/* <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div> */}
    </>
  );
};

export default Professionals;
