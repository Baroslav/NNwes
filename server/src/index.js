const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
 type News {
    title : String,
    content : String,
    time : String,
  }
  type Query {
    news : [News]
  }

  type Mutation {
    createNews(title: String!, content: String! , time : String!) : News 
  }
`;

const news = [
  {
    title: 'The Awakening',
    content: 'Kate Chopin',
    time : "16.02.2003"
  },
  {
    title: 'City of Glass',
    content: 'Paul Auster',
    time : "16.02.2003"
  },
];

const resolvers = {
  Query: {
    news: () => news,
  },
  Mutation: {
      createNews : (parent, args)=> {
      const newNews = {
        title : args.title,
        content : args.content,
        time : args.time
      }
      news.push(newNews)
      return newNews
    }
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});