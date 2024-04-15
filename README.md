### Description 
Server side rendering movie fun site

### How to run project
Project is using npm as package manager, but you can use yarn as well.
##### 1. Install Dependencies:
```bash
$ npm install
```
##### 2. Create .env.dev files (.env.e2e for test):

```bash
API_KEY='Your The Movie DB API Key'
PORT=3001
```

##### 3. Running the app:

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

### API Endpoints
| Method | Route      | Description                                              |
|--------|------------|----------------------------------------------------------|
| GET    | /          | Get list Of movies                                       |
| Get    | /movie/:id | Get movie by id                                          |
| POST   | /search    | ?source=searchQuery <br> body: { cat: movie \| person  } |