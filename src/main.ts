import "./style.css"
import m from "mithril"

const appState = import.meta.hot?.data.appState || {
  editor: {}, // { text: "abcdef" },
  testValue: Math.random()
}

if (import.meta.hot) {
  import.meta.hot.dispose(data => (data.appState = appState))
  import.meta.hot.accept(module => {
    if (module) {
      console.log(module)
      module.AppRender(_mountNode)
    }
  })
}

const App: m.ClosureComponent = () => {
  return {
    view: () => {
      return m(
        "",
        m("", "abc123"),
        m("", appState.testValue),
        m("input", {
          value: appState.testValue,
          oninput: e => (appState.testValue = e.target.value),
        })
      )
    },
  }
}

let _mountNode: Element | null = null
export const AppRender = (mountNode: Element) => {
  _mountNode = mountNode
  m.mount(mountNode, App)
}

