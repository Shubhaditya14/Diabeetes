import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Layout({ darkMode, toggleDarkMode }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
