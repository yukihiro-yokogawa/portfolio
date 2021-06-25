export type MyProfileState = {
  id: number;
  title: string;
  description: string;
  date: string;
  deleted: boolean;
  profile: ProfileState;
};

export type MyProfileDataState = {
  id: number;
  myProfileId: number;
  title: string;
  description: string;
  date: string;
  deleted: boolean;
  profile: ProfileState;
};

export type ProfileState = {
  id: number;
  name: string;
  dateType: boolean;
  displayOrder: number;
};

export type ProfileCreateState = {
  handleSubmit: (event: unknown) => void;
};

export type MyProfilesDataState = {
  introduction: MyProfileDataState;
  careers: Array<MyProfileDataState>;
};
