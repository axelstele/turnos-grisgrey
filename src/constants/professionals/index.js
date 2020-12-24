import React from 'react';
import Lens from '@material-ui/icons/Lens';

export const ADD_PROFESSIONAL_TEXT = 'Agregar profesional';
export const DELETE_PROFFESIONAL_TEXT = '¿Está seguro que desea eliminar el/los profesional/es?';
export const EDIT_PROFESSIONAL_TEXT = 'Editar profesional';

export const columns = [
  {
    field: 'name', headerName: 'Nombre', width: 300,
  },
  { field: 'surname', headerName: 'Apellido', width: 300 },
  {
    field: 'color',
    headerName: 'Color',
    renderCell: (params) => (
      <Lens style={{ color: params.getValue('color') }} />
    ),
    flex: 1,
  },
];
