import { Button, Grid } from '@mui/material';
import { FastField, Form, Formik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
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

const CertificateTab = () => {
    const dispatch = useAppDispatch();
    const [certificates, setCertificates] = useState<ICertificates[]>([]);

    const rowCertificateData: any[] = [];
    const idCertificateData: number[] = [];

    if (certificates) {
        certificates.map((item, index) => {
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

    return (
        <Formik
            initialValues={initCertificate}
            onSubmit={(values, { resetForm }) => {
                setCertificates([...certificates, values]);
                dispatch(employeeActions.addCertificates(values));
                resetForm();
            }}
            validationSchema={certificateValidationSchema}
        >
            {(formikProps) => {
                const { errors } = formikProps;
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
                                    <Button type='submit' variant='contained'>
                                        Thêm văn bằng
                                    </Button>
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
