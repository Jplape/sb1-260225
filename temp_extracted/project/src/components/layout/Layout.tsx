import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wrench, FileText, Settings as SettingsIcon, PenTool as Tool, Bell } from 'lucide-react';
import NotificationsPanel from '../notifications/NotificationsPanel';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = React.useState(false);

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/interventions', label: 'Interventions', icon: Wrench },
    { path: '/equipment', label: 'Equipment', icon: Tool },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-800">Maintenance Manager Pro</h1>
          </div>
          
          <nav className="flex-1 px-2 py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center px-4 py-2 mt-2 text-gray-700 rounded-lg hover:bg-gray-100 ${
                    isActive ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {navigationItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-gray-900 relative"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </header>

        {/* Notifications Panel */}
        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        )}

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;