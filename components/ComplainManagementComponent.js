import ButtonActionTableComponent from './commons/ButtonActionTableComponent';
import ReactTableLayout from '../layouts/SimpleTableLayout';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Lock, LockOpen, Done, Edit, Visibility } from '@material-ui/icons';
import { Chip, Grid, Link, Tooltip } from '@material-ui/core';
import { reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import FrameHeaderComponent from './FrameHeaderComponent';
import Button from '../layouts/Button';
import AlertDialog from '../layouts/AlertDialog';
import {
  GetComplainsDataSelector,
  getComplains
} from '../stores/ComplainState';
import { createLink } from '../libs';
import DisplayShortenComponent from './commons/DisplayShotenComponent';
import { get } from 'lodash/fp';
import SelectLayout from '../layouts/SelectLayout';

const connectWithRedux = connect(
  createStructuredSelector({
    complainData: GetComplainsDataSelector
  }),
  dispatch => ({
    getComplains: (page, size, status) =>
      dispatch(getComplains({ page, size, status }))
  })
);

const getActions = ({ status, id, Complain }) => {
  return !status
    ? [
        {
          label: 'Active Complain',
          action: () => activeComplain(Complain),
          icon: <LockOpen />
        }
      ]
    : [
        {
          label: 'Edit Complain',
          action: () => {
            setIsOpenUpdate(true);
            setCurrentIdSelected(id);
          },
          icon: <Edit />
        },
        {
          label: 'Disable Complain',
          action: () => disableComplain(Complain),
          icon: <Lock />
        }
      ];
};
const COLUMNS = [
  {
    field: 'requestCode',
    title: 'Request Code'
  },
  {
    field: 'owner',
    title: 'Owner'
  },
  {
    field: 'status',
    title: 'Complain Status'
  },
  {
    field: 'actions',
    title: ''
  }
];

const getData = ({ complainData = [] }) =>
  complainData &&
  complainData.map(complain => ({
    requestCode: (
      <Link
        href={createLink([
          'request',
          `details?id=${get('request.id')(complain)}`
        ])}
      >
        {get('request.code')(complain)}
      </Link>
    ),
    owner: (
      <Link
        href={createLink([
          'biker',
          `details?id=${get('created.id')(complain)}`
        ])}
      >
        {get('created.fullName')(complain)}
      </Link>
    ),
    status: (
      <Chip
        label={complain.status ? 'Xử lý thành công' : 'Đang xử lý'}
        clickable
        color={!complain.status ? 'secondary' : 'default'}
        deleteIcon={complain.status ? <Done /> : <Lock />}
        style={complain.status ? { background: 'green', color: 'white' } : {}}
      />
    ),
    actions: (
      <Link href={createLink(['complain', `details?id=${complain.id}`])}>
        <Tooltip title="Complain details" placement="top">
          <Visibility />
        </Tooltip>
      </Link>
    )
  }));

const selectOptions = [
  {
    value: 'all',
    label: 'All Status'
  },
  {
    value: '1',
    label: 'Xử lý thành công'
  },
  {
    value: '0',
    label: 'Đang xử lý'
  }
];

const ComplainManagementComponent = ({ complainData, getComplains }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [status, setStatus] = useState('all');

  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (complainData) {
    totalCount = complainData.totalElements;
  }

  useEffect(() => {
    console.log({ status });
  }, [status]);

  return (
    <React.Fragment>
      {/* <AlertDialog
        title="Add new Complain"
        isOpenDialog={isOpenAdd}
        setIsOpenDialog={setIsOpenAdd}
        isFooter={false}
        size="xs"
        fullWidth
        content={isOpenAdd ? <ComplainActionsComponent /> : null}
      />
      <AlertDialog
        title="Update Complain"
        isOpenDialog={isOpenUpdate}
        setIsOpenDialog={setIsOpenUpdate}
        isFooter={false}
        size="xs"
        fullWidth
        content={
          isOpenUpdate ? (
            <ComplainActionsComponent isUpdate id={currentIdSelected} />
          ) : null
        }
        onClose={() => {
          setIsOpenUpdate(false);
        }}
      /> */}
      <FrameHeaderComponent title="Complain management">
        {/* <Button onClick={() => setIsOpenAdd(true)}>Add new Complain</Button> */}
        <div>
          <Grid container alignItems="center">
            Filter by status:{' '}
            <SelectLayout
              onChange={event => {
                localStorage.setItem('_complain_status', event.target.value);
                setStatus(event.target.value);
              }}
              value={status}
              options={selectOptions}
            />
          </Grid>
        </div>
      </FrameHeaderComponent>
      <ReactTableLayout
        dispatchExCondition={[status]}
        dispatchAction={getComplains}
        data={getData({
          complainData: (complainData || {}).content || []
        })}
        columns={COLUMNS}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
      />
    </React.Fragment>
  );
};

export default connectWithRedux(ComplainManagementComponent);
