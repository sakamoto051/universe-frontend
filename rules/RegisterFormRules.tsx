export const RegisterFormRules = {
    name: {
        required: 'Please enter name.',
        maxLength: { value: 128, message: 'Please enter passowrd at most 128 characters.' },
    },
    email: {
        required: 'Please enter email.',
    },
    password: {
        required: 'Please enter password.',
        minLength: { value: 8, message: 'Please enter passowrd at least 8 characters.' },
    },
}