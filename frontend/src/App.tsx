import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Predictions } from './pages/Predictions';
import { Training } from './pages/Training';
import { Drift } from './pages/Drift';
import { About } from './pages/About';
import { Models } from './pages/Models';
import { CometML } from './pages/CometML';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 2,
    },
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/training" element={<Training />} />
            <Route path="/models" element={<Models />} />
            <Route path="/drift" element={<Drift />} />
            <Route path="/comet" element={<CometML />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
