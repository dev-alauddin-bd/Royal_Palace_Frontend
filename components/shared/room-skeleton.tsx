import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoomSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="bg-royal-obsidian/5 border-royal-gold/10 rounded-none overflow-hidden h-[480px]">
          <div className="relative h-full p-10 flex flex-col justify-end space-y-4">
            <Skeleton className="absolute inset-0 bg-white/5" />
            <div className="relative z-10 space-y-4">
               <div className="flex gap-1.5">
                  {[...Array(5)].map((_, j) => (
                     <Skeleton key={j} className="w-3.5 h-3.5 bg-royal-gold/20" />
                  ))}
               </div>
               <Skeleton className="h-10 w-3/4 bg-white/10" />
               <Skeleton className="h-12 w-full bg-royal-gold/20" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
