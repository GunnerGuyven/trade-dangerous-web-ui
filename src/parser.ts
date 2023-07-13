import TreeSitter from "web-tree-sitter"

const sample = `
SELECT *
FROM abc
WHERE abc.xyz = 'def'
`

export const test = async () => {
  // const { default: tsWasmUrl } = await import(
  //   "web-tree-sitter/tree-sitter.wasm?url"
  // )
  // console.log(tsWasmUrl)
  // await TreeSitter.init({ locateFile: () => tsWasmUrl }).then(() => {
  //   console.log("tree sitter loaded")
  // })
  await TreeSitter.init()
  const parser = new TreeSitter()
  const sqlLang = await TreeSitter.Language.load("tree-sitter-sqlite.wasm")
  parser.setLanguage(sqlLang)
  const tree = parser.parse(sample)
  console.log(tree.rootNode.toString())
}

export const display = (
  tree: TreeSitter.Tree | undefined,
  root: TreeSitter.SyntaxNode | undefined = undefined
): string => {
  const r = root || tree?.rootNode
  if (!r) return "<empty tree>"
  const children = r.children.map(c => display(tree, c))

  return children.length ? children.join(" ") : r.text
}

export const sqlite = ({ initialText = sample, onReady = () => {} } = {}) => {
  let parser: TreeSitter | undefined = undefined
  let tree: TreeSitter.Tree | undefined = undefined
  const init = async () => {
    await TreeSitter.init()
    parser = new TreeSitter()
    const sqlLang = await TreeSitter.Language.load("tree-sitter-sqlite.wasm")
    parser.setLanguage(sqlLang)
    tree = parser.parse(initialText)
  }

  init().then(onReady)

  return {
    updateText: (text: string) => {
      tree = parser?.parse(text)
    },
    get tree() {
      return tree
    },
  }
}
