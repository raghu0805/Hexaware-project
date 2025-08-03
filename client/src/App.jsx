// Make sure you're using the default export
// import Layout from './Components/Layout'
import Register from './Auth/Register'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Role from './Components/Role';
import ResumeUpload from './Components/ResumeUpload';
import AdminConsole from './Components/AdminConsole';
import ConsultantAdmin from './Components/ConsultantAdmin';
import ResumeUploader from './PracticeResume/ResumeUploader';
import ConsultantLogin from './Auth/ConsultantLogin';



function App() {
  var isemailexist=localStorage.getItem("email")

  return (
    <Router>
      
        <Routes>
          <Route path="/uploadresume" element={<ResumeUploader/>}/>
          <Route path="/" element={<Role/>}/>
          <Route path="/upload" element={<ResumeUpload/>}/>
          <Route path="/login" element={<ConsultantLogin/>}/>
          <Route path="/consultant" element={<ConsultantAdmin/>} />
          <Route path="/resumeupload" element={<ResumeUpload/>}/>
          
          <Route path="/register" element={<Register/>}/>
          <Route path="/adminpage" element={<AdminConsole/>}/>
        </Routes>
    </Router>
  );
}

// Use default export here
export default App;
