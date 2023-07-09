import TreeSitter from "web-tree-sitter"

const sample =`
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
  const parser = new TreeSitter
  const sqlLang = await TreeSitter.Language.load('tree-sitter-sqlite.wasm')
  parser.setLanguage(sqlLang)
  const tree = parser.parse(sample)
  console.log(tree.rootNode.toString())
}