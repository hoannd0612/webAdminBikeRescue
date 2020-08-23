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
import { createLink } from '../libs';
import Link from 'next/link';

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
  setIsOpenUpdate,
  banUser,
  unBanUser,
  enabled
}) => {
  return !enabled
    ? [
        {
          label: 'Active Biker',
          action: () => unBanUser(id),
          icon: <LockOpen />
        }
      ]
    : [
        {
          label: 'Edit Biker',
          action: () => {
            setIsOpenUpdate(true);
            setCurrentIdSelected(id);
          },
          icon: <Edit />
        },
        {
          label: 'Disable Biker',
          action: () => banUser(id),
          icon: <Lock />
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
    field: 'status',
    title: 'Status'
  },
  {
    field: 'actions',
    title: 'Actions'
  }
];

const getData = (
  userData = [],
  setCurrentIdSelected,
  setIsOpenUpdate,
  banUser,
  unBanUser
) =>
  userData &&
  userData.map(
    ({
      id,
      avtUrl,
      email,
      status: enabled,
      fullName,
      phoneNumber,
      createdTime
    }) => ({
      avatar: <AvatarComponent small url={avtUrl} />,
      fullName: (
        <Link href={createLink(['biker', `details?id=${id}`])}>
          <a>{fullName}</a>
        </Link>
      ),
      email: email,
      phoneNumber: phoneNumber,
      createTime: createdTime,
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
        setIsOpenUpdate,
        banUser,
        unBanUser,
        enabled
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
  updateUserSuccessMessage,
  banUser,
  unBanUser
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
        title="Add new biker"
        isOpenDialog={isOpenAdd}
        setIsOpenDialog={setIsOpenAdd}
        isFooter={false}
        size="md"
        fullWidth
        content={<UserActionsComponent />}
      />
      <AlertDialog
        title="Update Biker"
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
      <FrameHeaderComponent title="Biker management">
        <Button onClick={() => setIsOpenAdd(true)}>Add new biker</Button>
      </FrameHeaderComponent>
      <ReactTableLayout
        dispatchAction={getUsers}
        data={getData(
          (usersData || {}).content,
          setCurrentIdSelected,
          setIsOpenUpdate,
          banUser,
          unBanUser
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
