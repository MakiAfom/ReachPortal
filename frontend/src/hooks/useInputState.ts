import { ChangeEvent, useReducer } from "react";

interface InputState {
  enteredValue: string;
  isInputBlurred: boolean;
}

interface ChangeAction {
  type: "CHANGE";
  payload: {
    value: string;
  };
}

interface BlurAction {
  type: "BLUR";
}

interface ResetAction {
  type: "RESET";
}

type InputAction = ChangeAction | BlurAction | ResetAction;

function inputReducer(state: InputState, action: InputAction) {
  switch (action.type) {
    case "CHANGE":
      return {
        enteredValue: action.payload.value,
        isInputBlurred: state.isInputBlurred,
      };
    case "BLUR":
      return {
        enteredValue: state.enteredValue,
        isInputBlurred: true,
      };
    case "RESET":
      return {
        enteredValue: "",
        isInputBlurred: false,
      };
  }
}

interface InputStateOptions {
  initVal?: string;
  validator(value: string): string | null;
}

export default function useInputState({
  initVal = "",
  validator,
}: InputStateOptions) {
  const [state, dispatch] = useReducer(inputReducer, {
    enteredValue: initVal,
    isInputBlurred: false,
  });

  const { enteredValue, isInputBlurred } = state;

  const errMsg = validator(enteredValue);
  const isInputValid = !errMsg;
  const inputHasError = isInputBlurred && !!errMsg;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "CHANGE", payload: { value: e.target.value } });
  const handleBlur = () => dispatch({ type: "BLUR" });
  const reset = () => dispatch({ type: "RESET" });

  return {
    enteredValue,
    errMsg,
    isInputValid,
    inputHasError,
    handleChange,
    handleBlur,
    reset,
  };
}
