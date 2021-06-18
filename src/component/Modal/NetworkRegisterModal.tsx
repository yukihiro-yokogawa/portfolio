import {
  Modal,
  Backdrop,
  Fade,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { NetworkState } from "~/Type/Network";

const networkSucessRegisterModal = (props: {
  networkState: NetworkState;
  handleClose;
}): JSX.Element => {
  const { networkState, handleClose } = props;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      paperSuccess: {
        backgroundColor: theme.palette.success.light,
        color: "white",
        textAlign: "center",
        padding: theme.spacing(2, 4, 3),
        width: "100%",
      },
      paperError: {
        backgroundColor: "rgba(255,0,0,0.5)",
        color: "white",
        textAlign: "center",
        padding: theme.spacing(2, 4, 3),
        width: "100%",
      },
    })
  );
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={networkState.success != null ? true : false}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={networkState.success != null ? true : false}>
          <div
            className={
              networkState.success != null && networkState.success
                ? classes.paperSuccess
                : networkState.failure != null && networkState.failure
                ? classes.paperError
                : null
            }
          >
            <h2 id="transition-modal-title">
              {networkState.success != null && networkState.success
                ? "Success"
                : networkState.failure != null && networkState.failure
                ? "ERROR"
                : null}
            </h2>
            <p id="transition-modal-description">
              {networkState.success != null && networkState.success
                ? "登録が完了しました"
                : networkState.failure != null && networkState.failure
                ? "サーバーとの通信に失敗しました"
                : null}
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default networkSucessRegisterModal;
