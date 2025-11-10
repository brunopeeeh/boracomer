import { useState, useRef } from "react";
import { ArrowLeft, Clock, MapPin, Phone, Star, Heart, Share2, ChevronRight, ChevronLeft, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import BottomNav from "@/components/BottomNav";
import logoBurgerPremium from "@/assets/logo-burger-premium.png";
import logoPizzaNapoletana from "@/assets/logo-pizza-napoletana.png";
import logoSushiExpress from "@/assets/logo-sushi-express.png";
import logoTacoLoco from "@/assets/logo-taco-loco.png";
import logoTheBurger from "@/assets/logo-the-burger.png";
import burgerImage from "@/assets/burger-premium.jpg";
import burgerSocialImage from "@/assets/burger-social.jpg";
import burgerInterior from "@/assets/burger-restaurant-interior.jpg";
import burgerKitchen from "@/assets/burger-kitchen.jpg";
import burgerFries from "@/assets/burger-fries.jpg";
import burgerExterior from "@/assets/burger-exterior.jpg";
import pizzaImage from "@/assets/pizza-napoletana.jpg";
import pizzaSocialImage from "@/assets/pizza-social.jpg";
import pizzaInterior from "@/assets/pizza-interior.jpg";
import pizzaChef from "@/assets/pizza-chef.jpg";
import pizzaCaprese from "@/assets/pizza-caprese.jpg";
import pizzaExterior from "@/assets/pizza-exterior.jpg";
import sushiImage from "@/assets/sushi-platter.jpg";
import sushiSocialImage from "@/assets/sushi-social.jpg";
import sushiInterior from "@/assets/sushi-interior.jpg";
import sushiChef from "@/assets/sushi-chef.jpg";
import sushiMiso from "@/assets/sushi-miso.jpg";
import sushiExterior from "@/assets/sushi-exterior.jpg";
import tacosImage from "@/assets/tacos-fiesta.jpg";
import tacosInterior from "@/assets/taco-interior.jpg";
import tacosChef from "@/assets/taco-chef.jpg";
import tacosGuacamole from "@/assets/taco-guacamole.jpg";
import tacosExterior from "@/assets/taco-exterior.jpg";
import theBurgerImage from "@/assets/the-burger-main.jpg";
import theBurgerSocial from "@/assets/the-burger-social.jpg";
import theBurgerInterior from "@/assets/the-burger-interior.jpg";
import theBurgerChef from "@/assets/the-burger-chef.jpg";
import theBurgerFries from "@/assets/the-burger-fries.jpg";
import theBurgerExterior from "@/assets/the-burger-exterior.jpg";

// Dados mockados da loja - em produção viria de uma API
const storesData: Record<string, any> = {
  "burger-premium": {
    id: 1,
    name: "Burger Premium",
    logo: logoBurgerPremium,
    category: "Hamburguer Artesanal",
    rating: 4.8,
    reviews: 234,
    description: "Os melhores hambúrgueres artesanais da cidade! Carne selecionada, pão brioche artesanal e ingredientes premium.",
    address: "Rua das Flores, 123 - Centro",
    phone: "(11) 98765-4321",
    distance: "1.2 km",
    deliveryTime: "25-35 min",
    deliveryFee: "Grátis",
    minOrder: "R$ 25,00",
    openingHours: [
      { day: "Segunda a Sexta", hours: "11:00 - 23:00" },
      { day: "Sábado", hours: "12:00 - 00:00" },
      { day: "Domingo", hours: "12:00 - 22:00" },
    ],
    images: [
      burgerImage, 
      burgerSocialImage, 
      burgerInterior, 
      burgerKitchen, 
      burgerFries, 
      burgerExterior
    ],
    tags: ["🔥 Mais Pedido", "⭐ Top Avaliado", "🚚 Entrega Rápida"],
    followers: 1200,
    posts: 45,
    reviews_list: [
      {
        id: 1,
        user: "Ana Silva",
        avatar: "👩",
        rating: 5,
        comment: "Simplesmente o melhor hambúrguer que já comi! A carne é suculenta e os ingredientes são fresquíssimos.",
        date: "Há 2 dias"
      },
      {
        id: 2,
        user: "Carlos Mendes",
        avatar: "👨",
        rating: 5,
        comment: "Atendimento impecável e entrega super rápida. Virou meu favorito!",
        date: "Há 1 semana"
      },
      {
        id: 3,
        user: "Maria Costa",
        avatar: "👩‍🦱",
        rating: 4,
        comment: "Muito bom! Só achei que poderia vir mais batata, mas o hambúrguer é excelente.",
        date: "Há 2 semanas"
      }
    ]
  },
  "pizza-napoletana": {
    id: 2,
    name: "Pizza Napoletana",
    logo: logoPizzaNapoletana,
    category: "Pizza Italiana",
    rating: 4.9,
    reviews: 456,
    description: "Autêntica pizza italiana feita no forno a lenha. Massa artesanal fermentada por 48h e ingredientes importados diretamente da Itália.",
    address: "Av. Paulista, 789 - Bela Vista",
    phone: "(11) 97654-3210",
    distance: "2.5 km",
    deliveryTime: "30-40 min",
    deliveryFee: "R$ 8,00",
    minOrder: "R$ 40,00",
    openingHours: [
      { day: "Segunda a Quinta", hours: "18:00 - 23:00" },
      { day: "Sexta e Sábado", hours: "18:00 - 01:00" },
      { day: "Domingo", hours: "18:00 - 23:00" },
    ],
    images: [
      pizzaImage,
      pizzaSocialImage,
      pizzaInterior,
      pizzaChef,
      pizzaCaprese,
      pizzaExterior
    ],
    tags: ["🇮🇹 Autêntica", "🔥 Forno a Lenha", "⭐ Top Avaliado"],
    followers: 2300,
    posts: 78,
    reviews_list: [
      {
        id: 1,
        user: "Giuseppe Romano",
        avatar: "👨‍🍳",
        rating: 5,
        comment: "Como italiano, posso confirmar: essa é a pizza mais autêntica que já comi fora da Itália!",
        date: "Há 3 dias"
      },
      {
        id: 2,
        user: "Julia Santos",
        avatar: "👩",
        rating: 5,
        comment: "A massa é perfeita, ingredientes fresquíssimos. Vale cada centavo!",
        date: "Há 5 dias"
      },
      {
        id: 3,
        user: "Pedro Lima",
        avatar: "👨‍💼",
        rating: 5,
        comment: "Melhor pizza da cidade, sem dúvida. O ambiente também é maravilhoso!",
        date: "Há 1 semana"
      }
    ]
  },
  "sushi-express": {
    id: 3,
    name: "Sushi Express",
    logo: logoSushiExpress,
    category: "Culinária Japonesa",
    rating: 4.7,
    reviews: 189,
    description: "Sushi fresco preparado na hora com peixes de qualidade premium. Entrega super rápida e apresentação impecável!",
    address: "Rua Japão, 456 - Liberdade",
    phone: "(11) 96543-2109",
    distance: "0.8 km",
    deliveryTime: "20-30 min",
    deliveryFee: "Grátis",
    minOrder: "R$ 35,00",
    openingHours: [
      { day: "Terça a Domingo", hours: "18:00 - 23:30" },
      { day: "Segunda", hours: "Fechado" },
    ],
    images: [
      sushiImage,
      sushiSocialImage,
      sushiInterior,
      sushiChef,
      sushiMiso,
      sushiExterior
    ],
    tags: ["🍱 Fresco", "⚡ Entrega Rápida", "🆕 Novo"],
    followers: 890,
    posts: 34,
    reviews_list: [
      {
        id: 1,
        user: "Yuki Tanaka",
        avatar: "👨",
        rating: 5,
        comment: "Peixe fresco e de altíssima qualidade! O salmão derrete na boca.",
        date: "Há 1 dia"
      },
      {
        id: 2,
        user: "Amanda Costa",
        avatar: "👩",
        rating: 5,
        comment: "Entrega super rápida e tudo chegou perfeito. Já virou meu favorito!",
        date: "Há 4 dias"
      },
      {
        id: 3,
        user: "Lucas Ferreira",
        avatar: "👨‍💻",
        rating: 4,
        comment: "Muito bom! Porções generosas e preço justo.",
        date: "Há 1 semana"
      }
    ]
  },
  "taco-loco": {
    id: 4,
    name: "Taco Loco",
    logo: logoTacoLoco,
    category: "Culinária Mexicana",
    rating: 4.6,
    reviews: 167,
    description: "Sabores autênticos do México! Tacos, burritos e nachos preparados com receitas tradicionais e ingredientes frescos.",
    address: "Rua México, 321 - Vila Madalena",
    phone: "(11) 95432-1098",
    distance: "1.5 km",
    deliveryTime: "20-30 min",
    deliveryFee: "R$ 5,00",
    minOrder: "R$ 30,00",
    openingHours: [
      { day: "Segunda a Sábado", hours: "11:30 - 23:00" },
      { day: "Domingo", hours: "12:00 - 22:00" },
    ],
    images: [
      tacosImage,
      tacosInterior,
      tacosChef,
      tacosGuacamole,
      tacosExterior,
      tacosImage
    ],
    tags: ["🌮 Autêntico", "🌶️ Picante", "🎉 Ambiente Festivo"],
    followers: 650,
    posts: 28,
    reviews_list: [
      {
        id: 1,
        user: "Diego Hernandez",
        avatar: "👨",
        rating: 5,
        comment: "Como mexicano, posso dizer que é o taco mais autêntico que já provei no Brasil!",
        date: "Há 2 dias"
      },
      {
        id: 2,
        user: "Camila Rodrigues",
        avatar: "👩",
        rating: 5,
        comment: "A guacamole é divina! Voltarei com certeza.",
        date: "Há 5 dias"
      },
      {
        id: 3,
        user: "Rafael Santos",
        avatar: "👨‍🎤",
        rating: 4,
        comment: "Muito gostoso e bem temperado. Porções poderiam ser maiores.",
        date: "Há 1 semana"
      }
    ]
  },
  "bfs": {
    id: 5,
    name: "The Burger",
    logo: logoTheBurger,
    category: "Hamburgueria",
    rating: 4.9,
    reviews: 312,
    description: "Hambúrgueres artesanais com ingredientes selecionados e receitas exclusivas. A casa dos melhores burgers de Vitória!",
    address: "Rua Henrique Rosetti, 33 - Bento Ferreira, Vitória - ES",
    phone: "(27) 99999-9999",
    distance: "0.5 km",
    deliveryTime: "20-30 min",
    deliveryFee: "Grátis",
    minOrder: "R$ 30,00",
    openingHours: [
      { day: "Segunda a Domingo", hours: "14:45 - 22:45" },
    ],
    images: [
      theBurgerImage,
      theBurgerSocial,
      theBurgerInterior,
      theBurgerChef,
      theBurgerFries,
      theBurgerExterior
    ],
    tags: ["🔥 Delivery Rápido", "⭐ Avaliação Top", "🍔 Artesanal"],
    followers: 1850,
    posts: 67,
    reviews_list: [
      {
        id: 1,
        user: "Roberto Silva",
        avatar: "👨‍💼",
        rating: 5,
        comment: "O melhor hambúrguer que já comi em Vitória! Ingredientes frescos e atendimento impecável.",
        date: "Há 1 dia"
      },
      {
        id: 2,
        user: "Patricia Alves",
        avatar: "👩",
        rating: 5,
        comment: "Simplesmente perfeito! A carne é suculenta e o pão é uma delícia. Virou meu favorito!",
        date: "Há 3 dias"
      },
      {
        id: 3,
        user: "Felipe Costa",
        avatar: "👨",
        rating: 5,
        comment: "Entrega super rápida e o hambúrguer chegou quentinho e perfeito. Recomendo!",
        date: "Há 1 semana"
      }
    ]
  }
};

const Store = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const store = storesData[slug || "burger-premium"];

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  if (!store) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Loja não encontrada</p>
          <Button onClick={() => navigate("/discover")}>Voltar para Descobrir</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header fixo */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3" role="banner">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/discover")}
              aria-label="Voltar para descobrir restaurantes"
              className="transition-transform duration-200 hover:scale-110"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            <h1 className="text-lg font-bold text-foreground">{store.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsFavorited(!isFavorited)}
              aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              aria-pressed={isFavorited}
              className="transition-transform duration-200 hover:scale-110"
            >
              <Heart className={`h-5 w-5 transition-all duration-200 ${isFavorited ? 'fill-primary text-primary' : ''}`} aria-hidden="true" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              aria-label="Compartilhar restaurante"
              className="transition-transform duration-200 hover:scale-110"
            >
              <Share2 className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <main id="main">
      <div className="relative" role="img" aria-label={`Banner do restaurante ${store.name}`}>
        <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10" />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-background shadow-lg bg-white">
            <img 
              src={store.logo} 
              alt={`Logo do ${store.name}`} 
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <div className="px-4 pt-16 pb-4">
        {/* Nome e categoria */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-1">{store.name}</h2>
          <p className="text-muted-foreground">{store.category}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold">{store.rating}</span>
              <span className="text-sm text-muted-foreground">({store.reviews})</span>
            </div>
            <Badge variant="secondary">{store.followers} seguidores</Badge>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {store.tags.map((tag: string, i: number) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Descrição */}
        <Card className="p-4 mb-4 shadow-soft">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {store.description}
          </p>
        </Card>

        {/* Informações de entrega */}
        <Card className="p-4 mb-4 shadow-soft">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Informações de Entrega
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tempo de entrega:</span>
              <span className="font-semibold text-foreground">{store.deliveryTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxa de entrega:</span>
              <span className="font-semibold text-primary">{store.deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pedido mínimo:</span>
              <span className="font-semibold text-foreground">{store.minOrder}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distância:</span>
              <span className="font-semibold text-foreground">{store.distance}</span>
            </div>
          </div>
        </Card>

        {/* Horário de funcionamento */}
        <Card className="p-4 mb-4 shadow-soft">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Horário de Funcionamento
          </h3>
          <div className="space-y-2">
            {store.openingHours.map((schedule: any, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{schedule.day}</span>
                <span className="font-semibold text-foreground">{schedule.hours}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Endereço e contato */}
        <Card className="p-4 mb-4 shadow-soft">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Localização e Contato
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-foreground font-medium">{store.address}</p>
                <Button variant="link" className="h-auto p-0 text-xs text-primary">
                  Ver no mapa
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <a href={`tel:${store.phone}`} className="text-sm text-foreground font-medium hover:text-primary">
                {store.phone}
              </a>
            </div>
          </div>
        </Card>

        {/* Galeria de fotos - Carrossel horizontal com setas */}
        <Card className="p-4 mb-4 shadow-soft">
          <h3 className="font-bold text-foreground mb-3">Fotos do Estabelecimento</h3>
          <div className="relative group">
            {/* Setas de navegação - visíveis apenas em desktop */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => scrollCarousel('left')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => scrollCarousel('right')}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div 
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1 scroll-smooth"
            >
              {store.images.map((image: string, i: number) => (
                <div 
                  key={i} 
                  className="flex-shrink-0 w-48 h-48 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${store.name} - foto ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Dialog para expandir imagem */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-0">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-5 w-5" />
              </Button>
              {selectedImage && (
                <img 
                  src={selectedImage} 
                  alt="Imagem expandida"
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Avaliações */}
        <Card className="p-4 mb-4 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Avaliações</h3>
            <Button variant="link" className="h-auto p-0 text-sm">
              Ver todas
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-4">
            {store.reviews_list.map((review: any) => (
              <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm text-foreground">{review.user}</h4>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Botão de ação - Não fixo, integrado ao conteúdo */}
        <div className="mt-6 mb-4">
          <Button 
            className="w-full h-12 text-base font-semibold shadow-lg gradient-primary"
            onClick={() => {
              // Navegar para o cardápio ou abrir modal
              console.log("Abrir cardápio de delivery");
            }}
            aria-label="Ver cardápio completo para delivery"
          >
            Ver Cardápio de Delivery
          </Button>
        </div>
      </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Store;
