import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Create from "~/component/Skill/Create";
import { useStoreState } from "~/ducks/selector";
import { postSkillAsync } from "~/ducks/Slice/SkillSlice";
import { SkillStates } from "~/Type/Skill";
import { AutoCompleteVersionState, TechniqueState } from "~/Type/Technique";

const create = (): JSX.Element => {
  const dispatch = useDispatch();

  // version入力部分のオートコンプリート.
  const [autoCompleteVersions, setAutoCompleteVersions] = useState([]);
  const { skills, techniques } = useStoreState();

  /**
   * TechniqueのTextFieldコンポーネントで使用されるAutoComplete配列を生成する関数.
   */
  const autoCompleteTechniques = useMemo(() => {
    return _(techniques)
      .map((technique) => {
        return { name: technique.name, type: technique.techniqueType.name };
      })
      .uniqBy("name")
      .value();
  }, [techniques]);

  useEffect(() => {
    const defaultAutoCompleteVersions = [];
    _.forEach(skills, (skill, index) => {
      const autoCompleteVersion = {
        id: index,
        autoComplete: _(techniques)
          .filter((technique) => {
            return technique.name == skill.technique.name;
          })
          .map((technique) => {
            return { id: technique.id, name: technique.version, type: "" };
          })
          .value(),
      };
      defaultAutoCompleteVersions.push(autoCompleteVersion);
    });
    setAutoCompleteVersions([...defaultAutoCompleteVersions]);
  }, [skills, techniques]);

  /**
   * TechniqueのTextFieldコンポーネントが変更された際に実行される、VersionのTextFieldコンポーネントで使用するAutoCompleteオブジェクトを生成するイベントハンドラ.
   */
  const handleChangeTechnique = (
    event: React.ChangeEvent<any>,
    index: number
  ) => {
    const key = _.findKey(autoCompleteVersions, (autoCompleteVersion) => {
      return autoCompleteVersion.id == index;
    });
    const autoCompleteVersion = _(techniques)
      .filter((technique) => {
        return technique.name == event.target.outerText;
      })
      .map((technique) => {
        return { id: technique.id, name: technique.version, type: "" };
      })
      .value();
    if (!key) {
      const newAutoCompleteVersion: AutoCompleteVersionState = {
        id: index,
        autoComplete: autoCompleteVersion,
      };
      setAutoCompleteVersions([
        ...autoCompleteVersions,
        newAutoCompleteVersion,
      ]);
    } else {
      autoCompleteVersions[key].autoComplete = autoCompleteVersion;
      setAutoCompleteVersions([...autoCompleteVersions]);
    }
  };

  /**
   * Skillを登録する際に実行される、登録用イベントハンドラ.
   *
   * @param {SkillStates} skillsDataForm
   */
  const handleSubmit = (skillsDataForm: SkillStates) => {
    let oldSkills = skills;
    _.forEach(skillsDataForm.skills, (skillData) => {
      skillData.deleted = false;
      const existSkill = _.find(skills, (skill) => {
        return (
          skill.technique.name == skillData.technique.name &&
          skill.technique.version == skillData.technique.version
        );
      });
      oldSkills = _.without(oldSkills, existSkill);
      if (typeof existSkill !== "undefined") {
        skillData.id = existSkill.id;
        skillData.technique = existSkill.technique;
        return;
      }
      const technique: TechniqueState = _.find(techniques, (technique) => {
        return technique.name == skillData.technique.name;
      });
      if (typeof technique !== "undefined") {
        skillData.technique.id = technique?.id;
        skillData.technique.techniqueType = technique?.techniqueType;
      }
    });
    _.forEach(oldSkills, (oldSkill) => {
      skillsDataForm.skills.push({ ...oldSkill, deleted: true });
    });
    dispatch(postSkillAsync(skillsDataForm));
  };

  return (
    <>
      <Create
        autoCompleteTechniques={autoCompleteTechniques}
        autoCompleteVersions={autoCompleteVersions}
        handleChangeTechnique={handleChangeTechnique}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default create;
