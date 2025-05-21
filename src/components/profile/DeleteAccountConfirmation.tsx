
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
  const [secondStep, setSecondStep] = useState(false);
  const isConfirmEnabled = confirmText.toLowerCase() === 'delete';

  const handleProceed = () => {
    if (!secondStep) {
      setSecondStep(true);
    } else if (isConfirmEnabled) {
      onConfirm();
    }
  };

  const handleClose = () => {
    setConfirmText('');
    setSecondStep(false);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="border-2 border-red-200 dark:border-red-900/30 dark:bg-gray-900 max-w-md mx-auto">
        <AlertDialogHeader>
          <div className="mx-auto bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4">
            {secondStep ? 
              <Lock className="h-6 w-6 text-red-600 dark:text-red-400" /> : 
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            }
          </div>
          <AlertDialogTitle className="text-center text-red-600 dark:text-red-400">
            {secondStep ? 'Confirm Account Deletion' : 'Delete Account'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {!secondStep ? (
              <>
                <p className="mb-2 font-medium">This action cannot be undone.</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  When you delete your account, all your data will be permanently removed. This includes your profile,
                  saved recipes, meal plans, and all other information.
                </p>
              </>
            ) : (
              <>
                <p className="mb-4 font-medium">Final confirmation required</p>
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md mb-4">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    To confirm deletion of <span className="font-bold">{userEmail}</span>, please type "delete" below:
                  </p>
                </div>
                <Input 
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type 'delete'"
                  className="border-red-300 dark:border-red-700/50 mb-2"
                  autoFocus
                />
                {confirmText && !isConfirmEnabled && (
                  <p className="text-xs text-red-500 mt-1">Please type "delete" exactly as shown</p>
                )}
              </>
            )}
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
            onClick={handleProceed}
            className={`bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white flex items-center justify-center ${
              secondStep && !isConfirmEnabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={secondStep && !isConfirmEnabled}
          >
            <Trash className="mr-2 h-4 w-4" />
            {secondStep ? "Delete My Account" : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
