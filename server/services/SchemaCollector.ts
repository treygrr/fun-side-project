import { mergeTypeDefs } from '@graphql-tools/merge';
import type { ISchema } from './ISchema';

export default class SchemaCollector {
  private schemas: ISchema[] = []

  register(schemaOrSchemas: ISchema | ISchema[]): ISchema[] {
    if (Array.isArray(schemaOrSchemas)) {
      this.schemas.push(...schemaOrSchemas);
      return this.schemas
    } else if (schemaOrSchemas) {
      this.schemas.push(schemaOrSchemas);
      return this.schemas
    }
    return this.schemas
  }

  getSchemas(): ISchema[] {
    return this.schemas
  }

  /**
   * Merge all registered ISchema into a single ISchema
   */
  generateSchema(): ISchema {
    // Merge typeDefs as DocumentNodes
    const typeDefsArr = this.schemas.map(s => s.typeDefs());
    const mergedTypeDefs = mergeTypeDefs(typeDefsArr);
    // Merge resolvers (shallow merge)
    const resolversArr = this.schemas.map(s => s.resolvers);

    const builderResolver: { Query?: Record<string, unknown>, Mutations?: Record<string, unknown> } = {
      Query: {},
      Mutations: {},
    }

    for (const resolver of resolversArr) {
      console.log(resolver)
      if (resolver.Query) {
        builderResolver.Query = {
         ...builderResolver.Query,
         ...resolver.Query
        }
      }
      if (resolver.Mutation) {
        builderResolver.Mutations = {
          ...builderResolver.Mutations,
          ...resolver.Mutation
        }
      }
    }

    // Remove Query or Mutations if they are empty objects (GraphQL-yoga and Apollo expect them to be omitted, not empty)
    if (builderResolver.Query && Object.keys(builderResolver.Query).length === 0) {
      delete builderResolver.Query;
    }
    if (builderResolver.Mutations && Object.keys(builderResolver.Mutations).length === 0) {
      delete builderResolver.Mutations;
    }

    return {
      typeDefs: () => mergedTypeDefs,
      resolvers: builderResolver
    };
  }
}