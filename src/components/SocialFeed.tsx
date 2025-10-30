import { Heart, MessageCircle, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import SmartImage from "@/components/ui/SmartImage";

const posts = [
  {
    id: 1,
    user: "Ana Silva",
    userAvatar: "👩",
    restaurant: "Burger Premium",
    image: "🍔",
    imageQuery: "gourmet burger close up juicy cheeseburger",
    likes: 42,
    comments: 8,
    rating: 5,
    text: "Melhor hambúrguer da cidade! 🤤",
    time: "2h atrás"
  },
  {
    id: 2,
    user: "Carlos Oliveira",
    userAvatar: "👨",
    restaurant: "Pizza Napoletana",
    image: "🍕",
    imageQuery: "pepperoni pizza close up lots of pepperoni",
    likes: 35,
    comments: 5,
    rating: 5,
    text: "Pizza maravilhosa, super recomendo!",
    time: "5h atrás"
  },
  {
    id: 3,
    user: "Maria Santos",
    userAvatar: "👩‍🦱",
    restaurant: "Sushi Express",
    image: "🍱",
    imageQuery: "assorted sushi platter nigiri maki sashimi philadelphia roll",
    likes: 28,
    comments: 3,
    rating: 4,
    text: "Sushi fresco e delicioso 🍣",
    time: "1d atrás"
  },
];

const SocialFeed = () => {
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold mb-4 text-foreground">Feed da Comunidade</h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Card
            key={post.id}
            className="overflow-hidden shadow-soft animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
                  {post.userAvatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-foreground">{post.user}</h4>
                  <p className="text-xs text-muted-foreground">
                    {post.restaurant} • {post.time}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-accent text-accent" />
                  <span className="text-xs font-semibold">{post.rating}</span>
                </div>
              </div>
              
              <div className="mb-3 h-48 rounded-xl overflow-hidden relative">
                <SmartImage
                  query={post.imageQuery || post.restaurant}
                  width={640}
                  height={320}
                  alt={`${post.restaurant} - foto do post`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              <p className="text-sm text-foreground mb-3">{post.text}</p>
              
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
