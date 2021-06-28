import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import _ from "lodash";
import Create from "~/component/Work/Create";
import { ProjectState } from "~/Type/Project";
import { AboutState } from "~/Type/About";
import { useStoreState } from "~/ducks/selector";
import { useDispatch } from "react-redux";
import { AutoCompleteVersionState } from "~/Type/Technique";
import { postProjectAsync } from "~/ducks/Slice/ProjectSlice";
import { ProjectContext } from "~/pages/Work/create";

/**
 * Work新規追加フォームのロジックコンポーネント.
 *
 * @return {*}  {JSX.Element}
 */
const create = (): JSX.Element => {
  const dispatch = useDispatch();
  const { techniques, abouts } = useStoreState();

  const { projectTechniques, projectAbouts } = useContext(ProjectContext);

  // version入力部分のオートコンプリート.
  const [autoCompleteVersions, setAutoCompleteVersions] = useState([]);

  // project詳細のDOM変更用変数.
  const aboutFieldList =
    projectAbouts.length == 0
      ? []
      : _.map(projectAbouts, (projectAbout) => {
          return projectAbout.about.name;
        });

  // aboutsの値が変更しないならキャッシュから取得.
  const aboutsArr = useMemo(() => {
    const createAbouts = [];
    _.forEach(abouts, (about: AboutState) => {
      createAbouts.push(about.name);
    });
    return createAbouts;
  }, [abouts]);

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
    _.forEach(projectTechniques, (skill, index) => {
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
  }, [projectTechniques, techniques]);

  /**
   * TechniqueのTextFieldコンポーネントが変更された際に実行される、VersionのTextFieldコンポーネントで使用するAutoCompleteオブジェクトを生成するイベントハンドラ.
   */
  const handleChangeTechnique = useCallback(
    (event: React.ChangeEvent<any>, index: number) => {
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
    },
    [techniques, autoCompleteVersions]
  );

  /**
   * サブミット時のイベント.
   *
   * @param {*} event
   */
  const handleSubmit = useCallback(
    (projectDataForm: ProjectState) => {
      _(projectDataForm.projectAbouts).forEach((projectAbout) => {
        projectAbout.about.id = _.find(abouts, (about) => {
          return about.name == projectAbout.about.name;
        }).id;
      });
      _(projectDataForm.projectTechniques).forEach((projectTechnique) => {
        projectTechnique.technique.id = _.find(techniques, (technique) => {
          projectTechnique.technique.version = projectTechnique.technique.version.trim();
          return (
            technique.name === projectTechnique.technique.name &&
            technique.version === projectTechnique.technique.version
          );
        }).id;
      });
      _(projectDataForm.projectTechniques).forEach((projectTechnique) => {
        const techniqueType = _.find(techniques, (technique) => {
          return technique.name === projectTechnique.technique.name;
        }).techniqueType;
        projectTechnique.technique.techniqueType = {
          id: techniqueType.id,
          name: techniqueType.name,
          displayOrder: techniqueType.displayOrder,
        };
      });
      dispatch(postProjectAsync(projectDataForm));
    },
    [abouts, dispatch, techniques]
  );

  return (
    <>
      <Create
        abouts={aboutsArr}
        aboutFieldList={aboutFieldList}
        autoCompleteTechniques={autoCompleteTechniques}
        autoCompleteVersions={autoCompleteVersions}
        handleChangeTechnique={handleChangeTechnique}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default create;
