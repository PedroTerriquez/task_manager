import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { ProjectNew } from "./components/ProjectNew";
import { TaskNew } from "./components/TaskNew";
import { ProjectShow } from "./components/ProjectShow";
import { TaskShow } from "./components/TaskShow";
import { NotFound } from "./components/NotFound";
import { LayoutProvider } from "./LayoutProvider";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";


function App() {
  return (
    <Router>
      <LayoutProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" >
            <Route path="new" element={<ProjectNew />} />
            <Route path=":id" element={<ProjectShow />} />
            <Route path=":id/tasks" >
              <Route path="new" element={<TaskNew />} />
              <Route path=":id" element={<TaskShow />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutProvider>
    </Router>
  );
}

export default App;