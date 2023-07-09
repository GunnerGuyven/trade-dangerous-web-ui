import m from "mithril"
//import { test, test2 } from "./parser-textmate";
import { test } from "./parser"

const editorClass = ` 

`

export type EditorState = Partial<{ text: string }>
export type EditorAttrs = { stateContainer: EditorState }

export const Editor: m.ClosureComponent<EditorAttrs> = initialProps => {
  const { stateContainer: state } = initialProps.attrs
  test()
  return {
    view: () => {
      return m(
        "",
        { class: editorClass },
        m("textarea", {
          value: state.text,
          placeholder: "Type here...",
          oninput: (e: any) => (state.text = e.target.value),
        })
      )
    },
  }
}
