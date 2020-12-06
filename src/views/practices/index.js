import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector } from 'redux/selectors/practices';
import { practices } from 'redux/reducers/practices';
import Grid from './grid';
import Menu from './menu';
import AddEditDialog from './add-edit-dialog';

const Practices = () => {
  const dispatch = useDispatch();
  const practicesData = useSelector(formattedDataSelector, shallowEqual);
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
    dispatch(practices.get());
  }, []);

  useEffect(() => {
    setSelectedRows([]);
  }, [practicesData]);

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

export default Practices;
