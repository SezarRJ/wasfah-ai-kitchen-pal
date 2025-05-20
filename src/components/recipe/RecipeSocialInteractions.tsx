
import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface RecipeSocialInteractionsProps {
  recipeId: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  onLike: (recipeId: string) => void;
  onComment: (recipeId: string, comment: string) => void;
  onShare: (recipeId: string) => void;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Chef Maria',
    avatar: '/placeholder.svg',
    content: 'This recipe is amazing! I added a bit more garlic and it was perfect.',
    timestamp: '2 hours ago',
    likes: 5
  },
  {
    id: '2',
    author: 'John D.',
    avatar: '/placeholder.svg',
    content: 'Thanks for sharing this! My family loved it.',
    timestamp: '5 hours ago',
    likes: 3
  },
  {
    id: '3',
    author: 'Sarah K.',
    avatar: '/placeholder.svg',
    content: 'Can this be made with almond flour instead?',
    timestamp: '1 day ago',
    likes: 2
  }
];

export const RecipeSocialInteractions: React.FC<RecipeSocialInteractionsProps> = ({
  recipeId,
  likes = 0,
  comments = mockComments,
  isLiked = false,
  onLike,
  onComment,
  onShare
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { toast } = useToast();
  
  const handleLike = () => {
    onLike(recipeId);
    
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked 
        ? "This recipe has been removed from your favorites"
        : "This recipe has been added to your favorites",
    });
  };
  
  const handleShare = () => {
    onShare(recipeId);
    
    const shareOptions = [
      { name: 'WhatsApp', icon: '📱' },
      { name: 'Facebook', icon: '👍' },
      { name: 'Twitter', icon: '🐦' },
      { name: 'Email', icon: '✉️' },
      { name: 'Copy Link', icon: '🔗' }
    ];
    
    toast({
      title: "Share Recipe",
      description: (
        <div className="grid grid-cols-5 gap-2 mt-2">
          {shareOptions.map(option => (
            <div key={option.name} className="flex flex-col items-center cursor-pointer hover:opacity-80">
              <div className="text-2xl mb-1">{option.icon}</div>
              <div className="text-xs">{option.name}</div>
            </div>
          ))}
        </div>
      ),
    });
  };
  
  const handleSendComment = () => {
    if (commentText.trim()) {
      onComment(recipeId, commentText);
      setCommentText('');
      
      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully",
      });
    }
  };
  
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`group ${isLiked ? 'text-wasfah-coral-red' : ''}`}
              onClick={handleLike}
            >
              <Heart 
                className={`h-5 w-5 mr-2 group-hover:fill-wasfah-coral-red group-hover:text-wasfah-coral-red transition-colors ${
                  isLiked ? 'fill-wasfah-coral-red' : ''
                }`} 
              />
              <span>{likes}</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            <span>{comments.length}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5 mr-2" />
            <span>Share</span>
          </Button>
        </div>
      </div>
      
      {showComments && (
        <Card className="p-4 bg-gray-50 border">
          <ScrollArea className="h-60 pr-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="mt-1 text-sm">{comment.content}</p>
                    </div>
                    <div className="flex mt-1 text-xs text-gray-500">
                      <button className="hover:text-wasfah-coral-red">Like ({comment.likes})</button>
                      <span className="mx-2">•</span>
                      <button>Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex items-center mt-4">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center bg-white rounded-full overflow-hidden border">
              <Input 
                className="flex-1 border-0 shadow-none" 
                placeholder="Write a comment..." 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button 
                variant="ghost"
                size="sm"
                onClick={handleSendComment}
                disabled={!commentText.trim()}
                className="mr-1"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
