
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle, Trash, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface DeleteAccountConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userEmail?: string;
}

export const DeleteAccountConfirmation: React.FC<DeleteAccountConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userEmail = 'your account',
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const isConfirmEnabled = confirmText.toLowerCase() === 'delete';

  const handleConfirm = () => {
    if (!isConfirmEnabled) return;
    
    setIsDeleting(true);
    
    // Simulate a deletion process (in a real app, this would be an API call)
    setTimeout(() => {
      setIsDeleting(false);
      onConfirm();
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted",
        variant: "destructive",
      });
    }, 1500);
  };

  const handleClose = () => {
    setConfirmText('');
    setIsDeleting(false);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="border-2 border-red-200 dark:border-red-900/30 dark:bg-gray-900 max-w-md mx-auto">
        <AlertDialogHeader>
          <div className="mx-auto bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <AlertDialogTitle className="text-center text-red-600 dark:text-red-400">
            Delete Account
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-4">
            <p className="font-medium">This action cannot be undone.</p>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">
                All your data will be permanently deleted, including your profile, saved recipes, meal plans, and all other personal information.
              </p>
            </div>
            
            <div className="pt-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                To confirm deletion of <span className="font-bold">{userEmail}</span>, please type "delete" below:
              </p>
              <Input 
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type 'delete'"
                className="border-red-300 dark:border-red-700/50"
                autoFocus
              />
              {confirmText && !isConfirmEnabled && (
                <p className="text-xs text-red-500 mt-1">Please type "delete" exactly as shown</p>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
          <AlertDialogCancel 
            className="border-gray-300 text-gray-700 hover:text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={handleClose}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className={`bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white flex items-center justify-center ${
              !isConfirmEnabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isConfirmEnabled || isDeleting}
          >
            {isDeleting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" />
                Delete My Account
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
