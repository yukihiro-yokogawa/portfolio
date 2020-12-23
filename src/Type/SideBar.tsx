export type SideBarStates = {
	sideBar: Array<SideBarState>;
	handleClick: (arg1: number) => void;
};

type SideBarState = {
	id: number;
	name: string;
};
