import React from 'react';

const ErrorPage = () => <div>Page not found</div>;
ErrorPage.getInitialProps = async () => ({
    namespacesRequired: []
});
export default ErrorPage;
