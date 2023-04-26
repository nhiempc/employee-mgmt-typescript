import { Button, Grid, TextField } from '@mui/material';
import { InputLabelProps } from './styles';
import { useState } from 'react';
import ListTemplate from '../ListTemplate/ListTemplate';
import { headerFamilyData } from '../../../common';

const FamifyInfoTab = () => {
    const [isEditFamilyMember, setIsEditFamilyMember] = useState(false);

    const rowFamilyData: any[] = [];
    const idFamilyData: number[] = [];

    const handleChangeEmployeeFamily = () => {
        setIsEditFamilyMember(true);
    };

    const handleAddFamilyMember = () => {};

    const handleUpdateFamilyMember = () => {};

    const handleEditFamilyMemberClick = () => {};

    const handleDeleteFamilyMember = () => {};

    return (
        <>
            <form onSubmit={handleAddFamilyMember}>
                <Grid container spacing={2} sx={{ pt: 2 }}>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Họ và tên'
                            variant='outlined'
                            size='small'
                            value={''}
                            name='name'
                            onChange={handleChangeEmployeeFamily}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label='Giới tính'
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            size='small'
                            value={''}
                            name='gender'
                            onChange={handleChangeEmployeeFamily}
                            select
                            SelectProps={{ native: true }}
                        >
                            <option value={''}>Chọn giới tính</option>
                            <option value={1}>Nam</option>
                            <option value={0}>Nữ</option>
                        </TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            type='date'
                            fullWidth
                            label='Ngày sinh'
                            variant='outlined'
                            size='small'
                            InputLabelProps={InputLabelProps}
                            value={''}
                            name='dateOfBirth'
                            onChange={handleChangeEmployeeFamily}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Số CMND/CCCD'
                            variant='outlined'
                            size='small'
                            type='number'
                            value={''}
                            name='citizenId'
                            onChange={handleChangeEmployeeFamily}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Mối quan hệ'
                            variant='outlined'
                            size='small'
                            value={''}
                            name='relation'
                            onChange={handleChangeEmployeeFamily}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Địa chỉ'
                            variant='outlined'
                            size='small'
                            value={''}
                            name='address'
                            onChange={handleChangeEmployeeFamily}
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
                        {!isEditFamilyMember && (
                            <Button variant='contained' type='submit'>
                                Thêm thành viên
                            </Button>
                        )}
                        {isEditFamilyMember && (
                            <Button
                                color='warning'
                                type='button'
                                onClick={handleUpdateFamilyMember}
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
                        headerData={headerFamilyData}
                        isDelete={true}
                        isEdit={true}
                        idData={idFamilyData}
                        rowData={rowFamilyData}
                        handleEdit={handleEditFamilyMemberClick}
                        handleDelete={handleDeleteFamilyMember}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default FamifyInfoTab;
