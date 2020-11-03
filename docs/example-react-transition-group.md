---
id: example-react-transition-group
title: React Transition Group
---

## Mock

```jsx
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { render, fireEvent } from '@testing-library/react'

function Fade({ children, ...props }) {
  return (
    <CSSTransition {...props} timeout={1000} classNames="fade">
      {children}
    </CSSTransition>
  )
}

function HiddenMessage({ initialShow }) {
  const [show, setShow] = useState(initialShow || false)
  const toggle = () => setShow((prevState) => !prevState)
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>Hello world</div>
      </Fade>
    </div>
  )
}

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children)
  const FakeCSSTransition = jest.fn((props) =>
    props.in ? <FakeTransition>{props.children}</FakeTransition> : null
  )
  return { CSSTransition: FakeCSSTransition, Transition: FakeTransition }
})

test('you can mock things with jest.mock', () => {
  const { getByText, queryByText } = render(
    <HiddenMessage initialShow={true} />
  )
  expect(getByText('Hello world')).toBeTruthy() // we just care it exists
  // hide the message
  fireEvent.click(getByText('Toggle'))
  // in the real world, the CSSTransition component would take some time
  // before finishing the animation which would actually hide the message.
  // So we've mocked it out for our tests to make it happen instantly
  expect(queryByText('Hello World')).toBeNull() // we just care it doesn't exist
})
```

## Shallow

```jsx
import * as React from 'react'
import { CSSTransition } from 'react-transition-group'
import { render, fireEvent } from '@testing-library/react'

function Fade({ children, ...props }) {
  return (
    <CSSTransition {...props} timeout={1000} classNames="fade">
      {children}
    </CSSTransition>
  )
}

function HiddenMessage({ initialShow }) {
  const [show, setShow] = useState(initialShow || false)
  const toggle = () => setShow((prevState) => !prevState)
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>Hello world</div>
      </Fade>
    </div>
  )
}

jest.mock('react-transition-group', () => {
  const FakeCSSTransition = jest.fn(() => null)
  return { CSSTransition: FakeCSSTransition }
})

test('you can mock things with jest.mock', () => {
  const { getByText } = render(<HiddenMessage initialShow={true} />)
  const context = expect.any(Object)
  const children = expect.any(Object)
  const defaultProps = { children, timeout: 1000, className: 'fade' }
  expect(CSSTransition).toHaveBeenCalledWith(
    { in: true, ...defaultProps },
    context
  )
  fireEvent.click(getByText(/toggle/i))
  expect(CSSTransition).toHaveBeenCalledWith(
    { in: true, ...defaultProps },
    expect.any(Object)
  )
})
```
