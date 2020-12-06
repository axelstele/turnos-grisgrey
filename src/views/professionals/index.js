import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { professionals } from 'redux/reducers/professionals';
import { formattedDataSelector } from 'redux/selectors/professionals';
import AddEditDialog from './add-edit-dialog';
import Grid from './grid';
import Menu from './menu';

const Professionals = () => {
  const dispatch = useDispatch();
  const professionalsData = useSelector(formattedDataSelector, shallowEqual);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);

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
    dispatch(professionals.get());
  }, []);

  useEffect(() => {
    setSelectedRows([]);
  }, [professionalsData]);

  return (
    <>
      <Menu handleOpenDialog={handleOpenDialog} selectedRows={selectedRows} />
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

export default Professionals;
