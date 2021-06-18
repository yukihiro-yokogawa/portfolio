import { useMemo } from "react";
import Skill from "~/component/Skill/Skill";
import { useStoreState } from "~/ducks/selector";
import _ from "lodash";

const skill: React.FC = () => {
  const { skills, techniqueTypes } = useStoreState();

  const mySkillsCreate = useMemo(() => {
    const mySkills = [];
    _(techniqueTypes).forEach((techniqueType) => {
      const mySkill = {};
      const skillsGroupByTechniqueType = _(skills)
        .filter((skill) => {
          return techniqueType.name === skill.technique.techniqueType.name;
        })
        .map((skill) => {
          return {
            level: skill.level,
            deleted: false,
            technique: {
              name: `${skill.technique.name}`,
              version: `${
                skill.technique.version === ""
                  ? ""
                  : ` ${skill.technique.version}`
              }`,
            },
          };
        })
        .value();
      mySkill["techniqueType"] = techniqueType.name;
      mySkill["techniques"] = skillsGroupByTechniqueType;
      mySkills.push(mySkill);
    });
    return mySkills;
  }, [skills, techniqueTypes]);

  return (
    <>
      <Skill mySkills={mySkillsCreate} />
    </>
  );
};

export default skill;
