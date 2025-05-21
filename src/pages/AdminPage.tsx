
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AdminPage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isViewingLogs, setIsViewingLogs] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const { toast } = useToast();

  // Mock function to refresh data
  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "All admin data has been successfully refreshed.",
        duration: 3000,
      });
    }, 1500);
  };

  // Mock function to view logs
  const handleViewLogs = () => {
    setIsViewingLogs(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsViewingLogs(false);
      setLogs([
        "[2025-05-21 08:30:12] INFO: Admin login successful",
        "[2025-05-21 08:35:27] WARNING: Failed login attempt from IP 192.168.1.105",
        "[2025-05-21 09:15:03] INFO: User data exported by admin",
        "[2025-05-21 10:22:45] INFO: System maintenance completed",
        "[2025-05-21 11:05:18] ERROR: Database connection timeout",
      ]);
      
      toast({
        title: "System Logs",
        description: "System logs have been loaded successfully.",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden border-l dark:border-gray-800">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Admin Actions */}
          <div className="mb-6 flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
              onClick={handleRefreshData}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                'Refresh Data'
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
              onClick={handleViewLogs}
              disabled={isViewingLogs}
            >
              {isViewingLogs ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'View Logs'
              )}
            </Button>
          </div>
          
          {/* System Logs */}
          {logs.length > 0 && (
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">System Logs</h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded p-3 font-mono text-xs overflow-x-auto max-h-40 overflow-y-auto">
                {logs.map((log, index) => (
                  <div 
                    key={index} 
                    className={`py-1 ${
                      log.includes("ERROR") ? "text-red-600 dark:text-red-400" : 
                      log.includes("WARNING") ? "text-amber-600 dark:text-amber-400" : 
                      "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
