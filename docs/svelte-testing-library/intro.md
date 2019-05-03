---
id: intro
title: Svelte Testing Library
---

[`svelte-testing-library`][gh] simplifies the use of dom-testing with
[Svelte](https://svelte.dev/) components & applications.

```
npm install --save-dev svlt-testing-library
```

- [svelte-testing-library on GitHub][gh]

## Usage

You must add `cleanup` to your test fixture's `beforeEach` hook:

```javascript
import { render, cleanup } from 'svlt-testing-library'

beforeEach(cleanup) //this is required.
```

You can now import & use `getBy`, `getAllBy`, `queryBy` and `queryAllBy` queries
in your tests.
[See `dom-testing-library` API for reference](dom-testing-library/api-queries.md)

## Examples

App.svelte

```html
<script>
  export let name
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {name}!</h1>
```

App.spec.js

```javascript
import App from '../src/App.svelte'
import { render, cleanup } from 'svlt-testing-library'
beforeEach(cleanup)
describe('App', () => {
  test('should render greeting', () => {
    const { getByText } = render(App, { props: { name: 'world' } })

    expect(getByText('Hello world!'))
  })

  test('should change button text after click', async () => {
    const { getByText } = render(App, { props: { name: 'world' } })

    fireEvent.click(getByText('Button Text'))

    const button = await waitForElement(() => getByText('Button Clicked'))

    expect(button).toBeInTheDocument()
  })
})
```

[gh]: https://github.com/testing-library/svelte-testing-library