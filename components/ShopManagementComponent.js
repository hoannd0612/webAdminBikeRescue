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
import {
  GetShopOwnersDataSelector,
  getShopOwners,
  AddNewShopOwnerDataSelector,
  AddNewShopOwnerResetter,
  DeleteShopOwnerResetter,
  UpdateShopOwnerDataSelector,
  UpdateShopOwnerResetter,
  AddNewServiceDataSelector,
  UpdateServiceDataSelector,
  AddNewServiceResetter,
  UpdateServiceResetter
} from '../stores/ShopState';
// import ShopOwnerAddingComponent from './ShopOwnerAddingComponent';
import ServiceActionComponent from './ServiceActionComponent';
import ShortenContentComponent from './commons/ShortenContentComponent';
import RatingComponent from './commons/RatingComponent';
import Link from 'next/link';
import { createLink } from '../libs';
import AvatarComponent from './AvatarComponent';
import RLink from '../layouts/RLink';
import ShopActionsComponent from './ShopActionsComponent';

const connectWithRedux = connect(
  createStructuredSelector({
    shopOwnerData: GetShopOwnersDataSelector,
    addShopOwnerSuccessMessage: AddNewShopOwnerDataSelector,
    updateShopOwnerData: UpdateShopOwnerDataSelector
  }),
  dispatch => ({
    getShopOwners: (page, pageSize) =>
      dispatch(getShopOwners({ page, pageSize })),
    resetData: () => {
      dispatch(AddNewServiceResetter);
      dispatch(UpdateServiceResetter);
    },
    resetAddShopOwnerForm: () => dispatch(reset('addNewShopOwner'))
  })
);

const getActions = ({ status, id, setCurrentIdSelected, setIsOpenUpdate }) => {
  return !status
    ? [
        {
          label: 'Edit shop',
          action: () => {
            setIsOpenUpdate(true);
            setCurrentIdSelected(id);
          },
          icon: <Edit />
        }
      ]
    : [
        {
          label: 'Edit shop',
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
  // {
  //   field: 'owner',
  //   title: 'Owner'
  // },
  {
    field: 'phoneNumber',
    title: 'Phone'
  },
  // {
  //   field: 'description',
  //   title: 'Description'
  // },
  {
    field: 'status',
    title: 'Status'
  },
  {
    field: 'actions',
    title: 'Actions'
  }
];

const getData = ({
  shopOwnerData = [],
  setCurrentIdSelected,
  setIsOpenUpdate
}) =>
  shopOwnerData &&
  shopOwnerData.map(
    ({
      avtUrl,
      fullName,
      status,
      id,
      email,
      address,
      phoneNumber,
      user = {}
    }) => ({
      avatar: <AvatarComponent small url={avtUrl} />,
      fullName: (
        <Link href={createLink(['shop-owner', `details?id=${id}`])}>
          <a>{fullName}</a>
        </Link>
      ),
      owner: (user || {}).fullName,
      phoneNumber: phoneNumber,
      email: email,
      address: <ShortenContentComponent content={address} />,
      status: (
        <Chip
          label={status ? 'Active' : 'Disabled'}
          clickable
          color={!status ? 'secondary' : 'default'}
          deleteIcon={status ? <Done /> : <Lock />}
          style={status ? { background: 'green', color: 'white' } : {}}
        />
      ),
      actions: getActions({
        status,
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

const ShopOwnerManagementComponent = ({
  shopOwnerData,
  getShopOwners,
  addShopOwnerSuccessMessage,
  resetData,
  resetAddShopOwnerForm,
  updateShopOwnerData
}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [currentIdSelected, setCurrentIdSelected] = useState(null);

  useEffect(() => {
    if (addShopOwnerSuccessMessage) {
      setIsOpenAdd(false);
      resetData();
      resetAddShopOwnerForm();
    }
  }, [addShopOwnerSuccessMessage]);

  useEffect(() => {
    if (updateShopOwnerData) {
      setIsOpenUpdate(false);
      resetData();
    }
  }, [updateShopOwnerData]);

  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (shopOwnerData) {
    totalCount = shopOwnerData.totalElements;
  }

  return (
    <React.Fragment>
      <AlertDialog
        title="Add new Shop Owner"
        isOpenDialog={isOpenAdd}
        setIsOpenDialog={setIsOpenAdd}
        isFooter={false}
        size="md"
        fullWidth
        content={isOpenAdd ? <ShopActionsComponent /> : null}
      />
      <AlertDialog
        title="Update Shop Owner"
        isOpenDialog={isOpenUpdate}
        setIsOpenDialog={setIsOpenUpdate}
        isFooter={false}
        size="md"
        fullWidth
        content={
          isOpenUpdate ? (
            <ShopActionsComponent isUpdate id={currentIdSelected} />
          ) : null
        }
        onClose={() => {
          setIsOpenUpdate(false);
        }}
      />
      <FrameHeaderComponent title="Shop Owner management">
        <Button onClick={() => setIsOpenAdd(true)}>Add new shop owner</Button>
      </FrameHeaderComponent>
      <ReactTableLayout
        dispatchAction={getShopOwners}
        data={getData({
          shopOwnerData: (shopOwnerData || {}).content || [],
          setCurrentIdSelected,
          setIsOpenUpdate
        })}
        columns={COLUMNS}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
      />
    </React.Fragment>
  );
};

export default connectWithRedux(ShopOwnerManagementComponent);
