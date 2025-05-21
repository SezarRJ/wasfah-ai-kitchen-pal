
import React from 'react';
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
import { AlertTriangle, Trash } from 'lucide-react';

interface DeleteAccountConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteAccountConfirmation: React.FC<DeleteAccountConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="border-2 border-red-200 dark:border-red-900/30 dark:bg-gray-900">
        <AlertDialogHeader>
          <div className="mx-auto bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <AlertDialogTitle className="text-center text-red-600 dark:text-red-400">Delete Account</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <p className="mb-2 font-medium">This action cannot be undone.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              When you delete your account, all your data will be permanently removed. This includes your profile,
              saved recipes, meal plans, and all other information.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
          <AlertDialogCancel className="border-gray-300 text-gray-700 hover:text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white flex items-center justify-center"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
