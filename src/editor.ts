import m from "mithril"
import { sqlite, display } from "./parser"

const editorClass = ` 

`

export type EditorState = Partial<{ text: string; parser: any }>
export type EditorAttrs = { stateContainer: EditorState }

export const Editor: m.ClosureComponent<EditorAttrs> = initialProps => {
  const { stateContainer: state } = initialProps.attrs
  const s = sqlite({ initialText: state.text, onReady: m.redraw })

  // state.parser = null
  // const updateText = (text: string) => {
  //   state.parser = s.updateText(text)
  // }

  return {
    view: () => {
      return m(
        "",
        { class: editorClass },
        m("textarea", {
          value: state.text,
          placeholder: "Type here...",
          oninput: (e: any) => (
            (state.text = e.target.value), s.updateText(e.target.value)
          ),
        }),
        m("pre", state.text),
        m("pre", s.tree?.rootNode.toString()),
        m("pre", display(s.tree))
      )
    },
  }
}
