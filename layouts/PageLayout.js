import React from 'react';
import { makeStyles, CssBaseline, Box, Container } from '@material-ui/core';
import AppBarComponent from '../components/AppBarComponent';
import VerticalBarComponent from '../components/VerticalBarComponent';
import CopyrightComponent from '../components/CopyrightComponent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: '#eaeaea',
    overflowX: 'hidden'
  },
  container: {
    minHeight: '100vh',
    paddingBottom: theme.spacing(3)
  }
}));

function PageLayout({ children, title }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <VerticalBarComponent open={open} setOpen={setOpen} />
      <main id="main-layout" className={classes.content}>
        <Container maxWidth={false} className={classes.container}>
          <AppBarComponent title={title} open={open} setOpen={setOpen} />
          {children}
        </Container>
        <Box style={{ backgroundColor: '#fff' }} pt={2} pb={2}>
          {/* <CopyrightComponent link="https://dev-blogs.netlify.com/">
            Thaind
          </CopyrightComponent> */}
        </Box>
      </main>
    </div>
  );
}

export default PageLayout;
