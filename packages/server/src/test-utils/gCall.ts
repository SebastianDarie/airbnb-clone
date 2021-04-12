import { graphql, GraphQLSchema } from 'graphql';
import { buildSchema, Maybe } from 'type-graphql';
import { UserResolver } from '../resolvers/user';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    });
  }
  return graphql({
    schema,
    source,
    variableValues,
  });
};
