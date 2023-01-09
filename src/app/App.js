import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import NotFound from "../common/components/NotFound";
import Dashboard from "../screens/Dashboard";
import Quote from "../screens/Quote";
import RcVehicle  from "../screens/RcVehicle";
import "./App.css";
import RcQuotes from "../screens/RcQuotes";


function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Quote/>} />
                    <Route path="/quote/:vehicle" element={<RcVehicle/>} />
                    <Route path="/quotes/:requestToken" element={<RcQuotes />} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
        </Router>
    );
}

export default App;
