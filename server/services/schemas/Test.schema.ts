import type { ISchema } from '../util/ISchema'
import { gql } from 'graphql-tag'

export class TestSchema implements ISchema {
  typeDefs = () => gql`
    type Query {
      goodbye: String
    }
  `;

  resolvers = {
    Query: {
      goodbye: () => 'goodbye world',
    },
  };
}
