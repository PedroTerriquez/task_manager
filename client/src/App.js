import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { ProjectNew } from "./components/ProjectNew";
import { TaskNew } from "./components/TaskNew";
import { ProjectShow } from "./components/ProjectShow";
import { TaskShow } from "./components/TaskShow";
import { NotFound } from "./components/NotFound";
import { NotificationProvider } from "./NotificationProvider";


function App() {
  return (
    <NotificationProvider>
      <Router>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;