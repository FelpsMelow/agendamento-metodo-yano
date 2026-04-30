export type ProfessionalListItem = {
  _id: string;
  clinicId: string;
  name: string;
  email: string;
  role: string;
  isProfessional: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProfessionalListResponse = {
  items: ProfessionalListItem[];
};
