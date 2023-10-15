# Appstem Full Stack Web Developer Prototype

## Assumptions & Decisions

- assume middleware layer is piece of code between client and 3rd party api, not necessary an express middleware
- describe middleware
- describe logic of endless scroll
- describe decision on libraries
- describe decision of nextjs
- describe decision of vercel deploy

### References

- [Difference between Debouncing and Throttling](https://www.geeksforgeeks.org/difference-between-debouncing-and-throttling/#)

## To-Do

### Frontend

- ~~add form for searching images~~
- ~~add gallery of images~~
- ~~add responsive overlay~~
- ~~display data served from the API~~
- ~~implement "endless scroll effect"~~
- ~~improve design and styles~~
- make sure design is responsive and looks good/works well on multiple devices
- ~~add helpful UX items~~

### API

- ~~select an image search API to use~~
- ~~create account and retrieve API key from image search API~~
- ~~fetch data from the API~~
- ~~store API key in an env variable~~
- ~~create a middleware layer to help with frontend consumption~~
  - ~~paginated~~

### Testing / Error Handling

- implement error handling
  - add error handling during API calls
  - display errors in UI/UX
- add some unit tests (?)

### Deployment / Deliverables

- ~~host project on vercel~~
- make github repo public
- ~~set up env variables~~
- send deployed project link and github repo link to Robert by end of day Sunday

### Misc

- ~~use TypeScript~~
- ~~add necessary typings~~
- ~~add pre-commit hook to run pretty-quick and eslint~~
- update readme with assumptions and decisions
- ~~add as much documentation as possible (Types, JSDoc, etc)~~
- ~~add .prettierrc~~
- ~~use appstem logo~~

### Stretch Goals

- ~~add loading animation when loading next page~~
- ~~add toast denoting end of pages~~
- add debug mode
- add "Displaying ## images out of ##"
