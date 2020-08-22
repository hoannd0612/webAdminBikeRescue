import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Typography, Grid, Divider, Link, Chip } from '@material-ui/core';
import MissingInfoComponent from './MissingInfoComponent';
import {
  getCategoryById,
  GetCategoryByIdDataSelector
  // getServicesByCategoryId
  // GetServicesByCategoryIdDataSelector
} from '../stores/CategoryState';
import { Done, Lock } from '@material-ui/icons';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import Button from '../layouts/Button';
import InfoLayout from '../layouts/InforLayout';
import ReactTableLayout from '../layouts/SimpleTableLayout';
import DisplayShortenComponent from './commons/DisplayShotenComponent';

const connectToRedux = connect(
  createStructuredSelector({
    detailsData: GetCategoryByIdDataSelector
    // servicesData: GetServicesByCategoryIdDataSelector
  }),
  dispatch => ({
    getDetails: id => dispatch(getCategoryById(id))
    // getServicesByCategoryId: categoryId => dispatch(getServicesByCategoryId({ categoryId }))
  })
);

const COLUMNS = [
  {
    field: 'serviceName',
    title: 'Service Name'
  },
  {
    field: 'description',
    title: 'Description'
  },
  {
    field: 'unit',
    title: 'Unit'
  },
  {
    field: 'status',
    title: 'Category Status'
  }
];

const getData = ({ servicesData = [] }) =>
  servicesData &&
  servicesData.map(({ services = {} }) => ({
    serviceName: services.serviceName,
    description: (
      <DisplayShortenComponent>{services.description}</DisplayShortenComponent>
    ),
    unit: services.unit,
    status: (
      <Chip
        label={services.status ? 'Active' : 'Disabled'}
        clickable
        color={!services.status ? 'secondary' : 'default'}
        deleteIcon={status ? <Done /> : <Lock />}
        style={services.status ? { background: 'green', color: 'white' } : {}}
      />
    )
  }));

const CategoryDetailsComponent = ({
  detailsData,
  getDetails,
  servicesData,
  getServicesByCategoryId
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    getDetails(Router.query.id);
  }, [getDetails]);

  // useEffect(() => {
  //   getServicesByCategoryId(Router.query.id);
  // }, [getServicesByCategoryId]);

  const rows = [
    { label: 'Category Name', key: 'categoryName' },
    { label: 'Description', key: 'description' },
    { label: 'Status', key: 'status' }
  ];
  let displays = {};
  if (detailsData)
    displays = {
      categoryName: detailsData.categoryName,

      description: (
        <DisplayShortenComponent>
          {detailsData.description}
        </DisplayShortenComponent>
      ),
      status: (
        <Chip
          label={detailsData.status ? 'Active' : 'Disabled'}
          clickable
          color={!detailsData.status ? 'secondary' : 'default'}
          deleteIcon={detailsData.status ? <Done /> : <Lock />}
          style={
            detailsData.status ? { background: 'green', color: 'white' } : {}
          }
        />
      )
    };

  return !detailsData ? (
    <MissingInfoComponent>
      <Typography variant="h5" color="secondary">
        Not found any Category
      </Typography>
    </MissingInfoComponent>
  ) : (
    <Grid>
      <Grid container justify="center">
        <Grid xs={12} item className="shadow-0">
          <CardSimpleLayout
            header={
              <Grid
                container
                justify="space-between"
                alignItems="center"
                direction="row"
              >
                <Typography variant="h6">Category details</Typography>
              </Grid>
            }
            body={<InfoLayout subtitle="" rows={rows} displays={displays} />}
          />
        </Grid>
      </Grid>
      {/* <Grid style={{ marginTop: 40 }} container justify="center">
        <Grid xs={12} item className="shadow-0">
          <CardSimpleLayout
            bodyStyle={{ padding: 0 }}
            header={<Typography variant="h6">Category services</Typography>}
            body={
              <ReactTableLayout
                dispatchAction={() => getServicesByCategoryId(Router.query.id)}
                hasPaging={false}
                data={getData({
                  servicesData: servicesData || []
                })}
                columns={COLUMNS}
              />
            }
          />
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default connectToRedux(CategoryDetailsComponent);
