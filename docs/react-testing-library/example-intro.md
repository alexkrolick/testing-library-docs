---
id: example-intro
title: Example
sidebar_label: Example
---

## Full Example

See the following sections for a detailed breakdown of the test

```jsx
// __tests__/fetch.test.js
import * as React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Fetch from '../fetch'

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
  render(<Fetch url="/greeting" />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('heading'))

  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toHaveAttribute('disabled')
})

test('handles server error', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<Fetch url="/greeting" />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
})
```

> We recommend using [Mock Service Worker](https://github.com/mswjs/msw) library
> to declaratively mock API communication in your tests instead of stubbing
> `window.fetch`, or relying on third-party adapters.

---

## Step-By-Step

### Imports

```jsx
// import dependencies
import * as React from 'react'

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
// the component to test
import Fetch from '../fetch'
```

```jsx
test('loads and displays greeting', async () => {
  // Arrange
  // Act
  // Assert
})
```

### Mock

Use the `setupServer` function from `msw` to mock an API request that our tested
component makes.

```js
// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/greeting', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({ greeting: 'hello there' }))
  })
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

// ...

test('handlers server error', async () => {
  server.use(
    // override the initial "GET /greeting" request handler
    // to return a 500 Server Error
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  // ...
})
```

### Arrange

The [`render`](./api#render) method renders a React element into the DOM.

```jsx
render(<Fetch url="/greeting" />)
```

### Act

The [`fireEvent`](dom-testing-library/api-events.md) method allows you to fire
events to simulate user actions.

```jsx
fireEvent.click(screen.getByText('Load Greeting'))

// wait until the `get` request promise resolves and
// the component calls setState and re-renders.
// `waitFor` waits until the callback doesn't throw an error

await waitFor(() =>
  // getByRole throws an error if it cannot find an element
  screen.getByRole('heading')
)
```

### Assert

```jsx
// assert that the alert message is correct.
expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')

// assert that the button is not disabled.
expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
```

### System Under Test

fetch.js

```jsx
import React, { useState, useReducer } from 'react'
import axios from 'axios'

const initialState = {
  error: null,
  greeting: null,
}

function greetingReducer(state, action) {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.greeting,
      }
    }
    case 'ERROR': {
      return {
        error: action.error,
        greeting: null,
      }
    }
    default: {
      return state
    }
  }
}

export default function Fetch({ url }) {
  const [{ error, greeting }, dispatch] = useReducer(
    greetingReducer,
    initialState
  )
  const [buttonClicked, setButtonClicked] = useState(false)

  const fetchGreeting = async () => {
    axios
      .get(url)
      .then((response) => {
        const { data } = response
        const { greeting } = data
        dispatch({ type: 'SUCCESS', greeting })
        setButtonClicked(true)
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error })
      })
  }

  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting'

  return (
    <div>
      <button onClick={fetchGreeting} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  )
}
```
