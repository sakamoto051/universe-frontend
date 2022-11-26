export const LoginFormRules = {
    email: {
        required: true,
    },
    password: {
        required: true,
        minLength: 8,
        maxLength: 32,
    },
}