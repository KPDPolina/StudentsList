export const Validator = {
    errors: {},
    validators: {
        isNotEmpty: {
            validate(value) {       
                return value !== "";
            },
            message: "This field should not be blank",
            errorType: 'required'
        },

        isNumber: {
            validate(value) {       
                return !isNaN(value);
            },
            message: "This field should be a number",
            errorType: 'number'
        }
    },
    validate(config, form) {
        if(!(form instanceof HTMLFormElement)) {
            throw {
                name: 'ValidationError',
                message: 'You should pass HTML Form'
            }
        }
        this.errors = {};

        let elements = form.elements;

        for( const [inputName, validators] of Object.entries(config)) {
         

            if(!validators?.length) {
                throw {
                    name: 'ValidationError',
                    message: `No handler to validate ${inputName}`
                }
            }

            if(!elements[inputName]) {
                throw {
                    name: 'ValidationError',
                    message: `${inputName} does not exist in the ${form.name}`
                } 
            }
            
            let value = elements[inputName].value;
         

            validators.forEach(({validate, message, errorType}) => {
                
                if(!validate(value)) {
                    this.errors[inputName] = {...this.errors[inputName], [errorType]: message};
                }
            })
        }

        return this.hasErrors();
    },

    hasErrors() {
        return !Object.keys(this.errors).length != 0;
    }
}

Validator.validators.maxLength = function(length) {
    return {
        validate(value) {       
            return value.length <= length;
        },
        message: `This field should not be more then ${length}`,
        errorType: 'maxLength'
    }
}

export const isNotEmpty = Validator.validators.isNotEmpty;
export const isNumber = Validator.validators.isNumber;
export const maxLength = Validator.validators.maxLength;