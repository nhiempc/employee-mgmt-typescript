export type IProposalConsultation = {
    createTime?: string | null;
    modifyTime?: string | null;
    proposalConsultationId?: number;
    employeeId?: number;
    status: number;
    type: string | null | undefined;
    content: string | null | undefined;
    date: string | null | undefined;
    note: string | null | undefined;
};
export const initProposalConsultation = {
    proposalConsultationId: 0,
    employeeId: 0,
    status: 0,
    type: '',
    content: '',
    date: '',
    note: ''
};
