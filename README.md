# Appstem Full Stack Web Developer Prototype

## Assumptions & Decisions

- assume middleware layer is piece of code between client and 3rd party api, not necessary an express middleware
- describe middleware
- describe logic of endless scroll
- describe decision on libraries
- describe decision of nextjs
- describe decision of vercel deploy

### API Documentation

```
GET /api/images
```

#### Query Params

| Param | Type | Description | Required? |
| page | number | The current page to fetch for the current search query | ✅ |
| perPage | number | The number of results to return for each page (defaults to 10) | |
| searchQuery | string | The query used to search for images | ✅ |

```title="Example request"
/api/images?searchQuery=apple&perPage=10&page=1
```

#### Returns

```js title="Example return object"
{
    "query": "apple",
    "currentPage": null,
    "previousPage": null,
    "nextPage": null,
    "perPage": 10,
    "totalResults": 500,
    "totalPages": 50,
    "images": [
        {
            "id": 1122537,
            "pageURL": "https://pixabay.com/photos/apple-water-droplets-fruit-moist-1122537/",
            "type": "photo",
            ...
        },
        ...
        {
            "id": 2788651,
            "pageURL": "https://pixabay.com/photos/apples-apple-tree-fruits-orchard-2788651/",
            "type": "photo",
            ...
        }
    ],
    "updatedAt": 1697396739677
}
```

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

- ~~implement error handling~~
  - ~~add error handling during API calls~~
  - ~~display errors in UI/UX~~
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
- ~~add "Displaying ## images out of ##"~~
