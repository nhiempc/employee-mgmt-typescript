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

export const newEmployeeStatus: number[] = [1, 3, 4, 6];

export const manageEmployeeStatus: number[] = [5];

export const finishEmployeeStatus: number[] = [9, 10, 11, 12, 13];

export const pendingEmployeeStatus: number[] = [2, 3, 8, 16];

export const approvedEmployeeStatus: number[] = [5, 6];
