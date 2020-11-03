---
id: api
title: API
---

`React Testing Library` re-exports everything from `DOM Testing Library` as well
as these methods:

- [`render`](#render)
- [`cleanup`](#cleanup)
- [`act`](#act)

---

## `render`

```typescript
function render(
  ui: React.ReactElement<any>,
  options?: {
    /* You won't often use this, expand below for docs on options */
  }
): RenderResult
```

Render into a container which is appended to `document.body`.

```jsx
import { render } from '@testing-library/react'

render(<div />)
```

```jsx
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('renders a message', () => {
  const { container, getByText } = render(<Greeting />)
  expect(getByText('Hello, world!')).toBeInTheDocument()
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h1>Hello, World!</h1>
  `)
})
```

## `render` Options

You won't often need to specify options, but if you ever do, here are the
available options which you could provide as a second argument to `render`.

### `container`

By default, `React Testing Library` will create a `div` and append that `div` to
the `document.body` and this is where your React component will be rendered. If
you provide your own HTMLElement `container` via this option, it will not be
appended to the `document.body` automatically.

For example: If you are unit testing a `tablebody` element, it cannot be a child
of a `div`. In this case, you can specify a `table` as the render `container`.

```jsx
const table = document.createElement('table')

const { container } = render(<TableBody {...props} />, {
  container: document.body.appendChild(table),
})
```

### `baseElement`

If the `container` is specified, then this defaults to that, otherwise this
defaults to `document.body`. This is used as the base element for the queries as
well as what is printed when you use `debug()`.

### `hydrate`

If hydrate is set to true, then it will render with
[ReactDOM.hydrate](https://reactjs.org/docs/react-dom.html#hydrate). This may be
useful if you are using server-side rendering and use ReactDOM.hydrate to mount
your components.

### `wrapper`

Pass a React Component as the `wrapper` option to have it rendered around the
inner element. This is most useful for creating reusable custom render functions
for common data providers. See [setup](setup.md#custom-render) for examples.

### `queries`

Queries to bind. Overrides the default set from `DOM Testing Library` unless
merged.

```js
// Example, a function to traverse table contents
import * as tableQueries from 'my-table-query-libary'
import { queries } from '@testing-library/react'

const { getByRowColumn, getByText } = render(<MyTable />, {
  queries: { ...queries, ...tableQueries },
})
```

See [helpers](dom-testing-library/api-helpers.md) for guidance on using utility
functions to create custom queries.

Custom queries can also be added globally by following the
[custom render guide](./setup#custom-render).

## `render` Result

The `render` method returns an object that has a few properties:

### `...queries`

The most important feature of `render` is that the queries from
[DOM Testing Library](dom-testing-library/api-queries.md) are automatically
returned with their first argument bound to the [baseElement](#baseelement),
which defaults to `document.body`.

See [Queries](dom-testing-library/api-queries.md) for a complete list.

**Example**

```jsx
const { getByLabelText, queryAllByTestId } = render(<Component />)
```

### `container`

The containing DOM node of your rendered React Element (rendered using
`ReactDOM.render`). It's a `div`. This is a regular DOM node, so you can call
`container.querySelector` etc. to inspect the children.

> Tip: To get the root element of your rendered element, use
> `container.firstChild`.
>
> NOTE: When that root element is a
> [React Fragment](https://reactjs.org/docs/fragments.html),
> `container.firstChild` will only get the first child of that Fragment, not the
> Fragment itself.

> 🚨 If you find yourself using `container` to query for rendered elements then
> you should reconsider! The other queries are designed to be more resilient to
> changes that will be made to the component you're testing. Avoid using
> `container` to query for elements!

### `baseElement`

The containing DOM node where your React Element is rendered in the container.
If you don't specify the `baseElement` in the options of `render`, it will
default to `document.body`.

This is useful when the component you want to test renders something outside the
container div, e.g. when you want to snapshot test your portal component which
renders its HTML directly in the body.

> Note: the queries returned by the `render` looks into baseElement, so you can
> use queries to test your portal component without the baseElement.

### `debug`

> NOTE: It's recommended to use
> [`screen.debug`](https://testing-library.com/docs/dom-testing-library/api-queries#screendebug)
> instead.

This method is a shortcut for `console.log(prettyDOM(baseElement))`.

```jsx
import * as React from 'react'
import { render } from '@testing-library/react'

const HelloWorld = () => <h1>Hello World</h1>
const { debug } = render(<HelloWorld />)
debug()
// <div>
//   <h1>Hello World</h1>
// </div>
// you can also pass an element: debug(getByTestId('messages'))
// and you can pass all the same arguments to debug as you can
// to prettyDOM:
// const maxLengthToPrint = 10000
// debug(getByTestId('messages'), maxLengthToPrint, {highlight: false})
```

This is a simple wrapper around `prettyDOM` which is also exposed and comes from
[`DOM Testing Library`](dom-testing-library/api-helpers.md#prettydom).

### `rerender`

It'd probably be better if you test the component that's doing the prop updating
to ensure that the props are being updated correctly (see
[the Guiding Principles section](guiding-principles.md)). That said, if you'd
prefer to update the props of a rendered component in your test, this function
can be used to update props of the rendered component.

```jsx
import { render } from '@testing-library/react'

const { rerender } = render(<NumberDisplay number={1} />)

// re-render the same component with different props
rerender(<NumberDisplay number={2} />)
```

[See the examples page](example-update-props.md)

### `unmount`

This will cause the rendered component to be unmounted. This is useful for
testing what happens when your component is removed from the page (like testing
that you don't leave event handlers hanging around causing memory leaks).

> This method is a pretty small abstraction over
> `ReactDOM.unmountComponentAtNode`

```jsx
import { render } from '@testing-library/react'

const { container, unmount } = render(<Login />)
unmount()
// your component has been unmounted and now: container.innerHTML === ''
```

### `asFragment`

Returns a `DocumentFragment` of your rendered component. This can be useful if
you need to avoid live bindings and see how your component reacts to events.

```jsx
import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

const TestComponent = () => {
  const [count, setCounter] = useState(0)

  return (
    <button onClick={() => setCounter((count) => count + 1)}>
      Click to increase: {count}
    </button>
  )
}

const { getByText, asFragment } = render(<TestComponent />)
const firstRender = asFragment()

fireEvent.click(getByText(/Click to increase/))

// This will snapshot only the difference between the first render, and the
// state of the DOM after the click event.
// See https://github.com/jest-community/snapshot-diff
expect(firstRender).toMatchDiffSnapshot(asFragment())
```

---

## `cleanup`

Unmounts React trees that were mounted with [render](#render).

> Please note that this is done automatically if the testing framework you're
> using supports the `afterEach` global and it is injected to your testing
> environment (like mocha, Jest, and Jasmine). If not, you will need to do
> manual cleanups after each test.

For example, if you're using the [ava](https://github.com/avajs/ava) testing
framework, then you would need to use the `test.afterEach` hook like so:

```jsx
import { cleanup, render } from '@testing-library/react'
import test from 'ava'

test.afterEach(cleanup)

test('renders into document', () => {
  render(<div />)
  // ...
})

// ... more tests ...
```

Failing to call `cleanup` when you've called `render` could result in a memory
leak and tests which are not "idempotent" (which can lead to difficult to debug
errors in your tests).

---

## `act`

This is a light wrapper around the
[`react-dom/test-utils` `act` function](https://reactjs.org/docs/test-utils.html#act).
All it does is forward all arguments to the act function if your version of
react supports `act`. It is recommended to use the import from
`@testing-library/react` over `react-dom/test-utils` for consistency reasons.
