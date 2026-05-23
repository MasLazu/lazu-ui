import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "./input";
import { Label } from "./label";

interface FormRegisterReturnLike {
  name: string;
  onBlur: (...args: unknown[]) => void;
  onChange: (...args: unknown[]) => void;
  ref: (instance: HTMLInputElement | null) => void;
}

interface PasswordInputProps {
  register: FormRegisterReturnLike;
  error?: string;
  label?: string;
}

export function PasswordInput({ register, error, label }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label ? <Label>{label}</Label> : null}
      <div className="relative">
        <Input {...register} type={showPassword ? "text" : "password"} className="pr-10" />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
