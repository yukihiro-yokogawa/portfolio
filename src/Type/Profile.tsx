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
	displayOrder: number;
};

export type ProfileCreateState = {
	handleSubmit: (event: unknown) => void;
};
