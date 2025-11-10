import { ArrowLeft, Copy, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

type Coupon = {
  id: number;
  code: string;
  discount: string;
  description: string;
  expires: string;
  color: string; // tailwind gradient classes
  status: "disponivel" | "utilizado";
  usedOn?: string;
  usedAt?: string;
};

// Simulação: cupons já adquiridos pelo cliente (default)
const defaultCoupons: Coupon[] = [
  {
    id: 101,
    code: "BORACOMER10",
    discount: "10% OFF",
    description: "Válido em restaurantes participantes",
    expires: "Expira em 7 dias",
    color: "from-primary to-accent",
    status: "disponivel",
  },
  {
    id: 102,
    code: "FRETEGRATIS",
    discount: "Frete Grátis",
    description: "Em pedidos acima de R$ 25",
    expires: "Expira em 3 dias",
    color: "from-accent to-primary",
    status: "disponivel",
  },
  {
    id: 103,
    code: "PRIMEIRACOMPRA",
    discount: "R$ 15 OFF",
    description: "Na primeira compra acima de R$ 30",
    expires: "Expira em 10 dias",
    color: "from-primary to-accent",
    status: "disponivel",
  },
];

// Cupons fictícios já utilizados
const demoUsedCoupons: Coupon[] = [
  {
    id: 201,
    code: "PIZZALOVER20",
    discount: "20% OFF",
    description: "Somente pizzas nos parceiros",
    expires: "",
    color: "from-primary to-accent",
    status: "utilizado",
    usedOn: "10/10/2025 14:30",
    usedAt: "Pizzaria Napoli",
  },
  {
    id: 202,
    code: "CAFELATTE5",
    discount: "R$ 5 OFF",
    description: "Bebidas na cafeteria",
    expires: "",
    color: "from-primary to-accent",
    status: "utilizado",
    usedOn: "09/10/2025 09:15",
    usedAt: "Café Central",
  },
];

const MyCoupons = () => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [filter, setFilter] = useState<"disponivel" | "utilizado">("disponivel");

  // Carregar/Persistir no localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("myCoupons");
      if (raw) {
        const parsed: Coupon[] = JSON.parse(raw);
        const hasUsed = parsed.some((c) => c.status === "utilizado");
        setCoupons(hasUsed ? parsed : [...parsed, ...demoUsedCoupons]);
      } else {
        setCoupons([...defaultCoupons, ...demoUsedCoupons]);
      }
    } catch {
      setCoupons([...defaultCoupons, ...demoUsedCoupons]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("myCoupons", JSON.stringify(coupons));
    } catch {}
  }, [coupons]);

  const handleCopy = async (code: string, id: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      toast.success("Código copiado", { description: code });
      setTimeout(() => setCopiedId(null), 1500);
    } catch {}
  };

  const markAsUsed = (id: number) => {
    const now = new Date();
    const usedOn = now.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "utilizado", usedOn, usedAt: c.usedAt || "Estabelecimento parceiro" } : c)),
    );
  };

  const filteredCoupons = coupons.filter((c) => c.status === filter);
  const availableCount = coupons.filter((c) => c.status === "disponivel").length;
  const usedCount = coupons.filter((c) => c.status === "utilizado").length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Meus Cupons</h1>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Cupons que você adquiriu e pode usar em outros estabelecimentos.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Button
            variant={filter === "disponivel" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setFilter("disponivel")}
          >
            Disponíveis ({availableCount})
          </Button>
          <Button
            variant={filter === "utilizado" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setFilter("utilizado")}
          >
            Utilizados ({usedCount})
          </Button>
        </div>
      </header>

      <main className="px-4 py-4 space-y-3">
        {filteredCoupons.length === 0 && (
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              {filter === "disponivel"
                ? "Você não possui cupons disponíveis no momento."
                : "Nenhum cupom utilizado ainda."}
            </p>
          </Card>
        )}
        {filteredCoupons.map((coupon, index) => (
          <Card
            key={coupon.id}
            className={`overflow-hidden animate-fade-in ${coupon.status === "utilizado" ? "bg-muted/30" : ""}`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className={`h-2 bg-gradient-to-r ${coupon.status === "utilizado" ? "from-gray-300 to-gray-400" : coupon.color}`} />
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${coupon.status === "utilizado" ? "from-gray-300 to-gray-400" : coupon.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-[10px] font-semibold text-white whitespace-nowrap leading-none">
                    {coupon.status === "utilizado" ? "Usado" : "Cupom"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-lg ${coupon.status === "utilizado" ? "text-muted-foreground" : "text-foreground"}`}>{coupon.discount}</h3>
                  <p className="text-xs text-muted-foreground">{coupon.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 px-3 py-1.5 bg-card border border-dashed border-border rounded-lg ${coupon.status === "utilizado" ? "opacity-70" : ""}`}>
                  <span className="text-xs font-mono font-bold text-primary">{coupon.code}</span>
                  {coupon.status === "disponivel" && (
                    <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => handleCopy(coupon.code, coupon.id)}>
                      {copiedId === coupon.id ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
                {coupon.status === "utilizado" ? (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CheckCircle className="w-3 h-3" />
                    <span>
                      Usado em {coupon.usedOn || "—"} • {coupon.usedAt || "Estabelecimento parceiro"}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{coupon.expires}</span>
                  </div>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  className="rounded-full"
                  disabled={coupon.status === "utilizado"}
                  onClick={() => markAsUsed(coupon.id)}
                >
                  {coupon.status === "utilizado" ? "Usado" : "Usar"}
                </Button>
                <Button variant="outline" className="rounded-full">Detalhes</Button>
              </div>
            </div>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default MyCoupons;