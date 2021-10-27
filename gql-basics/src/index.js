import { GraphQLServer } from 'graphql-yoga';

// Type definitiions- application schema
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
				add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello ${args.name}, you're my favourite ${args.position}`;
      }
      return 'Hello!';
    },

    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }
      return args.numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
    },

    grades(parent, args, ctx, info) {
      return [78, 89, 93];
    },

    me() {
      return {
        id: 'ABC-123456',
        name: 'Munsif M',
        email: 'munsif@munsif.com',
      };
    },

    post() {
      return {
        id: 'xya-09876',
        title: 'How to be happy',
        body: 'Smile and help others',
        published: true,
      };
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
