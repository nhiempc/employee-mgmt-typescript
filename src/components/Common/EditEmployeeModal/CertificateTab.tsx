import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { headerCertificateData } from '../../../common';
import ListTemplate from '../ListTemplate/ListTemplate';
import { InputLabelProps } from './styles';

const CertificateTab = () => {
    const rowCertificateData: any[] = [];
    const idCertificateData: number[] = [];

    const [isEditCertificate, setIsEditCertificate] = useState(false);

    const handleChangeEmployeeCertificate = () => {
        setIsEditCertificate(true);
    };

    const handleAddCertificate = () => {};

    const handleUpdateCertificate = () => {};

    const handleEditCertificateClick = () => {};

    const handleDeleteCertificate = () => {};

    return (
        <>
            <form onSubmit={handleAddCertificate}>
                <Grid container spacing={2} sx={{ pt: 2 }}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Tên văn bằng'
                            variant='outlined'
                            size='small'
                            name='name'
                            value={''}
                            onChange={handleChangeEmployeeCertificate}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type='date'
                            fullWidth
                            label='Ngày cấp'
                            variant='outlined'
                            size='small'
                            InputLabelProps={InputLabelProps}
                            name='issuanceDate'
                            value={''}
                            onChange={handleChangeEmployeeCertificate}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Lĩnh vực'
                            variant='outlined'
                            size='small'
                            name='field'
                            value={''}
                            onChange={handleChangeEmployeeCertificate}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Nội dung'
                            variant='outlined'
                            size='small'
                            name='content'
                            value={''}
                            onChange={handleChangeEmployeeCertificate}
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
                        {!isEditCertificate && (
                            <Button type='submit' variant='contained'>
                                Thêm văn bằng
                            </Button>
                        )}
                        {isEditCertificate && (
                            <Button
                                color='warning'
                                type='button'
                                onClick={handleUpdateCertificate}
                                variant='contained'
                            >
                                Cập nhật
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </form>
            <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={12}>
                    <ListTemplate
                        maxHeight={250}
                        headerData={headerCertificateData}
                        isDelete={true}
                        isEdit={true}
                        idData={idCertificateData}
                        rowData={rowCertificateData}
                        handleEdit={handleEditCertificateClick}
                        handleDelete={handleDeleteCertificate}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default CertificateTab;
