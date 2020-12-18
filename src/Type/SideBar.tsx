export type SideBars = {
	sideBar: Array<SideBar>;
	handleClick: (arg1: number) => void;
};

type SideBar = {
	id: number;
	name: string;
};
