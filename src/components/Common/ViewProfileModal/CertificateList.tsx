import { Grid } from '@mui/material';
import React from 'react';
import ListTemplate from '../ListTemplate';
import { headerCertificateData } from '../../../common';
import moment from 'moment';
import { ICertificates } from '../../../models/IEmployee';

type IProps = {
    certificateData: ICertificates[];
};

const CertificateList: React.FunctionComponent<IProps> = ({
    certificateData
}) => {
    const idCertificateData: number[] = [];
    const rowCertificateData: any[][] = [];

    if (certificateData.length > 0) {
        certificateData.map((item, index) => {
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
        <Grid
            container
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <Grid item xs={10} paddingBottom={'50px'} marginTop={'20px'}>
                <ListTemplate
                    maxHeight={250}
                    headerData={headerCertificateData}
                    isDelete={false}
                    isEdit={false}
                    idData={idCertificateData}
                    rowData={rowCertificateData}
                />
            </Grid>
        </Grid>
    );
};

export default CertificateList;
