import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { holidays } from 'redux/reducers/holidays';
import { formattedDataSelector } from 'redux/selectors/holidays';
import { DELETE_HOLIDAY_TEXT } from 'constants/holidays';
import Grid from './grid';
import GridMenu from '../../components/grid-menu';
import AddEditDialog from './add-edit-dialog';

const Holidays = () => {
  const dispatch = useDispatch();
  const holidaysData = useSelector(formattedDataSelector, shallowEqual);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  const handleConfirmRemove = () => {
    dispatch(holidays.remove({ selectedRows }));
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
    dispatch(holidays.get());
  }, []);

  useEffect(() => {
    setSelectedRows([]);
  }, [holidaysData]);

  return (
    <>
      <GridMenu
        dialogText={DELETE_HOLIDAY_TEXT}
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

export default Holidays;
