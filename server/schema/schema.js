// Create Mongoose models (we do this in order to query the database)
const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  graphql,
} = require("graphql");

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    // to add a relationship to different resources, we need to add a field that returns the related resource
    client: {
      type: ClientType,
      resolve(parent, args) {
        // Parent is a child of the project
        console.log({ parent });
        console.log({ args });
        // The projects have a clientId field and it pertains to the id of the client
        // return clients.find((client) => client.id === parent.clientId);
        return Client.findById(parent.clientId); // parent refers to the project (in our Projectl.js, we have a clientId field)
      },
    },
  }),
});

// CLIENT TYPE: takes name and fields
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// To make a query, for example to get a client by the id, you need a Root Query Object
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        console.log({ args });
        // return projects;
        return Project.find(); // returns an array of all the projects
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log({ args });
        // return projects.find((project) => project.id === args.id);
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        console.log({ args });
        // return clients;
        return Client.find(); // returns an array of all the clients
      },
    },

    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      // whatever we want to RETURN will go in the RESOLVER.
      resolve(parent, args) {
        // console.log({ parent }); // parent is the query { parent: undefined }
        console.log(args); // returns the id ({ id: '1' })
        // return clients.find((client) => client.id === args.id);
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

// DETAILED NOTES
/*
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        console.log({ args }); // returns { args: {} }
        return projects; // return the clients array of objects
      },
    },
    project: {
      type: ProjectType, // GraphQLList is a list of clients
      args: { id: { type: GraphQLID } }, // id is a GraphQLID and must be passed in as an argument to return any data
      resolve(parent, args) {
        console.log({ args }); // returns { args: {} }
        return projects.find((project) => project.id === args.id); // return the clients array of objects
      },
    },
    clients: {
      type: new GraphQLList(ClientType), // GraphQLList is a list of clients
      resolve(parent, args) {
        console.log({ args }); // returns { args: {} }
        return clients; // return the clients array of objects
      },
    },
    // fields will pertain to queries (if we create client, most likley that will fetch a client)
    client: {
      type: ClientType, // created above; must work together.
      // we're going to need the id which will be in the args. you must define the type
      args: { id: { type: GraphQLID } }, // will take in an id
      // whatever we want to RETURN will go in the RESOLVER.
      resolve(parent, args) {
        // console.log({ parent }); // parent is the query { parent: undefined }
        console.log(args); // returns the id ({ id: '1' })
        // return data to get a client (where the client.id equals the id passed in above)
        return clients.find((client) => client.id === args.id);
        /* the graphql query: 
        {
          client(id: "1") {
            id
            name
            email
            phone
          }
        } 
       
      },
    },
  },
});
*/
