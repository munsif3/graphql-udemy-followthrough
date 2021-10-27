import { GraphQLServer } from 'graphql-yoga';

const users = [
  {
    id: '123123',
    name: 'Munsif',
    email: 'munsif@munsif.com',
    age: 26,
  },
  {
    id: '123456',
    name: 'Sara',
    email: 'sara@sara.com',
  },
  {
    id: '456456',
    name: 'Jack',
    email: 'jack@jack.com',
  },
];

const posts = [
  {
    id: '123',
    title: 'Apple',
    body: 'Bite apple',
    published: true,
  },
  {
    id: '124',
    title: 'Orange',
    body: 'Bite orange',
    published: false,
  },
  {
    id: '125',
    title: 'Kiwi',
    body: 'Eat kiwi',
    published: true,
  },
];

// Type definitiions- application schema
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()));
    },

    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
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
