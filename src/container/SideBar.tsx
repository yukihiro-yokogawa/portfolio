import React from "react";
import SideBar from "~/component/SideBar";
import { SideBarStates } from "~/Type/SideBar";

const sideBar = (props: SideBarStates): JSX.Element => {
  const createSideBar = () => {
    const sideBarWorks = [];
    props.projects.map((project) => {
      const sideBarWork = {
        id: project.id,
        name: project.name,
      };
      sideBarWorks.push(sideBarWork);
    });
    return sideBarWorks;
  };

  return (
    <>
      <SideBar
        projects={props.projects}
        sideBar={createSideBar()}
        selectedIndex={props.selectedIndex}
        handleClick={(projectId: number) => props.handleClick(projectId)}
      />
    </>
  );
};

export default sideBar;
