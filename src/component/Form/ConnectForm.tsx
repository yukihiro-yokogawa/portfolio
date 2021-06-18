import { useFormContext } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ConnectForm = ({ children }) => {
  const methods = useFormContext();
  return children({ ...methods });
};
