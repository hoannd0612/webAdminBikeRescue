import React from 'react';
import Head from 'next/head';
import PageLayout from '../layouts/PageLayout';
import SettingsComponent from '../components/SettingsComponent';
import AuthenHOC from '../components/HOC/AuthenHOC';

const SettingsPage = () => (
  <PageLayout title="Settings">
    <Head>
      <title key="title">Settings</title>
    </Head>
    <SettingsComponent />
  </PageLayout>
);

export default AuthenHOC(SettingsPage);
