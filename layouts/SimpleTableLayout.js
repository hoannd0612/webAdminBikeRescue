import React, { forwardRef, useState, useEffect } from 'react';
import { doDispatchAction } from '../utils';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import SearchComponent from '../components/SearchComponent';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons';
import { Divider, Grid, makeStyles } from '@material-ui/core';
const MaterialTable = dynamic(() => import('material-table'), { ssr: false });

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const PAGE_SIZE_DEFAULT = 10,
  PAGE_DEFAULT = 0;

const useStyles = makeStyles(theme => ({
  searchSection: {
    paddingTop: theme.spacing(1),
    background: 'white'
  },
  dateRangeMobile: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  },
  dateRange: {
    padding: `0px ${theme.spacing(1)}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchMobile: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
}));

const ReactTableLayout = ({
  data = [],
  columns = [],
  dispatchAction,
  totalCount,
  pageSize = PAGE_SIZE_DEFAULT,
  page = PAGE_DEFAULT,
  style = {},
  options = {},
  components = {},
  searchProps = {},
  hasAction = false,
  hasPaging = true,
  dispatchExCondition = [],
  ...others
}) => {
  const {
    searchMessage,
    setSearchMessage,
    placeholder,
    exCondition
  } = searchProps;
  const classes = useStyles();
  const [pageSizeTable, setPageSizeTable] = useState(pageSize);
  const [pageIndex, setPageIndex] = useState(page);
  const [isFetchPaging, setIsFetchPaging] = useState(true);
  const [isReFetchWithNoPaging, setIsReFetchWithNoPaging] = useState(true);

  useEffect(() => {
    if (hasPaging && !hasAction) {
      doDispatchAction(
        typeof dispatchAction === 'function' &&
          dispatchAction(pageIndex, pageSizeTable, ...dispatchExCondition)
      );
    }
  }, [
    hasAction,
    hasPaging,
    dispatchAction,
    isFetchPaging,
    pageSizeTable,
    pageIndex
  ]);

  useEffect(() => {
    if (!hasPaging && isReFetchWithNoPaging === true) {
      typeof dispatchAction === 'function' &&
        dispatchAction(...dispatchExCondition);
      setIsReFetchWithNoPaging(false);
    }
  }, [hasPaging, dispatchAction]);

  useEffect(() => {
    if (hasAction && hasPaging) {
      doDispatchAction(
        typeof dispatchAction === 'function' &&
          dispatchAction(pageIndex, pageSizeTable, exCondition)
      );
    }
  }, [
    pageSizeTable,
    pageIndex,
    dispatchAction,
    exCondition,
    hasAction,
    hasPaging
  ]);

  // useEffect(() => {
  //   setIsFetchPaging(true);
  // }, [pageIndex, pageSizeTable]);

  return (
    <Grid>
      {hasAction && (
        <Grid
          container
          direction="column"
          className={clsx(classes.searchSection, 'shadow')}
        >
          <Grid container justify="center">
            <Grid className={classes.searchMobile} item xs={12} sm={6} lg={7}>
              <SearchComponent
                searchMessage={searchMessage}
                setSearchMessage={setSearchMessage}
                placeholder={placeholder}
                dispatchAction={dispatchAction}
              />
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      )}
      <MaterialTable
        {...others}
        style={Object.assign(
          {},
          {
            width: '100%',
            boxShadow:
              '0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1)'
          },
          style
        )}
        options={Object.assign(
          {},
          {
            search: false,
            showTitle: false,
            paginationType: 'stepped',
            pageSize: pageSize,
            padding: 'dense',
            paging: hasPaging ? true : false,
            pageSizeOptions: [5, 10, 15]
          },
          options
        )}
        components={Object.assign(
          {},
          {
            Toolbar: () => <div></div>
          },
          components
        )}
        totalCount={totalCount}
        page={pageIndex}
        onChangePage={pageIndex => {
          setPageIndex(pageIndex);
        }}
        onChangeRowsPerPage={pageSize => {
          setPageSizeTable(pageSize);
        }}
        icons={tableIcons}
        columns={columns.map(
          ({ headerStyle = {}, cellStyle = {}, ...others }) => ({
            headerStyle: Object.assign(
              {},
              {
                textTransform: 'uppercase',
                fontWeight: 'bold'
              },
              headerStyle
            ),
            cellStyle: Object.assign({}, { whiteSpace: 'nowrap' }, cellStyle),
            ...others
          })
        )}
        data={data}
      />
    </Grid>
  );
};

export default ReactTableLayout;
