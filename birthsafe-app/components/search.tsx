"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function Search() {
  const [query, setQuery] = useState("")

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full pl-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

