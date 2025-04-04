"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, KeyRoundIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ApiKeyInput(props: React.ComponentProps<"input">) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const { className, ...restInputProps } = props;

  return (
    <div className="relative">
      <Input
        className={cn("ps-9 pe-9", className)}
        placeholder="API Key"
        type={isVisible ? "text" : "password"}
        {...restInputProps}
      />

      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <KeyRoundIcon size={16} />
      </div>

      <button
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide API key" : "Show API key"}
        aria-pressed={isVisible}
        aria-controls="apiKey"
      >
        {isVisible ? (
          <EyeOffIcon size={16} aria-hidden="true" />
        ) : (
          <EyeIcon size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
