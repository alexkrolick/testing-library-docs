---
id: example-react-context
title: React Context
---

```jsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { NameContext, NameProvider, NameConsumer } from '../react-context'

/**
 * Test default values by rendering a context consumer without a
 * matching provider
 */
test('NameConsumer shows default value', () => {
  render(<NameConsumer />)
  expect(screen.getByText(/^My Name Is:/)).toHaveTextContent(
    'My Name Is: Unknown'
  )
})

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <NameContext.Provider {...providerProps}>{ui}</NameContext.Provider>,
    renderOptions
  )
}

test('NameConsumer shows value from provider', () => {
  const providerProps = {
    value: 'C3PO',
  }
  customRender(<NameConsumer />, { providerProps })
  expect(screen.getByText(/^My Name Is:/)).toHaveTextContent('My Name Is: C3P0')
})

/**
 * To test a component that provides a context value, render a matching
 * consumer as the child
 */
test('NameProvider composes full name from first, last', () => {
  const providerProps = {
    first: 'Boba',
    last: 'Fett',
  }
  customRender(
    <NameContext.Consumer>
      {(value) => <span>Received: {value}</span>}
    </NameContext.Consumer>,
    { providerProps }
  )
  expect(screen.getByText(/^Received:/).textContent).toBe('Received: Boba Fett')
})

/**
 * A tree containing both a providers and consumer can be rendered normally
 */
test('NameProvider/Consumer shows name of character', () => {
  const wrapper = ({ children }) => (
    <NameProvider first="Leia" last="Organa">
      {children}
    </NameProvider>
  )

  render(<NameConsumer />, { wrapper })
  expect(screen.getByText(/^My Name Is:/).textContent).toBe(
    'My Name Is: Leia Organa'
  )
})
```
