import React from "react";
import { useDispatch } from "react-redux";
import NetworkRegisterModal from "~/component/Modal/NetworkRegisterModal";
import { useStoreState } from "~/ducks/selector";
import { requestSwitcher } from "~/ducks/Slice/NetworkSlice";

const networkRegisterModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const networkState = useStoreState().network;

  const handleClose = () => {
    dispatch(requestSwitcher());
  };

  return (
    <>
      <NetworkRegisterModal
        networkState={networkState}
        handleClose={handleClose}
      />
    </>
  );
};

export default networkRegisterModal;
