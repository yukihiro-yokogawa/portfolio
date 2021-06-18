import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import { Button } from "@material-ui/core";

const ContentAddButton = (props: {
  linkHref: string;
  linkAs: string;
  query: any;
  type: string;
}): JSX.Element => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      fab: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
    })
  );

  return (
    <>
      <Link
        href={{
          pathname: props.linkHref,
          query:
            props.query == "new"
              ? "param=new"
              : `param=${JSON.stringify(props.query)}`,
        }}
        as={props.linkAs}
      >
        {props.type == "new" ? (
          <Fab aria-label="Add" className={useStyles().fab} color="primary">
            <AddIcon />
          </Fab>
        ) : (
          <Button
            disabled={props.query == 0}
            variant="contained"
            color="primary"
            size="large"
          >
            edit
          </Button>
        )}
      </Link>
    </>
  );
};

export default ContentAddButton;
