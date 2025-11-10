import { useState, useEffect, useRef } from "react";
import { ScrollArrows } from "@/components/ui/scroll-arrows";

interface Category {
  id: string;
  name: string;
  emoji: string;
}

interface Loja {
  modelo_negocio: string;
}

// Mapeia o modelo de negócio para um emoji
const emojiMap: { [key: string]: string } = {
  "Açaiteria": "🍓",
  "Doceria": "🧁",
  "Hamburgueria": "🍔",
  "Pizzaria": "🍕",
  "Restaurante": "🍽️",
  "Produtos Naturais": "🌿",
  "Padaria / Cafeteria": "☕",
  "Bar / Petiscaria": "🍻",
  "Sorveteria": "🍦",
  "Lanchonete": "🥪",
  "Saladeria": "🥗",
  "Churrasquinho": "🍖",
  "Japonês": "🍱",
  "Sobremesas": "🍰",
  "Saudável": "🥗",
  "Café": "☕",
  "Tabacaria": "🚬",
  "Distribuidora de Bebidas": "🍾",
  "Padaria": "🍞",
  "Comida Japonesa": "🍣",
  "Creperia": "🥞",
  "Franguinho": "🍗",
  "Cafeteria": "☕",
  "Material de Construção": "🧱",
  "Marmitaria": "🥡",
  "Confeitaria": "🍰",
  "Suplementos": "💊",
  "Sushi": "🍣",
  "Roupas e Acessórios": "👕",
  "Loja de Conveniência": "🏪",
  "Petshop": "🐾",
  "Informática": "💻",
  "Informática/Acessório": "💻",
  "Comida Oriental": "🍜",
  "Loja": "🛍️",
  "Lojas": "🛍️",
  "BBQ Steakhouse": "🥩",
  "Mercado": "🛒",
  "Esfiharia": "🥙",
  "Pastelaria": "🥟",
  "Hot Dog": "🌭",
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/lojas.json');
        const data = await response.json();
        
        // Extrai modelos de negócio únicos
        const uniqueModelos = [...new Set(data.result.map((loja: Loja) => loja.modelo_negocio))];
        
        const fetchedCategories = uniqueModelos.map((modelo) => ({
          id: modelo as string,
          name: modelo as string,
          emoji: emojiMap[modelo as string] || "🍴", // Usa um emoji padrão caso não encontre
        }));

        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Força a verificação das setas após as categorias serem carregadas
  useEffect(() => {
    if (categories.length > 0 && scrollRef.current) {
      // Pequeno delay para garantir que o DOM foi atualizado
      setTimeout(() => {
        const event = new Event('scroll');
        scrollRef.current?.dispatchEvent(event);
      }, 200);
    }
  }, [categories]);

  return (
    <div className="px-4 py-4 relative">
      <h2 className="text-lg font-bold mb-3 text-foreground">Categorias</h2>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer animate-fade-in hover-scale"
          >
            <div className="w-16 h-16 rounded-2xl bg-card border border-border shadow-soft flex items-center justify-center text-3xl transition-smooth hover:shadow-md">
              {category.emoji}
            </div>
            <span className="text-xs text-center text-foreground/80 font-medium max-w-[70px] truncate">
              {category.name}
            </span>
          </div>
        ))}
      </div>
      <ScrollArrows containerRef={scrollRef} />
    </div>
  );
};

export default CategoriesSection;