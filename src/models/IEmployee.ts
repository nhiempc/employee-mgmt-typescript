export type IEmployeeInfo = {
    createTime?: string | null;
    modifyTime?: string | null;
    employeeId: number;
    fullName: string | null | undefined;
    code: string | null | undefined;
    phone: string | null | undefined;
    email: string | null | undefined;
    gender: number;
    address: string | null | undefined;
    citizenId: string | null | undefined;
    dateOfBirth: string | null | undefined;
    photoUrl: string | null | undefined;
    teamId: number;
    salary: number | null;
    salaryScale: number | null;
    status: number;
    statusLog: string | null | undefined;
    registerDate: string | null | undefined;
    registerName: string | null | undefined;
    registerPosition: string | null | undefined;
    registerContent: string | null | undefined;
    appointmentDate: string | null | undefined;
    rejectedReason: string | null | undefined;
    terminateRequestDetail: string | null | undefined;
    terminatedDate: string | null | undefined;
    terminatedReason: string | null | undefined;
    storedProfileCode: string | null | undefined;
    note: string | null | undefined;
};

export type ICertificates = {
    createTime?: string | null;
    modifyTime?: string | null;
    certificateId: number;
    employeeId: number;
    name: string | null | undefined;
    field: string | null | undefined;
    content: string | null | undefined;
    educationalOrg: string | null | undefined;
    graduatedWith: string | null | undefined;
    issuanceDate: string | null | undefined;
    educationStartDate: string | null | undefined;
    educationEndDate: string | null | undefined;
};

export type IFamilyRelations = {
    createTime?: string | null;
    modifyTime?: string | null;
    familyId: number;
    employeeId: number;
    name: string | null | undefined;
    gender: number;
    relation: string | null | undefined;
    citizenId: string | null | undefined;
    phone: string | null | undefined;
    email: string | null | undefined;
    address: string | null | undefined;
    dateOfBirth: string | null | undefined;
};

export type IEmployee = {
    employeeInfo: IEmployeeInfo;
    certificates: ICertificates[];
    familyRelations: IFamilyRelations[];
};
