import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import RequestDetailsComponent from '../../components/RequestDetailsComponent';

const DetailsPage = rootProps => (
  <PageLayout {...rootProps} title="Request Details">
    <RequestDetailsComponent />
  </PageLayout>
);

export default AuthenHOC(DetailsPage);
