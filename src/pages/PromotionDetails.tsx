import { ArrowLeft, Star, Clock, MapPin, Heart, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import burgerImage from "@/assets/burger-premium.jpg";
import pizzaImage from "@/assets/pizza-napoletana.jpg";
import sushiImage from "@/assets/sushi-platter.jpg";

const promotionsData = {
  "1": {
    name: "Burger Premium",
    discount: "30% OFF",
    rating: 4.8,
    reviews: 234,
    time: "25-35 min",
    distance: "1.2 km",
    image: "🍔",
    category: "Hamburguer",
    badge: "🔥 Mais Pedido",
    deliveryFee: "Grátis",
    imageQuery: "gourmet burger close up juicy cheeseburger",
    description: "Os melhores hambúrgueres artesanais da cidade! Carne selecionada, pão brioche e ingredientes frescos.",
    validUntil: "31/12/2024",
    terms: [
      "Válido para pedidos acima de R$ 30",
      "Não cumulativo com outras promoções",
      "Válido apenas para delivery",
    ],
    menu: [
      { name: "Classic Burger", price: "R$ 25,90", discount: "R$ 18,13" },
      { name: "Cheese Bacon", price: "R$ 32,90", discount: "R$ 23,03" },
      { name: "Double Burger", price: "R$ 38,90", discount: "R$ 27,23" },
    ]
  },
  "2": {
    name: "Pizza Napoletana",
    discount: "2 por 1",
    rating: 4.9,
    reviews: 456,
    time: "30-40 min",
    distance: "2.5 km",
    image: "🍕",
    category: "Pizza",
    badge: "⚡ Entrega Rápida",
    deliveryFee: "R$ 3,00",
    imageQuery: "pepperoni pizza close up lots of pepperoni",
    description: "Autêntica pizza italiana feita no forno a lenha. Massa artesanal e ingredientes importados.",
    validUntil: "31/12/2024",
    terms: [
      "Compre 1 pizza grande e leve outra do mesmo tamanho",
      "Pizzas de mesmo valor ou menor",
      "Válido de segunda a quinta",
    ],
    menu: [
      { name: "Margherita", price: "R$ 45,90", discount: "2 por 1" },
      { name: "Calabresa", price: "R$ 42,90", discount: "2 por 1" },
      { name: "Portuguesa", price: "R$ 48,90", discount: "2 por 1" },
    ]
  },
  "3": {
    name: "Sushi Express",
    discount: "25% OFF",
    rating: 4.7,
    reviews: 189,
    time: "20-30 min",
    distance: "0.8 km",
    image: "🍱",
    category: "Japonês",
    badge: "🆕 Novo",
    deliveryFee: "Grátis",
    imageQuery: "assorted sushi platter nigiri maki sashimi philadelphia roll",
    description: "Sushi fresco preparado na hora com peixes de qualidade premium. Entrega super rápida!",
    validUntil: "31/12/2024",
    terms: [
      "Válido para combos selecionados",
      "Pedido mínimo de R$ 40",
      "Disponível todos os dias",
    ],
    menu: [
      { name: "Combo 20 peças", price: "R$ 59,90", discount: "R$ 44,93" },
      { name: "Combo 30 peças", price: "R$ 79,90", discount: "R$ 59,93" },
      { name: "Combo Festival", price: "R$ 99,90", discount: "R$ 74,93" },
    ]
  },
};

const PromotionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const promotion = promotionsData[id as keyof typeof promotionsData];

  if (!promotion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Promoção não encontrada</p>
          <Button onClick={() => navigate("/")}>Voltar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64">
        <img
          src={promotion.image}
          alt={promotion.name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 right-4 gradient-gold text-foreground font-bold text-lg px-4 py-2">
          {promotion.discount}
        </Badge>
        <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1">
          {promotion.badge}
        </Badge>
      </div>

      <div className="px-4 py-6">
        {/* Restaurant Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{promotion.name}</h1>
              <p className="text-muted-foreground">{promotion.category}</p>
            </div>
            <div className="flex items-center gap-1 bg-accent/10 px-3 py-2 rounded-full">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold">{promotion.rating}</span>
              <span className="text-sm text-muted-foreground">({promotion.reviews})</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{promotion.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{promotion.distance}</span>
            </div>
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              {promotion.deliveryFee}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <Card className="p-4 mb-6">
          <h2 className="font-bold text-foreground mb-2">Sobre a Promoção</h2>
          <p className="text-muted-foreground mb-3">{promotion.description}</p>
          <div className="text-sm">
            <span className="text-muted-foreground">Válido até: </span>
            <span className="font-semibold text-foreground">{promotion.validUntil}</span>
          </div>
        </Card>

        {/* Menu with Discount */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Itens com Desconto</h2>
          <div className="space-y-3">
            {promotion.menu.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground line-through">{item.price}</span>
                      <span className="text-lg font-bold text-primary">{item.discount}</span>
                    </div>
                  </div>
                  <Button size="sm">Adicionar</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Terms */}
        <Card className="p-4 mb-6">
          <h2 className="font-bold text-foreground mb-3">Termos e Condições</h2>
          <ul className="space-y-2">
            {promotion.terms.map((term, index) => (
              <li key={index} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* CTA Button */}
        <Button className="w-full h-12 text-lg font-bold gradient-primary">
          Pedir Agora com {promotion.discount}
        </Button>
      </div>
    </div>
  );
};

export default PromotionDetails;
