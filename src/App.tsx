import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { FormPage } from './pages/Form/FormPage';
import { Generating } from './pages/Generating';
import { ResumePreview } from './pages/ResumePreview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Placeholder routes for future implementation */}
        <Route path="/form" element={<FormPage />} />
        <Route path="/generating" element={<Generating />} />
        <Route path="/preview" element={<ResumePreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
