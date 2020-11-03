---
id: example-react-hooks-useReducer
title: useReducer
---

Basic example showing how to test the `useReducer` hook. The most important
thing is that we aren't testing the reducer directly - it's an implementation
detail of the component! Instead we are testing the component interface.

The component we are testing changes some text depending on an `isConfirmed`
state.

```jsx
// example.js

import React, { useReducer } from 'react'

const initialState = {
  isConfirmed: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        isConfirmed: true,
      }
    default:
      throw Error('unknown action')
  }
}

const Example = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <div>
        {state.isConfirmed ? (
          <p>Confirmed!</p>
        ) : (
          <p>Waiting for confirmation...</p>
        )}
      </div>
      <button onClick={() => dispatch({ type: 'SUCCESS' })}>Confirm</button>
    </div>
  )
}

export default Example
```

We are testing to see if we get the correct output in our JSX based on the
reducer state.

```jsx
// example.test.js

import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Example from './example.js'

it('shows success message after confirm button is clicked', () => {
  const { getByText } = render(<Example />)

  expect(getByText(/waiting/i)).toBeInTheDocument()

  fireEvent.click(getByText('Confirm'))

  expect(getByText('Confirmed!')).toBeInTheDocument()
})
```
