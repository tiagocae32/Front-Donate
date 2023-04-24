

export interface Rules {
    required?: boolean;
    minLength?: number;
    contain?: Array<string | number>;
    email?: boolean;
    message?: string;
    string?: boolean;
    number?: boolean;
  }

  export interface Messages {
    required?: string;
    minLength?: string;
    maxLength?: string;
    contain?: string;
    email?: string;
    message?: string;
    string?: string;
    number?: string;
  }

  export interface Validations {
    rules : Rules,
    messages? : Messages
}