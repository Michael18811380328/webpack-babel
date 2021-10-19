import * as React from "react";
import * as ReactDOM from "react-dom";
import { Demo } from "./components/Demo";

// 根节点：把 Demo 渲染到 app 节点中
ReactDOM.render(<Demo compiler="TypeScript" framework="React" />, document.getElementById("app"));
