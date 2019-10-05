import React from 'react';
import propTypes from 'prop-types';


let touched = false;

const InputComponents = props => {
    // state for touched(text fields touched)

    // error element - null as initial value
    let element = null;

    // check if validation props is set to true
    if(props.validate) {
        //  set variable that state the validity
        let isValid = true;
        // if props.validations is exists and touched state is set to true
        if(props.validations && touched) {
            
            // storing validation object in variable
            const validations = props.validations;
            // validations for required fields
            if(validations.required && isValid) {

                // check value if empty(white space is not included)
                isValid = props.inputProps.value.trim() !== '';

                // assign error element
                element = ( 
                    !isValid ? 
                    <p className="error-message">
                        {
                            validations.required ? 
                            validations.required.message : 'This field is required.'
                        }
                    </p> :
                    null
                );
            }

            // validation for maximum length of characters
            if(validations.maxLength && isValid) {
                isValid = props.inputProps.value.length <= validations.maxLength.value;
                element = (
                    !isValid ? 
                    <p className="error-message">
                        {
                            validations.maxLength && validations.maxLength.message ? 
                            validations.maxLength.message : `The value must be less than ${validations.maxLength.value}.`
                        }
                    </p> :
                    null
                );
            }

            // validations for minimum length of characters
            if(validations.minLength && isValid) {
                isValid = props.inputProps.value.length >= validations.minLength.value;
                element = (
                    !isValid ? 
                    <p className="error-message">
                        {
                            validations.minLength && validations.maxLength.message ? 
                            validations.minLength.message : `The value must be more than ${validations.minLength.value}.`
                        }
                    </p> : 
                    null
                );
            } 

            // validations for valid email address
            if(validations.isEmail && isValid) {
                // valid email address pattern(regular expression)
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                // testing pattern
                isValid = pattern.test( props.inputProps.value );
                element = (
                    !isValid ? 
                    <p className="error-message">
                        {
                            validations.isEmail && validations.isEmail.message ? 
                            validations.isEmail.message : `The value must be a valid email address.`
                        }
                    </p> :
                    null
                );
            }

            // validations for numeric, checking of value if number
            if(validations.isNumeric && isValid) {
                const pattern = /^[0-9]\d*(\.\d+)?$/;
                isValid = pattern.test( props.inputProps.value );
                element = (
                    !isValid ? 
                    <p className="error-message">
                        {
                            validations.isNumeric && validations.isNumeric.message ? 
                            validations.isNumeric.message : `The value must be numeric.`
                        }
                    </p> :
                    null
                );
            }

            // custom validations with rules using regular expression
            if(validations.custom && validations.custom.rules && isValid) {
                // check if other rules is valid
                isValid = validations.custom.rules.test( props.inputProps.value );
                // replacing error element
                element = (
                    !isValid ? 
                    <p className="error-message">
                        {
                            validations.custom && validations.custom.message ? 
                            validations.custom.message : `The value is invalid.`
                        }
                    </p> :
                    null
                );
            }

            if(validations.sameWith && isValid) {
                isValid = props.inputProps.value === validations.sameWith.value;

                element = (
                    !isValid ? 
                    <p className="error-message">
                        {
                            validations.sameWith && validations.sameWith.message ? 
                            validations.sameWith.message : `The two fields are not the same.`
                        }
                    </p> :
                    null
                ); 
            }

            if(validations.alpha && isValid) {
                // alphabet only format
                isValid = /^[a-zA-Z]+$/.test(props.inputProps.value);

                element = (
                    !isValid ? 
                    <p className="error-message">
                        {
                            validations.alpha && validations.alpha.message ? 
                            validations.alpha.message : `The value must be alphabet only.`
                        }
                    </p> :
                    null
                ); 
            }

            if(validations.alphaNum && isValid) {

                // check if valid alpha numeric
                isValid = /^[a-zA-Z0-9]+$/.test(props.inputProps.value);

                element = (
                    !isValid ? 
                    <p className="error-message">
                        {
                            validations.alphaNum && validations.alphaNum.message ? 
                            validations.alphaNum.message : `The value must be alpha numeric only.`
                        }
                    </p> :
                    null
                ); 
            }

            if(validations.isArray && isValid) {

                // check if value is valid array
                isValid = Array.isArray(props.inputProps.value);

                element = (
                    !isValid ? 
                    <p className="error-message">
                        {
                            validations.array && validations.array.message ? 
                            validations.array.message : `The value must be a valid array.`
                        }
                    </p> :
                    null
                );
            }

            if(validations.file && isValid) {

                const fileValue = validations.file.file;

                // validation for file extensions
                if(validations.file && validations.file.ext) {
                    // docx|doc|pdf|xml|bmp|ppt|xls
                    const fileFormat = new RegExp(`(.*?)\.(${validations.file.ext})$`);
                    // check if value is valid array
                    isValid = fileFormat.test(fileValue.name.toLowerCase());

                    element = (
                        !isValid ? 
                        <p className="error-message">
                            {
                                validations.array && validations.array.message ? 
                                validations.array.message : `The file must be a file type: ${validations.file.ext}.`
                            }
                        </p> :
                        null
                    );
                }
                
                // validation for file extensions
                if(validations.file && validations.file.maxSize && isValid) {
                    const val = fileValue.size;
                    // check if value is valid array
                    isValid = validations.file.maxSize > val;

                    element = (
                        !isValid ? 
                        <p className="error-message">
                            {
                                validations.array && validations.array.message ? 
                                validations.array.message : `The filesize exceed the maximum required size.`
                            }
                        </p> :
                        null
                    );
                }
            }
        }
    }

    const onChangeFunc = (e) => {

        // return onChange function made by users
        if(props && props.hasOwnProperty('onChange')) {
            props.onChange(e);
        }

        // set touched to true if user typed on input
        touched = true;
    }

    // returns component to view
    return (
        // set form field container
        <div className={props.containerClass}>
            <label {...props.labelProps}>{props.label}</label>
            <input {...props.inputProps} className={props.inputClass.concat(element ? ' input-error' : '')} onChange={(e) => onChangeFunc(e)} />
            {element}
        </div>
    );
}

InputComponents.propTypes = {
    label: propTypes.string,        // label text
    containerClass: propTypes.string,   // custom class of input container
    inputProps: propTypes.object,   // input props e.g(type, placeholder, etc)
    labelProps: propTypes.object,   // label props e.g(className, for)
    validations: propTypes.object,  // all validations on input
    inputClass: propTypes.string,   // class for input type separate to make it dynamic
    onSubmitValidation: propTypes.bool,  // if set to true validations will on submitting event, if set to false the validation is on change of the input type, default is true,
    onChange: propTypes.func,        // input type on change function
    validate: propTypes.bool       // if set to false the validation will disable, default is true
}

InputComponents.defaultProps = {
    label: 'No Label',
    containerClass: 'form-group',
    inputProps: {
        placeholder: 'Form Input',
        type: 'text'
    },
    inputClass: 'form-control',
    validations: {},
    validate: true
}

export default InputComponents;