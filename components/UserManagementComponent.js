import ButtonActionTableComponent from './commons/ButtonActionTableComponent';
import ReactTableLayout from '../layouts/SimpleTableLayout';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Lock, LockOpen, Done, Edit } from '@material-ui/icons';
import { Chip, Grid } from '@material-ui/core';
import { reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import FrameHeaderComponent from './FrameHeaderComponent';
import Button from '../layouts/Button';
import AlertDialog from '../layouts/AlertDialog';
import UserActionsComponent from './UserActionsComponent';
import {
  getUsers,
  GetUsersDataSelector,
  banUser,
  unbBanUser,
  AddNewUserResetter,
  AddNewUserDataSelector,
  AddNewUserErrorSelector,
  UpdateUserDataSelector,
  UpdateUserResetter
} from '../stores/userState';
import AvatarComponent from './AvatarComponent';
import DisplayShortenComponent from './commons/DisplayShotenComponent';

const connectWithRedux = connect(
  createStructuredSelector({
    usersData: GetUsersDataSelector,
    addUserSuccessMessage: AddNewUserDataSelector,
    addUserErrorMessage: AddNewUserErrorSelector,
    updateUserSuccessMessage: UpdateUserDataSelector
  }),
  dispatch => ({
    getUsers: (page, size) => dispatch(getUsers({ page, size })),
    banUser: id => dispatch(banUser(id)),
    unBanUser: id => dispatch(unbBanUser(id)),
    resetData: () => {
      dispatch(AddNewUserResetter);
      dispatch(UpdateUserResetter);
    },
    resetAddUserForm: () => dispatch(reset('addNewUser'))
  })
);

const getMemberManagementActions = ({
  id,
  setCurrentIdSelected,
  setIsOpenUpdate
}) => {
  return [
    {
      label: 'Edit User',
      action: () => {
        setIsOpenUpdate(true);
        setCurrentIdSelected(id);
      },
      icon: <Edit />
    }
  ];
};
const COLUMNS = [
  {
    field: 'avatar',
    title: 'Avatar'
  },
  {
    field: 'fullName',
    title: 'Full Name'
  },
  {
    field: 'email',
    title: 'Email'
  },
  {
    field: 'phoneNumber',
    title: 'Phone'
  },

  {
    field: 'createTime',
    title: 'Date Created'
  },
  {
    field: 'status',
    title: 'Status'
  },
  {
    field: 'actions',
    title: 'Actions'
  }
];

const getData = (userData = [], setCurrentIdSelected, setIsOpenUpdate) =>
  userData &&
  userData.map(
    ({ id, avtUrl, email, status: enabled, fullName, phoneNumber }) => ({
      avatar: <AvatarComponent small url={avtUrl} />,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      createTime: fullName,
      status: (
        <Chip
          label={enabled ? 'Active' : 'Disabled'}
          clickable
          color={!enabled ? 'secondary' : 'default'}
          deleteIcon={enabled ? <Done /> : <Lock />}
          style={enabled ? { background: 'green', color: 'white' } : {}}
        />
      ),
      actions: getMemberManagementActions({
        id,
        setCurrentIdSelected,
        setIsOpenUpdate
      }).map(({ label, action, icon }, index) => (
        <ButtonActionTableComponent
          key={index}
          label={label}
          action={action}
          icon={icon}
        />
      ))
    })
  );

const UserManagementComponent = ({
  usersData,
  getUsers,
  addUserSuccessMessage,
  resetData,
  resetAddUserForm,
  updateUserSuccessMessage
}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [currentIdSelected, setCurrentIdSelected] = useState(null);
  useEffect(() => {
    if (addUserSuccessMessage) {
      setIsOpenAdd(false);
      resetData();
      resetAddUserForm();
    }
  }, [addUserSuccessMessage]);

  useEffect(() => {
    if (updateUserSuccessMessage) {
      setIsOpenUpdate(false);
      resetData();
    }
  }, [updateUserSuccessMessage]);

  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (usersData) {
    totalCount = usersData.totalElements;
  }

  return (
    <React.Fragment>
      <AlertDialog
        title="Add new user"
        isOpenDialog={isOpenAdd}
        setIsOpenDialog={setIsOpenAdd}
        isFooter={false}
        size="md"
        fullWidth
        content={<UserActionsComponent />}
      />
      <AlertDialog
        title="Update User"
        isOpenDialog={isOpenUpdate}
        setIsOpenDialog={setIsOpenUpdate}
        isFooter={false}
        size="md"
        fullWidth
        content={
          isOpenUpdate ? (
            <UserActionsComponent isUpdate id={currentIdSelected} />
          ) : null
        }
        onClose={() => {
          setIsOpenUpdate(false);
        }}
      />
      <FrameHeaderComponent title="User management">
        <Button onClick={() => setIsOpenAdd(true)}>Add new user</Button>
      </FrameHeaderComponent>
      <ReactTableLayout
        dispatchAction={getUsers}
        data={getData(
          (usersData || {}).content,
          setCurrentIdSelected,
          setIsOpenUpdate
        )}
        columns={COLUMNS}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
      />
    </React.Fragment>
  );
};

export default connectWithRedux(UserManagementComponent);
