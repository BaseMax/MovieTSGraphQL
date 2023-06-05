# MovieTSGraphQL

MovieTSGraphQL is a GraphQL web service built using NestJS, Prisma ORM, PostgreSQL, and Minio. The project provides functionality to manage movies, categories, actors, directors, comments, and more. It aims to create a web service with various features similar to Netflix.

## Demo

## Features

- Manage movies, categories, actors, directors, comments, and more.
- Secure authentication and authorization system.
- GraphQL API for easy integration with any frontend framework.
- Optimized for high performance and scalability.

## Authentication 
Authentication is done through an Authorization Header using a Bearer token. The token can be obtained by calling the login and register mutations.

Once the token is obtained, it needs to be included in the Authorization Header of all subsequent GraphQL requests. The app validates the token and restricts access to certain mutations and queries based on the token's permissions.

Some mutations and queries require higher privileges, such as a specific role, to be executed. These operations can only be performed by users with the required privileges.

example Header : 
```
Authorization: Bearer <token>
```

## File upload

This app supports file upload through a dedicated endpoint at `/upload/<type>/<name-prefix>`. The uploaded file will be resized to a specific size based on the chosen type. Currently, the supported types and sizes are:

- `avatar`: { width: 512, height: 512 }
- `gallery`: { width: 1920, height: 1080 }
- `backdrop`: { width: 1920, height: 1080 }
- `poster`: { width: 600, height: 900 }

To upload a file, you should make a POST request to the `/upload/<type>/<name-prefix>` endpoint with the file contents as the request body. The request body should be a binary file, not multipart form data.

The `<type>` parameter specifies the type of the uploaded file, while the `<name-prefix>` parameter is used to generate a unique filename for the uploaded file. The uploaded file will be resized and saved to the server, and the response will contain a JSON object with the URL of the uploaded file. For example:

```
{"url":"/poster/testtt-cliiy9tkb000015ln9byqftw4.jpeg"}
```

You can use the returned URL wherever a file is required in your application.

## Stack

- NestJS
- Prisma ORM
- PostgreSQL
- Minio

## Usage

To use this project, follow these steps:

1. Clone this repository:

```bash
git clone https://github.com/BaseMax/MovieTSGraphQL
```

2. Install dependencies:

```bash
npm install
```

3. Run the app using Docker Compose:

```bash
sudo docker-compose -f docker-compose.dev.yml up
```

This will start the app in development mode, with hot-reloading enabled. The GraphQL playground will be available at http://localhost:3000/graphql.

4. Attach to the container:

```bash
sudo docker exec -it movietsgraphql-app-1 bash
```

5. Create an admin account:

```bash
dsconfig

npx nest start --entryFile create-admin.js
```

It will prompt you for an email, password, and name to create the superuser account.

## Examples

Here are some example GraphQL queries and mutations that can be used with this project:

1. Get all genres:

```graphql
query {
  genres {
    id
    name
  }
}
```

2. Get a specific genre:

```graphql
query {
  genre(id: "1") {
    id
    name
  }
}
```

3. Search for artists:

```graphql
query {
  searchArtists(input: {text: "Tom"}) {
    total
    artists {
      id
      name
    }
  }
}
```

4. Get a specific movie:

```graphql
query {
  movie(id: "1") {
    id
    name
    plot
    description
    imdbScore
    imdbRef
    duration
    releaseDate
    backdrop
    poster
    gallery
    genres {
      id
      name
    }
    artists {
      artist {
        id
        name
      }
      contribution
    }
    downloadableAssets {
      title
      link
      type
    }
    languages {
      tag
      for
    }
  }
}
```

5. Create a new movie:

```graphql
mutation {
  createMovie(input: {
    name: "Movie Name"
    plot: "Movie Plot"
    description: "Movie Description"
    imdbScore: 8.5
    imdbRef: "https://www.imdb.com/title/tt1375666/"
    duration: 120
    releaseDate: "2022-01-01T00:00:00Z"
    backdrop: "/backdrop/backdrop.jpeg"
    poster: "/poster/poster.jpeg"
    gallery: ["/gallery/gallery1.jpeg", "/gallery/gallery2.jpeg"]
    genreIds: ["1", "2"]
    artists: [{
      artistId: "1"
      contribution: director
    }]
    downloadableAssets: [{
      title: "Subtitle"
      link: "/subtitle/subtitle.vtt"
      type: subtitle
    }]
    languages: [{
      tag: "en-US"
      for: original
    }]
  }) {
    id
    name
  }
}
```

6. Update a movie:

```graphql
mutation {
  updateMovie(input: {
    id: "1"
    name: "New Movie Name"
    plot: "New Movie Plot"
    description: "New Movie Description"
    imdbScore: 9.0
    imdbRef: "https://www.imdb.com/title/tt1375667/"
    duration: 150
    releaseDate: "2022-02-02T00:00:00Z"
    backdrop: "/backdrop/newbackdrop.jpeg"
    poster: "/poster/newposter.jpeg"
    gallery: ["/gallery/newgallery1.jpeg", "/gallery/newgallery2.jpeg"]
    genreIds: ["2", "3"]
    artists: [{
      artistId: "2"
      contribution: actor
    }]
    downloadableAssets: [{
      title: "Sound"
      link: "/sound/sound.mp3"
      type: sound
    }]
    languages: [{
      tag: "fr-FR"
      for: dub
    }]
  }) {
    id
    name
  }
}
```

## API Documentation

Here is a table describing all mutations and queries available in this project:

| Query/Mutation | Description |
| --- |--- |
| `movie(id: ID!)` | Get a specific movie by ID. |
| `searchMovies(input: SearchMoviesInput!)` | Search for movies based on a search input. |
| `createMovie(input: CreateMovieInput!)` | Create a new movie. |
| `updateMovie(input: UpdateMovieInput!)` | Update an existing movie. |
| `deleteMovie(id: ID!)` | Delete a movie by ID. |
| `genres` | Get all genres. |
| `genre(id: ID!)` | Get a specific genre by ID. |
| `createGenre(input: CreateGenreInput!)` | Create a new genre. |
| `updateGenre(input: UpdateGenreInput!)` | Update an existing genre. |
| `artist(id: ID!)` | Get a specific artist by ID. |
| `searchArtists(input: SearchArtistsInput!)` | Search for artists based on a search input. |
| `createArtist(input: CreateArtistInput!)` | Create a new artist. |
| `updateArtist(input: UpdateArtistInput!)` | Update an existing artist. |
| `deleteArtist(id: ID!)` | Delete an artist by ID. |
| `createComment(input: CreateCommentInput!)` | Create a new comment. |
| `updateComment(input: UpdateCommentInput!)` | Update an existing comment. |
| `deleteComment(id: ID!)` | Delete a comment by ID. |
| `createUser(input: CreateUserInput!)` | Create a new user. |
| `user` | Get authentication details for a user. |

## License

This project is licensed under the GPL-3 license. Contributions are welcome! Please submit any issues or pull requests to the GitHub repository.



