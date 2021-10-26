import { GraphQLServer } from 'graphql-yoga';

// Type definitiions- application schema
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    title() {
      return 'Nike AirMax';
    },
    price() {
      return 224.99;
    },
    releaseYear() {
      return 2020;
    },
    rating() {
      return null;
    },
    inStock() {
      return true;
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
