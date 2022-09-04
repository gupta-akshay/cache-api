## What you will build

---
Your task is to build a REST API that exposes methods to interact with a cache that you will also
build.
- Add an endpoint that returns the cached data for a given key
    - If the key is not found in the cache:
        - Log an output “Cache miss”
        - Create a random string
        - Update the cache with this random string
        - Return the random string
    - If the key is found in the cache:
        - Log an output “Cache hit” 
        - Get the data for this key
        - Return the data
- Add an endpoint that returns all stored keys in the cache
- Add an endpoint that creates and updates the data for a given key
- Add an endpoint that removes a given key from the cache
- Add an endpoint that removes all keys from the cache


### Functional Requirements

- All data returned by the cache is random dummy data.
- The cache does not have another data source in the background to be cached.
- The number of entries allowed in the cache is limited. If the maximum amount of cached
  items is reached, some old entry needs to be overwritten. Please explain the approach
  of what is overwritten in the comments of the source code.
- Every cached item has a Time To Live (TTL). If the TTL is exceeded, the cached data
  will not be used. A new random value will then be generated (just like cache miss). The
  TTL will be reset on every read/cache hit.
- You do not need to build a frontend, the API shall be used with tools like curl or
  Postman.

### Technical Requirements

- npm install must resolve all the dependencies.
- Standard npm commands must be implemented, “install”, “start” and “test”.
- Use MongoDB to store the cache data in.
- Use only Node.js and Express.js to build the API. Let us know what node version you
  used.
- It’s up to you what version of Javascript to use. You can use ES2016 or other tools like
  Typescript or Flow. It just needs to be able to run on the defined node version.
- The project has to work in a Unix environment.

### Install Dependencies and Run Project

Create `.env` file at the root of the project. It should have following values -
- `MONGODB_URL`: URL of your MongoDB instance
- `DB_NAME`: Database name you want to use for the project

Install dependencies by using -
```
npm install
```

Run application server by using -
```
npm run start
```

This will start the server on port 3000.

### Database Migration for First Time Setup

If this is your first time running the database service, make sure to manually run
```
npm run migrate:up
```
to pre-populate the database with sensible data.

You can also decide to manually pre-populate the database as you see fit.

### Running tests

```
npm run test
```

