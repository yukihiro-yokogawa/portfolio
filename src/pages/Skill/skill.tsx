import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Skill from "~/container/Skill/Skill";
import { getSkillsByDeletedAsync } from "~/ducks/Slice/SkillSlice";
import { getTechniqueTypeAsync } from "~/ducks/Slice/TechniqueTypeSlice";

const skill: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechniqueTypeAsync());
    dispatch(getSkillsByDeletedAsync());
  }, [dispatch]);

  return (
    <div>
      <Skill />
    </div>
  );
};

export default skill;
