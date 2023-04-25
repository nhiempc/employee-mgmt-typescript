export const GET_EMPLOYEES = 'employees';
export const GET_TOTAL_RECORD = 'total';
export const GET_TOKEN = 'oauth/token';
export const GET_PROMOTE = 'promote';
export const GET_INCREASE_SALARY = 'increase-salary';
export const GET_PROPOSAL_CONSULTATION = 'propose-consult';

export const STATUS = {
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

export const headerNewEmployee = [
    'Mã nhân viên',
    'Tên nhân viên',
    'Email',
    'Số điện thoại',
    'Mã CCCD/CMT',
    'Trạng thái',
    'Thao tác'
];

export const headerApprovedEmployee = [
    'Mã nhân viên',
    'Họ và tên',
    'Ngày sinh',
    'Giới tính',
    'Địa chỉ',
    'Trạng thái',
    'Hành động'
];

export const headerPendingEmployee = [
    'Mã nhân viên',
    'Họ Tên',
    'Email',
    'Số điện thoại',
    'Trạng thái',
    'Hành động'
];