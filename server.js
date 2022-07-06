const express = require('express')
const {ApolloServer} = require('apollo-server-express')


const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolver');

async function startServer(){
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app : app});

    app.use((req,res) => {
        res.send('Apollo Server is On');
    })

    app.listen(process.env.PORT, () => {
        console.log('Server is running');
    })
}

startServer();

