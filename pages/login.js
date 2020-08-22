import Head from 'next/head';
import React from 'react';
import UserLoginFormComponent from '../components/UserLoginFormComponent';
import EmptyPageLayout from '../layouts/EmptyPageLayout';

const LoginPage = () => (
  <EmptyPageLayout>
    <Head>
      <title key="title">Login Page</title>
    </Head>
    <UserLoginFormComponent />
  </EmptyPageLayout>
);

export default LoginPage;
