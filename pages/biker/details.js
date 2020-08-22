import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import UserDetailsComponent from '../../components/UserDetailsComponent';

const DetailsPage = rootProps => (
  <PageLayout {...rootProps} title="Biker Details">
    <UserDetailsComponent />
  </PageLayout>
);

export default AuthenHOC(DetailsPage);
