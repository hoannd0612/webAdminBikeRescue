import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import ComplainDetailsComponent from '../../components/ComplainDetailsComponent';

const DetailsPage = rootProps => (
  <PageLayout {...rootProps} title="Complain Details">
    <ComplainDetailsComponent />
  </PageLayout>
);

export default AuthenHOC(DetailsPage);
