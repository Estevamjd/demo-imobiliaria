"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { headerActionClass } from "./SiteHeader";

export function SaveButton() {
  const [salvo, setSalvo] = useState(false);
  return (
    <button type="button" aria-pressed={salvo} onClick={() => setSalvo((s) => !s)} className={headerActionClass}>
      {salvo && <Check aria-hidden strokeWidth={1.8} className="h-4 w-4 text-pine" />}
      {salvo ? "Salvo" : "Salvar"}
    </button>
  );
}
