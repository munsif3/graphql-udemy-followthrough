import { GraphQLServer } from 'graphql-yoga';

// Type definitiions- application schema
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'My first query!';
    },
    name() {
      return 'Munsif';
    },
    location() {
      return 'Colombo';
    },
    bio() {
      return 'Happy';
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('Server running on port 4000');
});
