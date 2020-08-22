import React from 'react';
import Head from 'next/head';
import PageLayout from '../layouts/PageLayout';
import ReviewCommentComponent from '../components/ReviewCommentComponent';
import AuthenHOC from '../components/HOC/AuthenHOC';

const SettingsPage = () => (
  <PageLayout title="Settings">
    <Head>
      <title key="title">Review Comment</title>
    </Head>
    <ReviewCommentComponent />
  </PageLayout>
);

export default AuthenHOC(SettingsPage);
