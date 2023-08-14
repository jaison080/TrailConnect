/**
 * 
 * @param  validationArray Expected format:
 *   [
 *     [boolean, 'Error message'],
 *     [boolean, 'Error message'],
 *     ...
 *   ]
 * 
 * if boolean is false, then the error message is added to the errors array
 * @returns { isValid: boolean, errors: string[]}
 */
export function validate(validationArray) {
    const errors = [];
 
    validationArray.forEach((validation) => {
        if(!validation[0]) {
            errors.push(validation[1]);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    }
}

export function required(value) {
    return value && value.length > 0;
}

