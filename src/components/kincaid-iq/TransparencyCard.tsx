import { Card, CardContent } from "@/components/ui/card";

interface TransparencyCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export function TransparencyCard({ icon: Icon, title, description }: TransparencyCardProps) {
  return (
    <Card className="bg-slate-800/50 border-white/10 h-full">
      <CardContent className="p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 mb-4">
          <Icon className="h-6 w-6 text-cyan-400" />
        </div>
        <h3 className="text-base font-semibold mb-2 text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/70">{description}</p>
      </CardContent>
    </Card>
  );
}