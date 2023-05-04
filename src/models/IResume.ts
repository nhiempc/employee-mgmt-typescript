export type IResume = {
    fullName: string | null | undefined;
    commonName: string | null | undefined;
    code: string | null | undefined;
    phone: string | null | undefined;
    email: string | null | undefined;
    gender: number;
    address: string | null | undefined;
    currentAddress: string | null | undefined;
    citizenId: string | null | undefined;
    citizenIdIssuanceDate: string | null | undefined;
    citizenIdIssuingAuthority: string | null | undefined;
    dateOfBirth: string | null | undefined;
    ethnicity: string | null | undefined;
    religion: string | null | undefined;
    photoUrl: string | null | undefined;
};

export const initResume = {
    fullName: '',
    commonName: '',
    code: '',
    phone: '',
    email: '',
    gender: 1,
    address: '',
    currentAddress: '',
    citizenId: '',
    citizenIdIssuanceDate: '',
    citizenIdIssuingAuthority: '',
    dateOfBirth: '',
    ethnicity: '',
    religion: '',
    photoUrl: ''
};
