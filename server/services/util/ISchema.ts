import type { DocumentNode } from 'graphql';
import type { IResolvers } from '@graphql-tools/utils';

export interface ISchema {
  typeDefs: () => DocumentNode;
  resolvers: IResolvers;
}