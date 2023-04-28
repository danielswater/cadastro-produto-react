import RouteApp from "./routes";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div>
            <ToastContainer theme="light" />
            <RouteApp />
        </div>
    );
}

export default App;
