import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import ConfigComponent from '../../components/ConfigComponent';

const ConfigPage = rootProps => (
  <PageLayout {...rootProps} title="Category Management">
    <ConfigComponent />
  </PageLayout>
);

export default AuthenHOC(ConfigPage);
