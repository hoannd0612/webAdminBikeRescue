import ButtonActionTableComponent from './commons/ButtonActionTableComponent';
import ReactTableLayout from '../layouts/SimpleTableLayout';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Lock, LockOpen, Done } from '@material-ui/icons';
import { Chip, Grid } from '@material-ui/core';
import { reset } from 'redux-form';
import {
  GetRolesDataSelector,
  getRoles,
  addNewRole,
  AddNewRoleDataSelector,
  AddNewRoleErrorSelector,
  AddNewRoleResetter
} from '../stores/RoleState';
import { createStructuredSelector } from 'reselect';
import FrameHeaderComponent from './FrameHeaderComponent';
import Button from '../layouts/Button';
import AlertDialog from '../layouts/AlertDialog';
import RoleAddingComponent from './RoleAddingComponent';

const connectWithRedux = connect(
  createStructuredSelector({
    rolesData: GetRolesDataSelector,
    addRoleSuccessMessage: AddNewRoleDataSelector,
    addRoleErrorMessage: AddNewRoleErrorSelector
  }),
  dispatch => ({
    getRoles: (page, size) => dispatch(getRoles({ page, size })),
    addNewRole: name => dispatch(addNewRole(name)),
    resetData: () => dispatch(AddNewRoleResetter),
    resetAddRoleForm: () => dispatch(reset('addNewRole'))
  })
);

const getMemberManagementActions = ({ status, id }) => {
  return status
    ? [
        {
          label: 'Active Role',
          action: () => {},
          icon: <LockOpen />
        }
      ]
    : [
        {
          label: 'Disable Role',
          action: () => {},
          icon: <Lock />
        }
      ];
};
const COLUMNS = [
  {
    field: 'name',
    title: 'Role Name'
  },
  {
    field: 'status',
    title: 'Role Status'
  }
  // {
  //   field: 'actions',
  //   title: 'Actions'
  // }
];

const getData = (roles = []) =>
  roles &&
  roles.map(({ name, status, id }) => ({
    name: name,
    status: (
      <Chip
        label={status ? 'Active' : 'Disabled'}
        clickable
        color={!status ? 'secondary' : 'default'}
        deleteIcon={status ? <Done /> : <Lock />}
        style={status ? { background: 'green', color: 'white' } : {}}
      />
    ),
    actions: getMemberManagementActions(
      (status, id)
    ).map(({ label, action, icon }, index) => (
      <ButtonActionTableComponent
        key={index}
        label={label}
        action={action}
        icon={icon}
      />
    ))
  }));

const RoleManagementComponent = ({
  rolesData,
  getRoles,
  addNewRole,
  addRoleSuccessMessage,
  resetData,
  resetAddRoleForm
}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  useEffect(() => {
    if (addRoleSuccessMessage) {
      setIsOpenAdd(false);
      resetData();
      resetAddRoleForm();
    }
  }, [addRoleSuccessMessage]);

  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (rolesData) {
    totalCount = rolesData.totalElements;
  }

  return (
    <React.Fragment>
      {/* <AlertDialog
        title="Add new role"
        isOpenDialog={isOpenAdd}
        setIsOpenDialog={setIsOpenAdd}
        isFooter={false}
        size="xs"
        fullWidth
        content={<RoleAddingComponent />}
      /> */}
      <FrameHeaderComponent title="Role management">
        {/* <Button onClick={() => setIsOpenAdd(true)}>Add new role</Button> */}
      </FrameHeaderComponent>
      <ReactTableLayout
        dispatchAction={getRoles}
        data={getData((rolesData || {}).content)}
        columns={COLUMNS}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
      />
    </React.Fragment>
  );
};

export default connectWithRedux(RoleManagementComponent);
