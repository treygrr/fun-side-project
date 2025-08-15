import SchemaCollector from '../util/SchemaCollector'
import { BookSchema } from './Book.schema'
import { TestSchema } from './Test.schema'

const schema = new SchemaCollector();

schema.register(new BookSchema())
schema.register(new TestSchema())

export const generatedSchema = schema.generateSchema();
