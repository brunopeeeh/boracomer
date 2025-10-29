import { Ticket, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRef } from "react";
import { ScrollArrows } from "@/components/ui/scroll-arrows";

const coupons = [
  {
    id: 1,
    code: "PRIMEIRACOMPRA",
    discount: "R$ 15 OFF",
    description: "Na sua primeira compra acima de R$ 30",
    expires: "Expira em 2 dias",
    color: "from-primary to-accent"
  },
  {
    id: 2,
    code: "FRETEGRATIS",
    discount: "Frete Grátis",
    description: "Em pedidos acima de R$ 25",
    expires: "Expira em 5 dias",
    color: "from-accent to-primary"
  },
];

const CouponsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div className="px-4 py-4 relative">
      <h2 className="text-xl font-bold mb-4 text-foreground">Cupons Disponíveis</h2>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {coupons.map((coupon, index) => (
          <Card
            key={coupon.id}
            className="min-w-[280px] overflow-hidden cursor-pointer animate-scale-in relative"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`h-2 bg-gradient-to-r ${coupon.color}`} />
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${coupon.color} flex items-center justify-center flex-shrink-0`}>
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-foreground">{coupon.discount}</h3>
                  <p className="text-xs text-muted-foreground">{coupon.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-dashed border-border rounded-lg">
                  <span className="text-xs font-mono font-bold text-primary">{coupon.code}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{coupon.expires}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <ScrollArrows containerRef={scrollRef} />
    </div>
  );
};

export default CouponsSection;
