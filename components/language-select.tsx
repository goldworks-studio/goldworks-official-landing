"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Globe2 } from "lucide-react";

type Option = { value: string; label: string; language: string; href: string };
export function LanguageSelect({
  locale,
  label,
  hint,
  options,
}: {
  locale: string;
  label: string;
  hint: string;
  options: Option[];
}) {
  const router = useRouter();
  const id = useId();
  return (
    <div className="language-select">
      <label htmlFor={id}>
        <Globe2 size={16} aria-hidden="true" />
        {label}
      </label>
      <div className="language-select-control">
        <select
          id={id}
          value={locale}
          aria-describedby={`${id}-hint`}
          onChange={(event) => {
            const selected = options.find(
              (option) => option.value === event.target.value,
            );
            if (selected && selected.value !== locale)
              router.push(selected.href);
          }}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              lang={option.language}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={15} aria-hidden="true" />
      </div>
      <span id={`${id}-hint`} className="sr-only">
        {hint}
      </span>
    </div>
  );
}
