
import React from 'react';
import { Eye, Heart, MessageSquare, Share2, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface RecipeSocialInteractionsProps {
  recipeId: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  rating: number;
  ratingCount: number;
  usedCount: number;
  isLiked?: boolean;
  compact?: boolean;
  className?: string;
  showActionText?: boolean;
}

export const RecipeSocialInteractions: React.FC<RecipeSocialInteractionsProps> = ({
  recipeId,
  views,
  likes,
  comments,
  shares,
  rating,
  ratingCount,
  usedCount,
  isLiked = false,
  compact = false,
  className,
  showActionText = true,
}) => {
  const [liked, setLiked] = React.useState(isLiked);
  const [likeCount, setLikeCount] = React.useState(likes);

  const handleLike = () => {
    // In a real app, this would call an API to like/unlike the recipe
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
      toast({
        title: "Recipe liked",
        description: "This recipe has been added to your favorites."
      });
    }
    setLiked(!liked);
  };

  const handleComment = () => {
    // In a real app, this would open a comment modal or navigate to comments
    toast({
      title: "Comments",
      description: "Comment functionality would open here."
    });
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share Recipe",
      description: "Sharing options would appear here."
    });
  };

  // Generate stars for rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />);
      } else if (i === fullStars && hasHalfStar) {
        // This is a simplified half star (just showing an outline star instead)
        stars.push(<Star key={i} className="h-3 w-3 text-yellow-500" />);
      } else {
        stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
      }
    }

    return stars;
  };

  if (compact) {
    // Compact version for recipe cards
    return (
      <div className={cn("flex items-center text-xs text-gray-600 space-x-3", className)}>
        <div className="flex items-center">
          <Eye className="h-3 w-3 mr-1" />
          <span>{views}</span>
        </div>
        <div className="flex items-center">
          <Heart className={cn("h-3 w-3 mr-1", liked ? "fill-red-500 text-red-500" : "")} />
          <span>{likeCount}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-3 w-3 mr-1" />
          <span>{usedCount}</span>
        </div>
        <div className="flex items-center">
          <div className="flex">{renderStars()}</div>
          <span className="ml-1">({ratingCount})</span>
        </div>
      </div>
    );
  }

  // Full version with interactive buttons
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1 text-blue-500" />
            <span>{views} views</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-green-500" />
            <span>{usedCount} uses</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex mr-1">{renderStars()}</div>
          <span className="text-sm">({ratingCount})</span>
        </div>
      </div>

      <div className="flex justify-between border-t border-b py-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLike} 
          className={cn("flex-1", liked ? "text-red-500" : "text-gray-600")}
        >
          <Heart className={cn("h-4 w-4 mr-1", liked ? "fill-red-500" : "")} />
          {showActionText && <span>{liked ? "Liked" : "Like"}</span>}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleComment}
          className="flex-1 text-gray-600"
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          {showActionText && <span>Comment</span>}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleShare}
          className="flex-1 text-gray-600"
        >
          <Share2 className="h-4 w-4 mr-1" />
          {showActionText && <span>Share</span>}
        </Button>
      </div>
    </div>
  );
};
