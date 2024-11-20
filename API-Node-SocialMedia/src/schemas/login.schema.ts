import {object, string} from 'zod'
// trhis "string" is a function from zod

const loginSchema = object({

    email: string ({required_error: "Name is requeried"})
        .email("Not a valid email"),
    password: string ({required_error: "Name is requeried"})
        .min(8, "Password must have at least 8 digits")

})

export default loginSchema