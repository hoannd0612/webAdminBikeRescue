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
  GetConfigsDataSelector,
  getConfigs,
  AddNewConfigDataSelector,
  AddNewConfigResetter,
  DeleteConfigResetter,
  UpdateConfigDataSelector,
  UpdateConfigResetter,
  updateConfig
} from '../stores/ConfigState';
import ConfigActionsComponent from './ConfigActionsComponent';

const connectWithRedux = connect(
  createStructuredSelector({
    configsData: GetConfigsDataSelector,
    addConfigSuccessMessage: AddNewConfigDataSelector,
    updateConfigData: UpdateConfigDataSelector
  }),
  dispatch => ({
    getConfigs: (page, pageSize) => dispatch(getConfigs({ page, pageSize })),
    resetData: () => {
      dispatch(AddNewConfigResetter);
      dispatch(DeleteConfigResetter);
      dispatch(UpdateConfigResetter);
    },
    resetAddConfigForm: () => dispatch(reset('addNewConfig')),
    activeConfig: values => dispatch(updateConfig({ ...values, status: true })),
    disableConfig: values =>
      dispatch(updateConfig({ ...values, status: false }))
  })
);

const getActions = ({
  status,
  id,
  setCurrentIdSelected,
  setIsOpenUpdate,
  activeConfig,
  disableConfig,
  config
}) => {
  return !status
    ? [
        {
          label: 'Active Config',
          action: () => activeConfig(config),
          icon: <LockOpen />
        }
      ]
    : [
        {
          label: 'Edit config',
          action: () => {
            setIsOpenUpdate(true);
            setCurrentIdSelected(id);
          },
          icon: <Edit />
        },
        {
          label: 'Disable Config',
          action: () => disableConfig(config),
          icon: <Lock />
        }
      ];
};
const COLUMNS = [
  {
    field: 'name',
    title: 'Config Name'
  },
  {
    field: 'value',
    title: 'Value'
  },
  {
    field: 'status',
    title: 'Config Status'
  },
  {
    field: 'actions',
    title: 'Actions'
  }
];

const getData = ({
  configsData = [],
  setCurrentIdSelected,
  setIsOpenUpdate,
  activeConfig,
  disableConfig
}) =>
  configsData &&
  configsData.map(config => ({
    name: config.name,
    value: config.value,
    status: (
      <Chip
        label={config.status ? 'Active' : 'Disabled'}
        clickable
        color={!config.status ? 'secondary' : 'default'}
        deleteIcon={config.status ? <Done /> : <Lock />}
        style={config.status ? { background: 'green', color: 'white' } : {}}
      />
    ),
    actions: getActions({
      status: config.status,
      id: config.id,
      setCurrentIdSelected,
      setIsOpenUpdate,
      activeConfig,
      disableConfig,
      config
    }).map(({ label, action, icon }, index) => (
      <ButtonActionTableComponent
        key={index}
        label={label}
        action={action}
        icon={icon}
      />
    ))
  }));

const ConfigComponent = ({
  configsData,
  getConfigs,
  addConfigSuccessMessage,
  resetData,
  resetAddConfigForm,
  updateConfigData,
  activeConfig,
  disableConfig
}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [currentIdSelected, setCurrentIdSelected] = useState(null);

  useEffect(() => {
    if (addConfigSuccessMessage) {
      setIsOpenAdd(false);
      resetData();
      resetAddConfigForm();
    }
  }, [addConfigSuccessMessage]);

  useEffect(() => {
    if (updateConfigData) {
      setIsOpenUpdate(false);
      resetData();
    }
  }, [updateConfigData]);

  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (configsData) {
    totalCount = configsData.totalElements;
  }

  return (
    <React.Fragment>
      <AlertDialog
        title="Add new config"
        isOpenDialog={isOpenAdd}
        setIsOpenDialog={setIsOpenAdd}
        isFooter={false}
        size="xs"
        fullWidth
        content={isOpenAdd ? <ConfigActionsComponent /> : null}
      />
      <AlertDialog
        title="Update config"
        isOpenDialog={isOpenUpdate}
        setIsOpenDialog={setIsOpenUpdate}
        isFooter={false}
        size="xs"
        fullWidth
        content={
          isOpenUpdate ? (
            <ConfigActionsComponent isUpdate id={currentIdSelected} />
          ) : null
        }
        onClose={() => {
          setIsOpenUpdate(false);
        }}
      />
      <FrameHeaderComponent title="Config management">
        <Button onClick={() => setIsOpenAdd(true)}>Add new config</Button>
      </FrameHeaderComponent>
      <ReactTableLayout
        dispatchAction={getConfigs}
        data={getData({
          configsData: (configsData || {}).content || [],
          setCurrentIdSelected,
          setIsOpenUpdate,
          activeConfig,
          disableConfig
        })}
        columns={COLUMNS}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
      />
    </React.Fragment>
  );
};

export default connectWithRedux(ConfigComponent);
