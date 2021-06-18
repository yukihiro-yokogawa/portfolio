import { ProjectState } from "./Project";

export type SideBarStates = {
  projects: Array<ProjectState>;
  sideBar: Array<SideBarState>;
  selectedIndex: number;
  handleClick: (arg1: number) => void;
};

type SideBarState = {
  id: number;
  name: string;
};
