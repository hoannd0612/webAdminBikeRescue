import ButtonActionTableComponent from './commons/ButtonActionTableComponent';
import ReactTableLayout from '../layouts/SimpleTableLayout';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Lock,
  LockOpen,
  Done,
  Edit,
  Visibility,
  AssignmentTurnedIn
} from '@material-ui/icons';
import { Chip, Grid, Link, Tooltip, Typography } from '@material-ui/core';
import { reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import FrameHeaderComponent from './FrameHeaderComponent';
import Button from '../layouts/Button';
import AlertDialog from '../layouts/AlertDialog';
import {
  GetComplainsDataSelector,
  getComplains,
  updateComplain,
  UpdateComplainDataSelector,
  UpdateComplainResetter
} from '../stores/ComplainState';
import { createLink } from '../libs';
import DisplayShortenComponent from './commons/DisplayShotenComponent';
import { get } from 'lodash/fp';
import SelectLayout from '../layouts/SelectLayout';

const connectWithRedux = connect(
  createStructuredSelector({
    complainData: GetComplainsDataSelector,
    updateComplainData: UpdateComplainDataSelector
  }),
  dispatch => ({
    getComplains: (page, size, status) =>
      dispatch(getComplains({ page, size, status })),
    updateComplain: id => dispatch(updateComplain(id)),
    resetData: () => {
      dispatch(UpdateComplainResetter);
    }
  })
);

const COLUMNS = [
  {
    field: 'requestCode',
    title: 'Request Code'
  },
  {
    field: 'owner',
    title: 'Complainer'
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

const getData = ({
  complainData = [],
  setIsOpenUpdate,
  setCurrentIdSelected
}) =>
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
      <Grid>
        <Link href={createLink(['complain', `details?id=${complain.id}`])}>
          <Tooltip title="Complain details" placement="top">
            <Visibility />
          </Tooltip>
        </Link>
        {!complain.status && (
          <Tooltip
            style={{ cursor: 'pointer', marginLeft: 4 }}
            title="Complete complain"
            placement="top"
            onClick={() => {
              setIsOpenUpdate(true);
              setCurrentIdSelected(complain.id);
            }}
          >
            <AssignmentTurnedIn />
          </Tooltip>
        )}
      </Grid>
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

const ComplainManagementComponent = ({
  complainData,
  getComplains,
  updateComplainData,
  updateComplain,
  resetData
}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [currentIdSelected, setCurrentIdSelected] = useState(null);
  const [status, setStatus] = useState('all');
  const [isRefresh, setIsRefresh] = useState(true);

  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (complainData) {
    totalCount = complainData.totalElements;
  }

  useEffect(() => {
    if (updateComplainData) {
      setIsOpenUpdate(false);
      resetData();
    }
  }, [updateComplainData]);

  useEffect(() => {
    if (isRefresh) {
      setIsRefresh(false);
    }
  }, [isRefresh]);

  return (
    <React.Fragment>
      <AlertDialog
        isOpenDialog={isOpenUpdate}
        setIsOpenDialog={setIsOpenUpdate}
        size="sm"
        fullWidth
        onOk={() => {
          currentIdSelected && updateComplain(currentIdSelected);
        }}
        content={
          <Grid style={{ padding: `32px 0px` }}>
            <Typography variant="h6">
              Bạn có muốn xử lí yêu cầu phàn nàn này không?
            </Typography>
            <i style={{ color: 'red' }}>Chú ý: hành động này k thể revert</i>
          </Grid>
        }
        onClose={() => {
          setIsOpenUpdate(false);
        }}
      />
      <FrameHeaderComponent title="Complain management">
        <div>
          <Grid container alignItems="center">
            Filter by status:{' '}
            <SelectLayout
              onChange={event => {
                localStorage.setItem('_complain_status', event.target.value);
                setStatus(event.target.value);
                setIsRefresh(true);
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
          complainData: (complainData || {}).content || [],
          setIsOpenUpdate,
          setCurrentIdSelected
        })}
        columns={COLUMNS}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        isRefresh={isRefresh}
      />
    </React.Fragment>
  );
};

export default connectWithRedux(ComplainManagementComponent);
