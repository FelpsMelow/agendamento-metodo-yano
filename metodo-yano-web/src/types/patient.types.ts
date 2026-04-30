export type Patient = {
  _id: string;
  legacyId?: number;
  name: string;
  email?: string;
  cpf?: string;
  scapularWaist?: string;
  pelvicWaist?: string;
  phones?: { phone1?: string; phone2?: string; mobile1?: string; mobile2?: string; allNormalized?: string[] };
};

export type PatientsListResponse = { items: Patient[]; page: number; limit: number; total: number };
