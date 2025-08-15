import { createSchema } from 'graphql-yoga'
import { generatedSchema } from './schemas'

export const schema = createSchema(generatedSchema)