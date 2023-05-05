import * as Yup from 'yup';
import moment from 'moment';

export const GET_EMPLOYEES: string = 'employees';
export const GET_TOTAL_RECORD: string = 'total';
export const GET_TOKEN: string = 'oauth/token';
export const GET_PROMOTE: string = 'promote';
export const GET_INCREASE_SALARY: string = 'increase-salary';
export const GET_PROPOSAL_CONSULTATION: string = 'propose-consult';

export const STATUS: any = {
    // 1 - 14: Employee Status
    // 15 - 19: Cập nhật diễn biến Status
    1: 'Lưu mới',
    2: 'Chờ xử lý',
    3: 'Chờ duyệt',
    4: 'Yêu cầu bổ sung',
    5: 'Đã duyệt',
    6: 'Đã từ chối',
    8: 'Chờ duyệt kết thúc',
    9: 'Yêu cầu bổ sung đối với kết thúc',
    10: 'Đã duyệt kết thúc',
    11: 'Đã từ chối kết thúc',
    12: 'Đã kết thúc',
    13: 'Đã lưu hồ sơ',
    14: 'Đã xóa',
    15: 'Lưu mới diễn biến',
    16: 'Chờ duyệt diễn biến',
    17: 'Yêu cầu bổ sung đối với diễn biến',
    18: 'Đã duyệt diễn biến',
    19: 'Đã từ chối diễn biến'
};

export const GENDER: any = {
    0: 'Nữ',
    1: 'Nam'
};

export const TEAM: any = {
    1: 'Front-end',
    2: 'Back-end'
};

export const headerRegisterProfile: any = [
    'Hồ sơ',
    'Ngày đăng kí',
    'Nội dung',
    'Ghi chú',
    'Hành động'
];

export const headerIncreaseSalary: any = [
    'Lần thứ',
    'Bậc',
    'Lương mới',
    'Ngày đăng ký',
    'Lý do',
    'Ghi chú',
    'Hành động'
];

export const headerPromote = [
    'Lần',
    'Ngày thăng chức',
    'Chức vụ hiện tại',
    'Chức vụ mới',
    'Lý do',
    'Ghi chú',
    'Hành động'
];

export const headerProposalConsultation = [
    'Loại',
    'Ngày đăng ký',
    'Ghi chú',
    'Nội dung',
    'Hành động'
];

export const SUCCESS_CODE: number = 200;

export const errorMessage: string =
    'Chúng tôi đang gặp một số vấn đề. Vui lòng thử lại sau';

export const headerFamilyData: string[] = [
    'STT',
    'Họ và tên',
    'Giới tính',
    'Ngày sinh',
    'Số CCCD',
    'Mối quan hệ',
    'Địa chỉ',
    'Hành động'
];

export const headerCertificateData: string[] = [
    'STT',
    'Tên văn bằng',
    'Ngày cấp',
    'Nội dung',
    'Lĩnh vực',
    'Hành động'
];

export const headerNewEmployee: string[] = [
    'Mã nhân viên',
    'Tên nhân viên',
    'Email',
    'Số điện thoại',
    'Mã CCCD/CMT',
    'Trạng thái',
    'Thao tác'
];

export const headerApprovedEmployee: string[] = [
    'Mã nhân viên',
    'Họ và tên',
    'Ngày sinh',
    'Giới tính',
    'Địa chỉ',
    'Trạng thái',
    'Hành động'
];

export const headerPendingEmployee: string[] = [
    'Mã nhân viên',
    'Họ Tên',
    'Email',
    'Số điện thoại',
    'Trạng thái',
    'Hành động'
];

export const groupOptions: any = [
    {
        label: 'Chọn nhóm',
        value: ''
    },
    {
        label: 'Front-end',
        value: 1
    },
    {
        label: 'Back-end',
        value: 2
    }
];

export const genderOptions: any = [
    {
        label: 'Chọn giới tính',
        value: ''
    },
    {
        label: 'Nam',
        value: 1
    },
    {
        label: 'Nữ',
        value: 0
    }
];

export const leaderOptions: any = [
    {
        value: '',
        label: 'Chọn lãnh đạo',
        position: ''
    },
    {
        value: 1,
        label: 'Nguyễn Văn A',
        position: 'Giám đốc'
    },
    {
        value: 2,
        label: 'Nguyễn Văn B',
        position: 'Trưởng phòng'
    },
    {
        value: 3,
        label: 'Nguyễn Văn C',
        position: 'Phó phòng'
    },
    {
        value: 4,
        label: 'Nguyễn Thị D',
        position: 'Thư ký'
    }
];

export const initEmployeeInfo: any = {
    fullName: '',
    code: '',
    gender: null,
    dateOfBirth: '',
    phone: '',
    email: '',
    citizenId: '',
    teamId: null,
    address: '',
    status: 1,
    photoUrl: ''
};

export const initCertificate: any = {
    name: '',
    issuanceDate: '',
    field: '',
    content: ''
};

