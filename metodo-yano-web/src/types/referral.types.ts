export type Referral = {
  _id: string;
  name: string;
  nameNormalized: string;
};

export type ReferralsListResponse = {
  items: Referral[];
  page: number;
  limit: number;
  total: number;
};

export type ReferralPayload = {
  name: string;
};
