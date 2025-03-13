import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wrench, FileText, Settings as SettingsIcon, PenTool as Tool, Bell, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationsPanel from '../notifications/NotificationsPanel';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/interventions', label: 'Interventions', icon: Wrench },
    { path: '/equipment', label: 'Equipment', icon: Tool },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40">
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
                  className={`w-full flex items-center px-4 py-2 mt-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 ${
                    isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : ''
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

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40"
          >
            <div className="flex flex-col h-full">
              <div className="p-4">
                <h1 className="text-xl font-bold text-gray-800">Maintenance Manager Pro</h1>
              </div>
              
              <nav className="flex-1 px-2 py-4">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-2 mt-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 ${
                        isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : ''
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-sm sticky top-0 z-30"
        >
          <div className="flex items-center justify-between px-8 py-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {navigationItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
            
            <div className="flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-gray-900 relative"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer"
              />
            </div>
          </div>
        </motion.header>

        {/* Notifications Panel */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <NotificationsPanel onClose={() => setShowNotifications(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 p-8"
        >
          {children}
        </motion.main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </div>
  );
}

export default Layout;