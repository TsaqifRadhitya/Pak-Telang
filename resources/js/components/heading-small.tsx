import { cn } from "@/lib/utils";

export default function HeadingSmall({ title, description,className }: { title: string; description?: string,className? : string }) {
    return (
        <header>
            <h3 className={cn("mb-0.5 text-base font-medium",className)}>{title}</h3>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </header>
    );
}
