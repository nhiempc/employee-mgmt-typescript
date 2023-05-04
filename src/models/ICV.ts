export type IWorkExperience = {
    workExpId?: number;
    company: string | null | undefined;
    position: string | null | undefined;
    detail: string | null | undefined;
    startDate: string | null | undefined;
    endDate: string | null | undefined;
};

export type ICV = {
    careerGoal: string | null | undefined;
    skill: string | null | undefined;
    hobby: string | null | undefined;
    workExperiences: IWorkExperience[];
};

export const initCV = {
    careerGoal: '',
    skill: '',
    hobby: '',
    workExperiences: []
};
