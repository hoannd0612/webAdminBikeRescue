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
  GetServicesDataSelector,
  getServices,
  DeleteServiceResetter,
  AddNewServiceDataSelector,
  UpdateServiceDataSelector,
  AddNewServiceResetter,
  UpdateServiceResetter,
  updateService,
  getCategories,
  GetCategoriesDataSelector,
  getServiceByCategoryId,
  GetServiceByCategoryIdDataSelector
} from '../stores/CategoryState';
import ServiceActionComponent from './ServiceActionComponent';
import Link from 'next/link';
import { createLink } from '../libs';
import DisplayShortenComponent from './commons/DisplayShotenComponent';
import SelectLayout from '../layouts/SelectLayout';

const connectWithRedux = connect(
  createStructuredSelector({
    servicesData: GetServiceByCategoryIdDataSelector,
    addServiceSuccessMessage: AddNewServiceDataSelector,
    updateServiceData: UpdateServiceDataSelector,
    categoryData: GetCategoriesDataSelector
  }),
  dispatch => ({
    getServices: id => dispatch(getServiceByCategoryId(id)),
    resetData: () => {
      dispatch(AddNewServiceResetter);
      dispatch(UpdateServiceResetter);
    },
    resetAddServiceForm: () => dispatch(reset('addNewService')),
    activeService: (values = {}) =>
      dispatch(
        updateService({
          ...values,
          status: true,
          categoryId: (values.category || {}).id
        })
      ),
    disableService: values =>
      dispatch(
        updateService({
          ...values,
          status: false,
          categoryId: (values.category || {}).id
        })
      ),
    getAllCategory: () => dispatch(getCategories())
  })
);

const getActions = ({
  status,
  id,
  setCurrentIdSelected,
  setIsOpenUpdate,
  activeService,
  disableService,
  service
}) => {
  return !status
    ? [
        {
          label: 'Active Service',
          action: () => activeService(service),
          icon: <LockOpen />
        }
      ]
    : [
        {
          label: 'Edit Service',
          action: () => {
            setIsOpenUpdate(true);
            setCurrentIdSelected(id);
          },
          icon: <Edit />
        },
        {
          label: 'Disable Service',
          action: () => disableService(service),
          icon: <Lock />
        }
      ];
};

const COLUMNS = [
  {
    field: 'name',
    title: 'Service Name'
  },
  {
    field: 'unit',
    title: 'Service Unit'
  },
  {
    field: 'status',
    title: 'Service Status'
  },
  {
    field: 'actions',
    title: 'Actions'
  }
];

const getData = ({
  servicesData = [],
  setCurrentIdSelected,
  setIsOpenUpdate,
  activeService,
  disableService
}) =>
  servicesData &&
  servicesData.map(service => ({
    name: service.serviceName,
    unit: service.unit,
    category: (service.category || {}).categoryName,
    description: (
      <DisplayShortenComponent>{service.description}</DisplayShortenComponent>
    ),
    status: (
      <Chip
        label={service.status ? 'Active' : 'Disabled'}
        clickable
        color={!service.status ? 'secondary' : 'default'}
        deleteIcon={service.status ? <Done /> : <Lock />}
        style={service.status ? { background: 'green', color: 'white' } : {}}
      />
    ),
    actions: getActions({
      status: service.status,
      id: service.id,
      setCurrentIdSelected,
      setIsOpenUpdate,
      activeService,
      disableService,
      service
    }).map(({ label, action, icon }, index) => (
      <ButtonActionTableComponent
        key={index}
        label={label}
        action={action}
        icon={icon}
      />
    ))
  }));

const ServiceManagementComponent = ({
  servicesData,
  getServices,
  addServiceSuccessMessage,
  resetData,
  resetAddServiceForm,
  updateServiceData,
  activeService,
  disableService,
  getAllCategory,
  categoryData
}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [currentIdSelected, setCurrentIdSelected] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  useEffect(() => {
    if (!!categoryData) {
      setCategoryId(categoryData[0].id);
      localStorage.setItem('_category_id_with_service', categoryData[0].id);
    }
  }, [categoryData]);

  useEffect(() => {
    getServices(categoryId);
  }, [categoryId]);

  useEffect(() => {
    if (addServiceSuccessMessage) {
      setIsOpenAdd(false);
      resetData();
      resetAddServiceForm();
    }
  }, [addServiceSuccessMessage]);

  useEffect(() => {
    if (updateServiceData) {
      setIsOpenUpdate(false);
      resetData();
    }
  }, [updateServiceData]);

  let selectOptions = [];
  if (categoryData) {
    selectOptions = categoryData.map(category => ({
      value: category.id,
      label: category.categoryName
    }));
  }

  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (servicesData) {
    totalCount = servicesData.totalElements;
  }

  return (
    <React.Fragment>
      <AlertDialog
        title="Add new service"
        isOpenDialog={isOpenAdd}
        setIsOpenDialog={setIsOpenAdd}
        isFooter={false}
        size="xs"
        fullWidth
        content={
          isOpenAdd ? (
            <ServiceActionComponent categoryData={categoryData || []} />
          ) : null
        }
      />
      <AlertDialog
        title="Update service"
        isOpenDialog={isOpenUpdate}
        setIsOpenDialog={setIsOpenUpdate}
        isFooter={false}
        size="xs"
        fullWidth
        content={
          isOpenUpdate ? (
            <ServiceActionComponent
              categoryData={categoryData || []}
              isUpdate
              id={currentIdSelected}
            />
          ) : null
        }
        onClose={() => {
          setIsOpenUpdate(false);
        }}
      />
      <FrameHeaderComponent title="Service management">
        <div>
          <Grid container alignItems="center">
            Filter by category:{' '}
            <SelectLayout
              onChange={event => {
                localStorage.setItem(
                  '_category_id_with_service',
                  event.target.value
                );
                setCategoryId(event.target.value);
              }}
              value={categoryId}
              options={selectOptions}
            />{' '}
            <Button onClick={() => setIsOpenAdd(true)}>Add new service</Button>
          </Grid>
        </div>
      </FrameHeaderComponent>
      <ReactTableLayout
        hasPaging={false}
        dispatchExCondition={[categoryId]}
        dispatchAction={getServices}
        data={getData({
          servicesData: servicesData || [],
          setCurrentIdSelected,
          setIsOpenUpdate,
          activeService,
          disableService
        })}
        columns={COLUMNS}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
      />
    </React.Fragment>
  );
};

export default connectWithRedux(ServiceManagementComponent);
