

export const isEmpty = (value: string | object) : boolean => {
    
    if(!value)return true
    switch(typeof value){
        case "string":
            return !value || value.length === 0;
        case "object":
            if(Array.isArray(value)) return value.length === 0
            else return Object.keys(value).length === 0    
    }
}; 

export const minLength = (value: string, min: number): boolean => value.length >= min; // Return true if condition succed
export const maxLength = (value: string, max: number): boolean => value.length <= max;


export const isEmail = (value: string): boolean =>
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value);


/*export const isEmpty = (value: any): boolean => {
    return (
      value == undefined ||
      value === null ||
      value === "" ||
      (value && typeof value !== "number" && Object.keys(value).length === 0) ||
      (value &&
        typeof value !== "number" &&
        Array.isArray(value) &&
        value.length === 0)
    );
}*/