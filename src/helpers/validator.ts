import { Rules } from "../interfaces/validations/validationFormInterface";
import { isEmpty, minLength, isEmail} from "./validations";
import { Validations } from "../enums/enumsValidations";


  export class Validator {

    errors: Array<string> = [];

    checkruleExists(rules : Rules, key : string ) : boolean {
        return Object.prototype.hasOwnProperty.call(rules,key);
    }

    buildMessage(rules : Rules, message: string){
        if(Object.prototype.hasOwnProperty.call(rules, "message")){
            return rules.message
        }
        return message
    }

    validate(value: string , rules: Rules) {

      this.errors = [] 
      if (typeof rules === "object" && Object.keys(rules).length > 0) {

        const isRequired: boolean = this.checkruleExists(rules, Validations.required) 

        if (isRequired && isEmpty(value)) {
            const message = this.buildMessage(rules,`Es obligatorio` );
            this.errors.push(message);
        }
      
        if (!isEmpty(value) && this.checkruleExists(rules,Validations.minLength) && !minLength(value, rules.minLength)) {
            const message = this.buildMessage(rules,`Debe tener un largo mayor a ${rules.minLength}` );
            this.errors.push(message);
        }

        if (!isEmpty(value) && this.checkruleExists(rules, Validations.email)  && !isEmail(value)) {
            const message = this.buildMessage(rules,`Email inválido` );
            this.errors.push(message);
        }
      } else {
        throw Error("Params incorrect");
      }
    }

    get getErrors() : Array<string>{
      return this.errors
    }
  }