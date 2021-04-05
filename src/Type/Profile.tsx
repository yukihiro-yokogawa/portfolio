export type MyProfileState = {
	id: number;
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
	profileFieldList: Array<number>;
	handleClickAddProfile: () => void;
	handleClickDeleteProfile: (value: number, index: number) => void;
	handleSubmit: (event: unknown) => void;
};

export type MyProfileDataState = {
	profiles: Array<{ static: MyProfileState; dynamic: Array<MyProfileState> }>;
};
