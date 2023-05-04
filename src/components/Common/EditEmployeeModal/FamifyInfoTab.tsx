import { Button, Grid } from '@mui/material';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
    GENDER,
    familyValidationSchema,
    genderOptions,
    headerFamilyData,
    initFamilyMember
} from '../../../common';
import { IFamilyRelations } from '../../../models/IEmployee';
import { useAppDispatch } from '../../../reduxSaga/hooks';
import { employeeActions } from '../../../reduxSaga/slices/employee.slice';
import InputField from '../CustomFields/InputField/InputField';
import SelectField from '../CustomFields/SelectField/SelectField';
import ListTemplate from '../ListTemplate/ListTemplate';
import { InputLabelProps } from './styles';
import moment from 'moment';
import { formatDate } from '../../../helpers/common';

type IProps = {
    familyRelations: IFamilyRelations[];
};

const FamifyInfoTab: React.FunctionComponent<IProps> = ({
    familyRelations
}) => {
    const dispatch = useAppDispatch();
    const [familyMembers, setFamilyMembers] = useState<IFamilyRelations[]>([
        ...familyRelations
    ]);
    const [editFamilyMember, setEditFamilyMember] =
        useState<IFamilyRelations>(initFamilyMember);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const rowFamilyData: any[] = [];
    const idFamilyData: number[] = [];

    if (familyMembers.length > 0) {
        familyMembers.map((item, index) => {
            rowFamilyData.push([
                index + 1,
                item.name,
                GENDER[item.gender],
                moment(item.dateOfBirth).format('DD/MM/YYYY') === 'Invalid date'
                    ? moment().format('DD/MM/YYYY')
                    : moment(item.dateOfBirth).format('DD/MM/YYYY'),
                item.citizenId,
                item.relation,
                item.address
            ]);
            idFamilyData.push(Number(item.familyId));
            return rowFamilyData;
        });
    }

    useEffect(() => {
        setFamilyMembers([...familyRelations]);
    }, [familyRelations]);

    const handleEditFamilyMemberClick = (familyId: number) => {
        setIsEdit(true);
        const [selectedFamilyMember] = familyMembers.filter(
            (item) => item.familyId === familyId
        );
        let createTime = formatDate(selectedFamilyMember.createTime);
        let modifyTime = formatDate(selectedFamilyMember.modifyTime);
        let dateOfBirth = formatDate(selectedFamilyMember.dateOfBirth);
        let newFamilyMember = {
            ...selectedFamilyMember,
            createTime,
            modifyTime,
            dateOfBirth
        };
        setEditFamilyMember(newFamilyMember);
    };

    const handleUpdateFamilyRelations = (familyMember: IFamilyRelations) => {
        dispatch(employeeActions.addFamilyMember(familyMember));
        const index = familyMembers.findIndex(
            (item) => item.familyId === familyMember.familyId
        );
        const newList = [...familyMembers];
        newList[index] = familyMember;
        setFamilyMembers([...newList]);
        setIsEdit(false);
        setEditFamilyMember(initFamilyMember);
    };

    const handleDeleteFamilyMember = (familyId: number) => {
        dispatch(employeeActions.deleteFamilyMember(familyId));
        const rest = familyMembers.filter((item) => item.familyId !== familyId);
        setFamilyMembers([...rest]);
    };

    const handleCancel = () => {
        setIsEdit(false);
        setEditFamilyMember(initFamilyMember);
    };

    return (
        <Formik
            initialValues={editFamilyMember}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
                setFamilyMembers([...familyMembers, values]);
                dispatch(employeeActions.addFamilyMember(values));
                resetForm();
            }}
            validationSchema={familyValidationSchema}
        >
            {(formikProps) => {
                const { errors, values } = formikProps;
                return (
                    <>
                        <Form>
                            <Grid container spacing={2} sx={{ pt: 2 }}>
                                <Grid item xs={3}>
                                    <FastField
                                        error={errors.name ? true : false}
                                        helperText={errors.name}
                                        name='name'
                                        component={InputField}
                                        label='Họ và tên'
                                        fullWidth={true}
                                        InputLabelProps={InputLabelProps}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FastField
                                        error={errors.gender ? true : false}
                                        helperText={errors.gender}
                                        name='gender'
                                        fullWidth={true}
                                        options={genderOptions}
                                        component={SelectField}
                                        label='Giới tính'
                                        variant='outlined'
                                        select={true}
                                        SelectProps={{ native: true }}
                                        InputLabelProps={InputLabelProps}
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FastField
                                        error={
                                            errors.dateOfBirth ? true : false
                                        }
                                        helperText={errors.dateOfBirth}
                                        name='dateOfBirth'
                                        component={InputField}
                                        label='Ngày sinh'
                                        type='date'
                                        fullWidth={true}
                                        InputLabelProps={InputLabelProps}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FastField
                                        error={errors.citizenId ? true : false}
                                        helperText={errors.citizenId}
                                        name='citizenId'
                                        component={InputField}
                                        label='Số CMND/CCCD'
                                        fullWidth={true}
                                        InputLabelProps={InputLabelProps}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FastField
                                        error={errors.relation ? true : false}
                                        helperText={errors.relation}
                                        name='relation'
                                        component={InputField}
                                        label='Mối quan hệ'
                                        fullWidth={true}
                                        InputLabelProps={InputLabelProps}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FastField
                                        error={errors.address ? true : false}
                                        helperText={errors.address}
                                        name='address'
                                        component={InputField}
                                        label='Địa chỉ'
                                        fullWidth={true}
                                        InputLabelProps={InputLabelProps}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'end',
                                        alignContent: 'end',
                                        alignItems: 'start'
                                    }}
                                >
                                    {isEdit && (
                                        <>
                                            <Button
                                                color='warning'
                                                type='button'
                                                variant='contained'
                                                onClick={() =>
                                                    handleUpdateFamilyRelations(
                                                        values
                                                    )
                                                }
                                            >
                                                Cập nhật
                                            </Button>
                                            <Button
                                                color='error'
                                                type='button'
                                                variant='contained'
                                                onClick={handleCancel}
                                                sx={{ marginLeft: '16px' }}
                                            >
                                                Hủy
                                            </Button>
                                        </>
                                    )}
                                    {!isEdit && (
                                        <Button
                                            variant='contained'
                                            type='submit'
                                        >
                                            Thêm thành viên
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Form>

                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item xs={12}>
                                <ListTemplate
                                    maxHeight={250}
                                    headerData={headerFamilyData}
                                    idData={idFamilyData}
                                    rowData={rowFamilyData}
                                    isDelete={true}
                                    isEdit={true}
                                    handleEdit={handleEditFamilyMemberClick}
                                    handleDelete={handleDeleteFamilyMember}
                                />
                            </Grid>
                        </Grid>
                    </>
                );
            }}
        </Formik>
    );
};

export default FamifyInfoTab;
