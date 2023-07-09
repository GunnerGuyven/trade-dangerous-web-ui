import { Editor } from "./editor"
import "./style.css"
import m from "mithril"

const appState = import.meta.hot?.data.appState || {
  editor: {}, // { text: "abcdef" },
  testValue: Math.random(),
}

if (import.meta.hot) {
  import.meta.hot.dispose(data => (data.appState = appState))
  import.meta.hot.accept(module => {
    if (module) {
      module.AppRender(_mountNode)
    }
  })
}

const App: m.ClosureComponent = () => {
  return {
    view: () => {
      return m(
        "",
        m("", "Trade Dangerous"),
        m("", "Choose Operation"),
        m("input", {
          value: appState.testValue,
          oninput: e => (appState.testValue = e.target.value),
        }),
        m(Editor, { stateContainer: appState.editor }),
        m("pre", JSON.stringify(appState, null, 2))
      )
    },
  }
}

let _mountNode: Element | null = null
export const AppRender = (mountNode: Element) => {
  _mountNode = mountNode
  m.mount(mountNode, App)
}
