import gql from 'graphql-tag';
import type { ISchema } from '../ISchema'

export class BookSchema implements ISchema {
  typeDefs = () => gql`
    type Book {
      title: String
      author: String
    }
    type Query {
      books: [Book]
    }
  `;

  resolvers = {
    Query: {
      books: () => [
        { title: '1984', author: 'George Orwell' },
        { title: 'Brave New World', author: 'Aldous Huxley' },
      ],
    },
  };
}