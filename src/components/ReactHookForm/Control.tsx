import Input from "./Input";

export const CONTROL_TYPE = {
  INPUT: "input",
};

type ControlProps = {
  name: string;
  [key: string]: any;
};
const Control = (props: ControlProps) => {
  const { control, ...rest } = props;
  switch (control) {
    case CONTROL_TYPE.INPUT:
      return <Input {...rest} />;
    default:
      return null;
  }
};
export default Control;
