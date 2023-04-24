import { GeneratedInputs } from "../interfaces/form/PropsForm"

export const checkInputsError = (inputs : GeneratedInputs[]) : boolean => inputs.some(input => input.state);
