import React from 'react';

import PageLayout from '../../../layouts/PageLayout';
import AuthenHOC from '../../../components/HOC/AuthenHOC';
import BranchDetailsComponent from '../../../components/BranchDetailsComponent';

const DetailsPage = rootProps => (
  <PageLayout {...rootProps} title="Branch Details">
    <BranchDetailsComponent />
  </PageLayout>
);

export default AuthenHOC(DetailsPage);
