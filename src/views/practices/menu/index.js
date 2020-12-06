import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import DeleteDialog from './delete-dialog';

const Menu = ({ handleOpenDialog, selectedRows }) => {
  const classes = useStyles();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleShowDeleteDialog = () => {
    setShowDeleteDialog(!showDeleteDialog);
  };

  return (
    <>
      <div className={classes.container}>
        <Fab aria-label="add" className={classes.icon} onClick={() => handleOpenDialog('add')} size="small">
          <AddIcon />
        </Fab>
        {!!selectedRows.length && (
          <Fab aria-label="delete" className={classes.icon} onClick={handleShowDeleteDialog} size="small">
            <DeleteIcon />
          </Fab>
        )}
        {selectedRows.length === 1 && (
          <Fab aria-label="edit" className={classes.icon} onClick={() => handleOpenDialog('edit')} size="small">
            <EditIcon />
          </Fab>
        )}
      </div>
      <DeleteDialog
        handleShowDeleteDialog={handleShowDeleteDialog}
        selectedRows={selectedRows}
        showDeleteDialog={showDeleteDialog}
      />
    </>
  );
};

Menu.propTypes = {
  handleOpenDialog: PropTypes.func,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
};

export default Menu;
