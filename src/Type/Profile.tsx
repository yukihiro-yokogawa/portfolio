export type ProfileState = {
	id: number;
	title: string;
	description: string;
	profileInformation: ProfileContentState;
};

export type ProfileContentState = {
	id: number;
	name: string;
	displayOrder: number;
};

export type ProfileCreateState = {
	handleSubmit: (event: unknown) => void;
};
