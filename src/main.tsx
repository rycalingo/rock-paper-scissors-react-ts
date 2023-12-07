import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { OptionsProvider } from "./context/optionsContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<OptionsProvider>
			<App />
		</OptionsProvider>
	</React.StrictMode>
);
