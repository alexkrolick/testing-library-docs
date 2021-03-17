const npmToYarn = require('npm-to-yarn')

const transformNode = (node) => {
  const npmCode = node.value
  const yarnCode = npmToYarn(npmCode, 'yarn')
  return [
    {
      type: 'jsx',
      value:
        `<Tabs groupId="npm2yarn" defaultValue="npm" ` +
        `values={[
    { label: 'npm', value: 'npm', },
    { label: 'Yarn', value: 'yarn', },
  ]}
>
<TabItem value="npm">`,
    },
    {
      type: node.type,
      lang: node.lang,
      value: npmCode,
    },
    {
      type: 'jsx',
      value: '</TabItem>\n<TabItem value="yarn">',
    },
    {
      type: node.type,
      lang: node.lang,
      value: yarnCode,
    },
    {
      type: 'jsx',
      value: '</TabItem>\n</Tabs>',
    },
  ]
}

const matchNode = (node) =>
  (node.type === 'inlineCode' || node.type === 'code') &&
  node.lang === 'npm2yarn'
const nodeForImport = {
  type: 'import',
  value: "import Tabs from '@theme/Tabs'\nimport TabItem from '@theme/TabItem'",
}

module.exports = () => {
  let transformed = false
  const transformer = (node) => {
    if (matchNode(node)) {
      transformed = true
      return transformNode(node)
    }
    if (Array.isArray(node.children)) {
      let index = 0
      while (index < node.children.length) {
        const result = transformer(node.children[index])
        if (result) {
          node.children.splice(index, 1, ...result)
          index += result.length
        } else {
          index += 1
        }
      }
    }
    if (node.type === 'root' && transformed) {
      const foundIndex = node.children.findIndex(
        (im) => im.type === 'import' && im.value === nodeForImport.value
      )
      if (foundIndex !== -1) {
        node.children.splice(foundIndex)
      }
      node.children.unshift(nodeForImport)
    }
    return null
  }
  return transformer
}
