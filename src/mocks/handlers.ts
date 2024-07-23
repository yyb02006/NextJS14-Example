import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://jsonplaceholder.typicode.com/todos/1', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      userid: 'John',
      title: 'Maverick',
    })
  }),
  http.get('http://localhost:3000/api/caching/optout', () => {
    return HttpResponse.json({
      time: 20201125,
    })
  }),
  http.get('https://api.thecatapi.com/v1/images/search', () => {
    return HttpResponse.json({
      data: 'Image Fetched',
    })
  }),
]
