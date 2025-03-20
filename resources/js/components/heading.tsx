import { cn } from "@/lib/utils";

export default function Heading({ title, description,className,disableMb }: { title: string; description?: string,className? : string,disableMb?: boolean }) {
    return (
        <div className={"space-y-0.5 " + disableMb ?  "" : "mb-8" }>
            <h2 className={cn("text-xl font-semibold tracking-tight",className)}>{title}</h2>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
    );
}
