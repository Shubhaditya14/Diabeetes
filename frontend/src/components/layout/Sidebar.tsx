import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Brain,
  GraduationCap,
  GitCompare,
  TrendingDown,
  ExternalLink,
  Info,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/predictions', icon: Brain, label: 'Predictions' },
  { to: '/training', icon: GraduationCap, label: 'Training' },
  { to: '/models', icon: GitCompare, label: 'Models' },
  { to: '/drift', icon: TrendingDown, label: 'Drift' },
  { to: '/comet', icon: ExternalLink, label: 'Comet ML' },
  { to: '/about', icon: Info, label: 'About' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-deep-blue text-white dark:bg-teal'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Airflow Link */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <a
          href="http://localhost:8080"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-deep-blue dark:hover:text-teal transition-colors"
        >
          <span>Open Airflow UI</span>
          <span className="text-xs">(admin/admin)</span>
        </a>
      </div>
    </aside>
  );
}
