import "./App.css"
import { App as AntApp } from "antd"
import Routes from "./routes/Routes"

const App = () => {
  return (
    <div>
      <AntApp>
        <Routes />
      </AntApp>
    </div>
  )
}

export default App