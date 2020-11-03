---
id: example-react-router
title: React Router
---

```jsx
// app.js
import * as React from 'react'
import { Link, Route, Switch, useLocation } from 'react-router-dom'

const About = () => <div>You are on the about page</div>
const Home = () => <div>You are home</div>
const NoMatch = () => <div>No match</div>

export const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

export const App = () => (
  <div>
    <Link to="/">Home</Link>

    <Link to="/about">About</Link>

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route>
        <NoMatch />
      </Route>
    </Switch>

    <LocationDisplay />
  </div>
)
```

```jsx
// app.test.js
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import * as React from 'react'
import { Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'

import { App, LocationDisplay } from './app'

test('full app rendering/navigating', () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText(/you are home/i)).toBeInTheDocument()

  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/about/i), leftClick)

  // check that the content changed to the new page
  expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
})

test('landing on a bad page', () => {
  const history = createMemoryHistory()
  history.push('/some/bad/route')
  render(
    <Router history={history}>
      <App />
    </Router>
  )

  expect(screen.getByText(/no match/i)).toBeInTheDocument()
})

test('rendering a component that uses useLocation', () => {
  const history = createMemoryHistory()
  const route = '/some-route'
  history.push(route)
  render(
    <Router history={history}>
      <LocationDisplay />
    </Router>
  )

  expect(screen.getByTestId('location-display')).toHaveTextContent(route)
})
```

## Reducing boilerplate

1. You can use the `wrapper` option to wrap a `MemoryRouter` around the
   component you want to render.  
   `MemoryRouter` works when you don't need access to the history object itself
   in the test, but just need the components to be able to render and
   navigate.  
   If you _do_ need to change the history, you could use `BrowserRouter`.

```jsx
import { MemoryRouter } from 'react-router-dom'

test('full app rendering/navigating', () => {
  render(<App />, { wrapper: MemoryRouter })

  // verify page content for expected route
  expect(screen.getByText(/you are home/i)).toBeInTheDocument()
})
```

2. If you find yourself adding Router components to your tests a lot, you may
   want to create a helper function that wraps around `render`.

```jsx
// test utils file
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}
```

```jsx
// app.test.js
test('full app rendering/navigating', () => {
  renderWithRouter(<App />)
  expect(screen.getByText(/you are home/i)).toBeInTheDocument()

  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/about/i), leftClick)

  expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
})

test('landing on a bad page', () => {
  renderWithRouter(<App />, { route: '/something-that-does-not-match' })

  expect(screen.getByText(/no match/i)).toBeInTheDocument()
})

test('rendering a component that uses useLocation', () => {
  const route = '/some-route'
  renderWithRouter(<LocationDisplay />, { route })

  expect(screen.getByTestId('location-display')).toHaveTextContent(route)
})
```