export const initFamilyMember: any = {
    name: '',
    gender: null,
    dateOfBirth: '',
    citizenId: '',
    relation: '',
    address: ''
};

export const initResume: any = {
    commonName: '',
    currentAddress: '',
    ethnicity: '',
    religion: '',
    citizenIdIssuanceDate: '',
    citizenIdIssuingAuthority: ''
};

export const initSalaryForm: any = {
    salary: '',
    salaryScale: '',
    date: moment().format('YYYY-MM-DD'),
    reason: '',
    note: ''
};

export const initPromoteForm: any = {
    newPosition: '',
    reason: '',
    date: moment().format('YYYY-MM-DD'),
    note: ''
};

export const initProposalConsultationForm: any = {
    type: '',
    content: '',
    date: '',
    note: ''
};

export const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const citizenIdRegex = /^\d{9}$|^\d{12}$/;

export const employeeInfoValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Tên nhân viên không được để trống')
        .max(50, 'Không được quá 50 ký tự'),
    code: Yup.string()
        .required('Mã nhân viên không được để trống')
        .max(32, 'Mã nhân viên không được quá 32 ký tự'),
    gender: Yup.number().required('Vui lòng chọn giới tính'),
    dateOfBirth: Yup.date()
        .required('Vui lòng chọn ngày sinh')
        .max(
            moment().format('YYYY-MM-DD'),
            'Ngày sinh phải là ngày trong quá khứ'
        ),
    phone: Yup.string()
        .required('Số điện thoại không được để trống')
        .matches(phoneRegex, { message: 'Định dạng SĐT không đúng' }),
    email: Yup.string()
        .required('Email không được để trống')
        .matches(emailRegex, { message: 'Định dạng Email không đúng' }),
    citizenId: Yup.string()
        .required('CMND/CCCD không được để trống')
        .matches(citizenIdRegex, {
            message: 'Định dạng CMND/CCCD không đúng'
        }),
    teamId: Yup.number().required('Vui lòng chọn nhóm'),
    address: Yup.string().required('Địa chỉ không được để trống')
});

export const certificateValidationSchema = Yup.object().shape({
    name: Yup.string().required('Tên văn bằng không được để trống'),
    issuanceDate: Yup.date().required('Vui lòng chọn ngày'),
    field: Yup.string().required('Lĩnh vực không được để trống'),
    content: Yup.string().required('Nội dung không được để trống')
});

export const familyValidationSchema = Yup.object().shape({
    name: Yup.string().required('Họ và tên không được để trống'),
    gender: Yup.number().required('Vui lòng chọn giới tính'),
    dateOfBirth: Yup.date()
        .required('Vui lòng chọn ngày sinh')
        .max(
            moment().format('YYYY-MM-DD'),
            'Ngày sinh phải là ngày trong quá khứ'
        ),
    citizenId: Yup.string()
        .required('CMND/CCCD không được để trống')
        .matches(citizenIdRegex, {
            message: 'Định dạng CMND/CCCD không đúng'
        }),
    relation: Yup.string().required('Địa chỉ không được để trống'),
    address: Yup.string().required('Địa chỉ không được để trống')
});

export const resumeValidationSchema = Yup.object().shape({
    commonName: Yup.string().required('Tên không được để trống'),
    currentAddress: Yup.string().required('Địa chỉ không được để trống'),
    ethnicity: Yup.string().required('Dân tộc không được để trống'),
    religion: Yup.string().required('Tôn giáo không được để trống'),
    citizenIdIssuanceDate: Yup.date().required('Vui lòng chọn ngày'),
    citizenIdIssuingAuthority: Yup.string().required(
        'Nơi cấp không được để trống'
    )
});

export const salaryValidationSchema = Yup.object().shape({
    salaryScale: Yup.number().required('Bậc lương không được để trống'),
    date: Yup.date().required('Vui lòng chọn ngày'),
    salary: Yup.number().required('Lương không được để trống'),
    note: Yup.string().required('Ghi chú không được để trống'),
    reason: Yup.string().required('Lý do không được để trống')
});

export const promoteValidationSchema = Yup.object().shape({
    newPosition: Yup.string().required('Vị trí không được để trống'),
    date: Yup.date().required('Vui lòng chọn ngày'),
    note: Yup.string().required('Ghi chú không được để trống'),
    reason: Yup.string().required('Lý do không được để trống')
});

export const thFamily = [
    'Họ và tên',
    'Ngày sinh',
    'Giới tính',
    'Quan hệ',
    'Địa chỉ'
];

export const newEmployeeStatus: number[] = [1, 3, 4, 6];

export const manageEmployeeStatus: number[] = [5];

export const finishEmployeeStatus: number[] = [9, 10, 11, 12, 13];

export const pendingEmployeeStatus: number[] = [2, 3, 8, 16];

export const approvedEmployeeStatus: number[] = [5, 6];
