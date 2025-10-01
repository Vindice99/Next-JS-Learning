import {z} from 'zod'

const schema = z.object({
    name: z.string().min(20),
    email: z.string(),
    age: z.number()
})
export default schema;