---
id: example-react-intl
title: React Intl
---

> **Note**
>
> If you want to combine setupTests with another setup you should check
> [`setup`](react-testing-library/setup.md)

## Configuring React-Intl Polyfills / Locales

If you're using React-Intl in your project, and you **need** to load a locale,
You have two options:

1.  When using Node 13 and higher, Intl support is now out of the box. The
    default ICU (International Components for Unicode) option for Node is
    `full-icu` meaning all ICU's.  
     All you need to do is embed the set of ICU data you need:

    ```js
    // test-utils.js

    const hasFullICU = () => {
      // That's the recommended way to test for ICU support according to Node.js docs
      try {
        const january = new Date(9e8)
        const pt = new Intl.DateTimeFormat('pt', { month: 'long' })
        return pt.format(january) === 'janeiro'
      } catch (err) {
        return false
      }
    }

    export const setupTests = () => {
      if (hasFullICU()) {
        Intl.NumberFormat.format = new Intl.NumberFormat('pt').format
        Intl.DateTimeFormat.format = new Intl.DateTimeFormat('pt').format
      } else {
        global.Intl = IntlPolyfill
      }
    }
    ```

2.  When using Node with prior versions, the ICU default option is `small-icu`
    meaning it includes a subset of ICU data (typically only the English
    locale).  
    If you do need to load a locale you have two options:

    1. Load the Polyfills according to that language:

       ```js
       // test-utils.js
       import IntlPolyfill from 'intl'
       import 'intl/locale-data/jsonp/pt'

       export const setupTests = () => {
         // https://formatjs.io/guides/runtime-environments/#server
         if (global.Intl) {
           Intl.NumberFormat = IntlPolyfill.NumberFormat
           Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
         } else {
           global.Intl = IntlPolyfill
         }
       }
       ```

    2. Load the ICU's at runtime:  
       Install the package
       [full-icu](https://github.com/unicode-org/full-icu-npm) and inject it to
       your test environment, you can do that by setting `NODE_ICU_DATA` before
       calling jest: `NODE_ICU_DATA=node_modules/full-icu jest`. Doing that you
       will give you full-icu support as shown in option 1.

## Creating a custom render function

To test our translated component we can create a custom `render` function using
the `wrapper` option as explained in the
[setup](./react-testing-library/setup.md) page.  
Our custom `render` function can look like this:

```jsx
// test-utils.js
import * as React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { IntlProvider } from 'react-intl'

function render(ui, { locale = 'pt', ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <IntlProvider locale={locale}>{children}</IntlProvider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
```

## A complete example

```jsx
import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
// We're importing from our own created test-utils and not RTL's
import { render, screen, setupTests } from '../test-utils.js'
import { FormattedDate } from 'react-intl'

const FormatDateView = () => {
  return (
    <div data-testid="date-display">
      <FormattedDate
        value="2019-03-11"
        timeZone="utc"
        day="2-digit"
        month="2-digit"
        year="numeric"
      />
    </div>
  )
}

setupTests()

test('it should render FormattedDate and have a formatted pt date', () => {
  render(<FormatDateView />)
  expect(screen.getByTestId('date-display')).toHaveTextContent('11/03/2019')
})
```
