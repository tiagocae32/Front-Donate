import { InputsTypes } from "../../types/InputsTypes";
import { Validations } from "../validations/validationFormInterface";


export interface BaseProps {
        key : string,
        type : InputsTypes,
        validations?: Validations,
        placeholder? : string,
        state?: boolean | null;
        value?: any;
        errors?: Array<string>;
}

export interface PropsInput extends BaseProps {}

export interface GeneratedInputs extends PropsInput {}
