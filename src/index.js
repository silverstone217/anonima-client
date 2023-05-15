import React from "react";
import { createRoot,} from "react-dom/client"
import { BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "./css/index.css";

const container  = document.getElementById('root');
const root = createRoot(container);

root.render(
<Router>
    <AppRouter/>
</Router>)