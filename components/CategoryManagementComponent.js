import ButtonActionTableComponent from './commons/ButtonActionTableComponent';
import ReactTableLayout from '../layouts/SimpleTableLayout';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Lock, LockOpen, Done, Edit } from '@material-ui/icons';
import { Chip, Grid, Link } from '@material-ui/core';
import { reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import FrameHeaderComponent from './FrameHeaderComponent';
import Button from '../layouts/Button';
import AlertDialog from '../layouts/AlertDialog';
import {
  GetCategoriesDataSelector,
  getCategories,
  AddNewCategoryDataSelector,
  AddNewCategoryResetter,
  DeleteCategoryResetter,
  UpdateCategoryDataSelector,
  UpdateCategoryResetter,
  updateCategory
} from '../stores/CategoryState';
import CategoryActionsComponent from './CategoryActionsComponent';
import { createLink } from '../libs';
import DisplayShortenComponent from './commons/DisplayShotenComponent';

const connectWithRedux = connect(
  createStructuredSelector({
    categoriesData: GetCategoriesDataSelector,
    addCategorySuccessMessage: AddNewCategoryDataSelector,
    updateCategoryData: UpdateCategoryDataSelector
  }),
  dispatch => ({
    getCategories: () => dispatch(getCategories({})),
    resetData: () => {
      dispatch(AddNewCategoryResetter);
      dispatch(DeleteCategoryResetter);
      dispatch(UpdateCategoryResetter);
    },
    resetAddCategoryForm: () => dispatch(reset('addNewCategory')),
    activeCategory: values =>
      dispatch(updateCategory({ ...values, status: true })),
    disableCategory: values =>
      dispatch(updateCategory({ ...values, status: false }))
  })
);

const getActions = ({
  status,
  id,
  setCurrentIdSelected,
  setIsOpenUpdate,
  activeCategory,
  disableCategory,
  category
}) => {
  return !status
    ? [
        {
          label: 'Active Category',
          action: () => activeCategory(category),
          icon: <LockOpen />
        }
      ]
    : [
        {
          label: 'Edit category',
          action: () => {
            setIsOpenUpdate(true);
            setCurrentIdSelected(id);
          },
          icon: <Edit />
        },
        {
          label: 'Disable Category',
          action: () => disableCategory(category),
          icon: <Lock />
        }
      ];
};
const COLUMNS = [
  {
    field: 'name',
    title: 'Category Name'
  },
  {
    field: 'status',
    title: 'Category Status'
  },
  {
    field: 'actions',
    title: 'Actions'
  }
];

const getData = ({
  categoriesData = [],
  setCurrentIdSelected,
  setIsOpenUpdate,
  activeCategory,
  disableCategory
}) =>
  categoriesData &&
  categoriesData.map(category => ({
    name: (
      <Link href={createLink(['category', `details?id=${category.id}`])}>
        <a>{category.categoryName}</a>
      </Link>
    ),
    description: (
      <DisplayShortenComponent>{category.description}</DisplayShortenComponent>
    ),
    status: (
      <Chip
        label={category.status ? 'Active' : 'Disabled'}
        clickable
        color={!category.status ? 'secondary' : 'default'}
        deleteIcon={category.status ? <Done /> : <Lock />}
        style={category.status ? { background: 'green', color: 'white' } : {}}
      />
    ),
    actions: getActions({
      status: category.status,
      id: category.id,
      setCurrentIdSelected,
      setIsOpenUpdate,
      activeCategory,
      disableCategory,
      category
    }).map(({ label, action, icon }, index) => (
      <ButtonActionTableComponent
        key={index}
        label={label}
        action={action}
        icon={icon}
      />
    ))
  }));

const CategoryManagementComponent = ({
  categoriesData,
  getCategories,
  addCategorySuccessMessage,
  resetData,
  resetAddCategoryForm,
  updateCategoryData,
  activeCategory,
  disableCategory
}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [currentIdSelected, setCurrentIdSelected] = useState(null);

  useEffect(() => {
    if (addCategorySuccessMessage) {
      setIsOpenAdd(false);
      resetData();
      resetAddCategoryForm();
    }
  }, [addCategorySuccessMessage]);

  useEffect(() => {
    if (updateCategoryData) {
      setIsOpenUpdate(false);
      resetData();
    }
  }, [updateCategoryData]);

  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (categoriesData) {
    totalCount = categoriesData.length;
  }

  return (
    <React.Fragment>
      <AlertDialog
        title="Add new category"
        isOpenDialog={isOpenAdd}
        setIsOpenDialog={setIsOpenAdd}
        isFooter={false}
        size="xs"
        fullWidth
        content={isOpenAdd ? <CategoryActionsComponent /> : null}
      />
      <AlertDialog
        title="Update category"
        isOpenDialog={isOpenUpdate}
        setIsOpenDialog={setIsOpenUpdate}
        isFooter={false}
        size="xs"
        fullWidth
        content={
          isOpenUpdate ? (
            <CategoryActionsComponent isUpdate id={currentIdSelected} />
          ) : null
        }
        onClose={() => {
          setIsOpenUpdate(false);
        }}
      />
      <FrameHeaderComponent title="Category management">
        <Button onClick={() => setIsOpenAdd(true)}>Add new category</Button>
      </FrameHeaderComponent>
      <ReactTableLayout
        hasPaging={false}
        dispatchAction={getCategories}
        data={getData({
          categoriesData: categoriesData || [],
          setCurrentIdSelected,
          setIsOpenUpdate,
          activeCategory,
          disableCategory
        })}
        columns={COLUMNS}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
      />
    </React.Fragment>
  );
};

export default connectWithRedux(CategoryManagementComponent);
