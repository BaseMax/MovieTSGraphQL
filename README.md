# Movie Project with GraphQL, TypeScript, and Prisma ORM

This is a movie project that aims to create a GraphQL web service with various features similar to Netflix. It is built using GraphQL, TypeScript, and Prisma ORM. The project provides functionality to manage movies, categories, actors, directors, comments, and more.

## Features
- Add a new movie
- Add a new category
- Add an actor
- Add a director
- List all actors
- List all directors
- Search actors
- Get a list of all movies with pagination
- Get a list of all movies in one or multiple genres (e.g., comedy and war)
- Edit a movie
- Delete a movie
- Delete an actor
- Delete a director
- Get details of a movie
- Get comments of a movie
- Confirm a comment
- Delete a comment
- Edit a comment

## Technologies Used

The project utilizes the following technologies:

- GraphQL: A query language and runtime for APIs
- TypeScript: A statically typed superset of JavaScript
- Prisma ORM: An open-source database toolkit

## Getting Started

To get started with the movie project, follow these steps:

Clone the repository:

```bash
git clone https://github.com/BaseMax/MovieTSGraphQL.git
```

Install the dependencies:

```bash
cd movie-project
npm install
```

Set up the database connection in the .env file. You can use a PostgreSQL, MySQL, or SQLite database. Make sure to provide the necessary database connection details.

Migrate the database:

```bash
npx prisma migrate dev --name initial-migration
```

Generate Prisma Client:

```bash
npx prisma generate
```

Start the development server:

```bash
npm run dev
```

Access the GraphQL playground:

Open your browser and navigate to http://localhost:4000 to explore the GraphQL API and perform queries and mutations.

## Folder Structure

The project has the following folder structure:

```bash
├── src
│   ├── generated         # Prisma Client generated code
│   ├── resolvers         # GraphQL resolvers
│   ├── schema            # GraphQL schema
│   ├── utils             # Utility functions
│   └── index.ts          # Entry point
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # NPM package configuration
└── README.md             # Project documentation
```

Feel free to explore the code in the respective folders to understand how the project is implemented.

## Structure

Here's an example schema of the structures that can be used in the movie project:

```graphql
type Movie {
  id: ID!
  title: String!
  description: String!
  releaseYear: Int!
  genres: [Genre!]!
  actors: [Actor!]!
  directors: [Director!]!
  comments: [Comment!]!
}

type Genre {
  id: ID!
  name: String!
  movies: [Movie!]!
}

type Actor {
  id: ID!
  name: String!
  movies: [Movie!]!
}

type Director {
  id: ID!
  name: String!
  movies: [Movie!]!
}

type Comment {
  id: ID!
  text: String!
  movie: Movie!
  confirmed: Boolean!
}

type Query {
  movie(id: ID!): Movie
  movies(page: Int!, limit: Int!): [Movie!]!
  moviesByGenres(genres: [String!]!): [Movie!]!
  actors: [Actor!]!
  directors: [Director!]!
  searchActors(name: String!): [Actor!]!
}

type Mutation {
  addMovie(title: String!, description: String!, releaseYear: Int!, genres: [String!]!, actors: [ID!]!, directors: [ID!]!): Movie!
  addCategory(name: String!): Genre!
  addActor(name: String!): Actor!
  addDirector(name: String!): Director!
  editMovie(id: ID!, title: String, description: String, releaseYear: Int, genres: [String], actors: [ID], directors: [ID]): Movie!
  deleteMovie(id: ID!): Movie
  deleteActor(id: ID!): Actor
  deleteDirector(id: ID!): Director
  confirmComment(id: ID!): Comment
  deleteComment(id: ID!): Comment
  editComment(id: ID!, text: String!): Comment
  // MORE...
}

schema {
  query: Query
  mutation: Mutation
}
```

This schema defines the structure and relationships between different entities, such as movies, genres, actors, directors, and comments. It also includes query and mutation definitions to perform various operations on these entities.

## Contributing

Contributions are welcome! If you find any issues or have suggestions to improve the project, please open an issue or submit a pull request.

## License

The movie project is open-source and distributed under the GPL-3.0 License. You can use, modify, and distribute the code for both personal and commercial purposes.

# Authors

- ...
- Max Base

Copyright 2023, Max Base
