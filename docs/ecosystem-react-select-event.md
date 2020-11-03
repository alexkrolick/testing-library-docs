---
id: ecosystem-react-select-event
title: react-select-event
---

[`react-select-event`][gh] is a companion library for `React Testing Library`
that provides helper methods for interacting with [`react-select`][react-select]
elements.

```
npm install --save-dev react-select-event
```

```jsx
import * as React from 'react'
import Select from 'react-select'
import { render } from '@testing-library/react'
import selectEvent from 'react-select-event'

const { getByTestId, getByLabelText } = render(
  <form data-testid="form">
    <label htmlFor="food">Food</label>
    <Select options={OPTIONS} name="food" inputId="food" isMulti />
  </form>
)
expect(getByTestId('form')).toHaveFormValues({ food: '' }) // empty select

// select two values...
await selectEvent.select(getByLabelText('Food'), ['Strawberry', 'Mango'])
expect(getByTestId('form')).toHaveFormValues({ food: ['strawberry', 'mango'] })

// ...and add a third one
await selectEvent.select(getByLabelText('Food'), 'Chocolate')
expect(getByTestId('form')).toHaveFormValues({
  food: ['strawberry', 'mango', 'chocolate'],
})
```

- [react-select-event on GitHub][gh]

[gh]: https://github.com/romgain/react-select-event
[react-select]: https://github.com/JedWatson/react-select
