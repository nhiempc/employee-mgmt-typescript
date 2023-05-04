import { Button, Grid } from '@mui/material';
import { FastField, Form, Formik } from 'formik';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
    certificateValidationSchema,
    headerCertificateData,
    initCertificate
} from '../../../common';
import { ICertificates } from '../../../models/IEmployee';
import { useAppDispatch } from '../../../reduxSaga/hooks';
import { employeeActions } from '../../../reduxSaga/slices/employee.slice';
import InputField from '../CustomFields/InputField/InputField';
import ListTemplate from '../ListTemplate/ListTemplate';
import { InputLabelProps } from './styles';
import { formatDate } from '../../../helpers/common';

type IProps = {
    certificates: ICertificates[];
};

const CertificateTab: React.FunctionComponent<IProps> = ({ certificates }) => {
    const dispatch = useAppDispatch();
    const [certificatesList, setCertificatesList] = useState<ICertificates[]>([
        ...certificates
    ]);
    const [editCertificate, setEditCertificate] =
        useState<ICertificates>(initCertificate);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const rowCertificateData: any[] = [];
    const idCertificateData: number[] = [];

    if (certificatesList.length > 0) {
        certificatesList.map((item, index) => {
            rowCertificateData.push([
                index + 1,
                item.name,
                moment(item.issuanceDate).format('DD/MM/YYYY') ===
                'Invalid date'
                    ? moment().format('DD/MM/YYYY')
                    : moment(item.issuanceDate).format('DD/MM/YYYY'),
                item.content,
                item.field
            ]);
            idCertificateData.push(Number(item.certificateId));
            return rowCertificateData;
        });
    }

    useEffect(() => {
        setCertificatesList([...certificates]);
    }, [certificates]);

    const handleEditCertificateClick = (certificateId: number) => {
        setIsEdit(true);
        const [selectedCertificate] = certificatesList.filter(
            (item) => item.certificateId === certificateId
        );
        let createTime = formatDate(selectedCertificate.createTime);
        let modifyTime = formatDate(selectedCertificate.modifyTime);
        let issuanceDate = formatDate(selectedCertificate.issuanceDate);
        let educationStartDate = formatDate(
            selectedCertificate.educationStartDate
        );
        let educationEndDate = formatDate(selectedCertificate.educationEndDate);
        const newCertificate = {
            ...selectedCertificate,
            createTime,
            modifyTime,
            issuanceDate,
            educationStartDate,
            educationEndDate
        };
        setEditCertificate(newCertificate);
    };

    const handleUpdateCertificate = (certificate: ICertificates) => {
        dispatch(employeeActions.addCertificates(certificate));
        const index = certificatesList.findIndex(
            (item) => item.certificateId === certificate.certificateId
        );
        const newList = [...certificatesList];
        newList[index] = certificate;
        setCertificatesList([...newList]);
        setIsEdit(false);
        setEditCertificate(initCertificate);
    };

    const handleDeleteCertificate = (certificateId: number) => {
        dispatch(employeeActions.deleteCertificate(certificateId));
        const rest = certificatesList.filter(
            (item) => item.certificateId !== certificateId
        );
        setCertificatesList([...rest]);
    };

    const handleCancel = () => {
        setIsEdit(false);
        setEditCertificate(initCertificate);
    };

    return (
        <Formik
            initialValues={editCertificate}
            onSubmit={(values, { resetForm }) => {
                setCertificatesList([...certificatesList, values]);
                dispatch(employeeActions.addCertificates(values));
                resetForm();
            }}
            enableReinitialize
            validationSchema={certificateValidationSchema}
        >
            {(formikProps) => {
                const { errors, values } = formikProps;

                return (
                    <>
                        <Form>
                            <Grid container spacing={2} sx={{ pt: 2 }}>
                                <Grid item xs={4}>
                                    <FastField
                                        error={errors.name ? true : false}
                                        helperText={errors.name}
                                        name='name'
                                        component={InputField}
                                        label='Tên văn bằng'
                                        fullWidth={true}
                                        InputLabelProps={InputLabelProps}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        error={
                                            errors.issuanceDate ? true : false
                                        }
                                        helperText={errors.issuanceDate}
                                        name='issuanceDate'
                                        component={InputField}
                                        label='Ngày cấp'
                                        fullWidth={true}
                                        InputLabelProps={InputLabelProps}
                                        variant='outlined'
                                        size='small'
                                        type='date'
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        error={errors.field ? true : false}
                                        helperText={errors.field}
                                        name='field'
                                        component={InputField}
                                        label='Lĩnh vực'
                                        fullWidth={true}
                                        InputLabelProps={InputLabelProps}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <FastField
                                        error={errors.content ? true : false}
                                        helperText={errors.content}
                                        name='content'
                                        component={InputField}
                                        label='Nội dung'
                                        fullWidth={true}
                                        InputLabelProps={InputLabelProps}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>

                                <Grid
                                    item
                                    xs={4}
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
                                                    handleUpdateCertificate(
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
                                            type='submit'
                                            variant='contained'
                                        >
                                            Thêm văn bằng
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Form>
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item xs={12}>
                                <ListTemplate
                                    maxHeight={250}
                                    headerData={headerCertificateData}
                                    idData={idCertificateData}
                                    rowData={rowCertificateData}
                                    isDelete={true}
                                    isEdit={true}
                                    handleEdit={handleEditCertificateClick}
                                    handleDelete={handleDeleteCertificate}
                                />
                            </Grid>
                        </Grid>
                    </>
                );
            }}
        </Formik>
    );
};

export default CertificateTab;
