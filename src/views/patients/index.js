import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector } from 'redux/selectors/patients';
import { patients } from 'redux/reducers/patients';
import { DELETE_PATIENT_TEXT } from 'constants/patients';
import Grid from './grid';
import GridMenu from '../../components/grid-menu';
import AddEditDialog from './add-edit-dialog';

const Patients = () => {
  const dispatch = useDispatch();
  const patientsData = useSelector(formattedDataSelector, shallowEqual);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  const handleConfirmRemove = () => {
    dispatch(patients.remove({ selectedRows }));
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(!openDialog);
  };

  const handleRowSelected = (row) => {
    let newSelectedRows;
    if (row.isSelected) {
      newSelectedRows = [...selectedRows, row.data];
    } else {
      newSelectedRows = selectedRows.filter((item) => item.id !== row.data.id);
    }
    setSelectedRows(newSelectedRows);
  };

  useEffect(() => {
    dispatch(patients.get());
  }, []);

  useEffect(() => {
    setSelectedRows([]);
  }, [patientsData]);

  return (
    <>
      <GridMenu
        dialogText={DELETE_PATIENT_TEXT}
        handleConfirmRemove={handleConfirmRemove}
        handleOpenDialog={handleOpenDialog}
        selectedRows={selectedRows}
      />
      <Grid handleRowSelected={handleRowSelected} />
      <AddEditDialog
        dialogType={dialogType}
        handleCloseDialog={handleOpenDialog}
        openDialog={openDialog}
        selectedRows={selectedRows}
      />
    </>
  );
};

export default Patients;
