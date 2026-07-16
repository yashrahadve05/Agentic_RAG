import { cn } from "@/lib/utils";

type ContainerSize = "default" | "narrow" | "wide";

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
}

const sizeStyles: Record<ContainerSize, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({
  children,
  size = "default",
  className,
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 lg:px-8", sizeStyles[size], className)}>
      {children}
    </div>
  );
}
