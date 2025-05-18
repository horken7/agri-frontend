
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Bull } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search } from "lucide-react";

type SortKey = keyof Pick<Bull, "name" | "id"> | "fatPercentage" | "proteinPercentage" | "cellCount";

interface BullsTableProps {
  bulls: Bull[];
}

export function BullsTable({ bulls: initialBulls }: BullsTableProps) {
  const router = useRouter();
  const [bulls, setBulls] = React.useState<Bull[]>(initialBulls);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; direction: "ascending" | "descending" } | null>(null);

  React.useEffect(() => {
    setBulls(initialBulls);
  }, [initialBulls]);

  const sortedBulls = React.useMemo(() => {
    let sortableBulls = [...bulls];
    if (sortConfig !== null) {
      sortableBulls.sort((a, b) => {
        let valA, valB;
        if (sortConfig.key === "fatPercentage" || sortConfig.key === "proteinPercentage" || sortConfig.key === "cellCount") {
          valA = a.geneticMerit[sortConfig.key];
          valB = b.geneticMerit[sortConfig.key];
        } else {
          valA = a[sortConfig.key as keyof Pick<Bull, "name" | "id">];
          valB = b[sortConfig.key as keyof Pick<Bull, "name" | "id">];
        }
        
        if (typeof valA === 'string' && typeof valB === 'string') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }

        if (valA < valB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBulls;
  }, [bulls, sortConfig]);

  const filteredBulls = React.useMemo(() => {
    return sortedBulls.filter((bull) =>
      bull.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bull.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedBulls, searchTerm]);

  const requestSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (bullId: string) => {
    router.push(`/bulls/${bullId}`);
  };

  const SortableHeader = ({ sortKey, label }: { sortKey: SortKey; label: string }) => (
    <TableHead>
      <Button variant="ghost" onClick={() => requestSort(sortKey)} className="px-2 py-1">
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Filter by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 w-full md:w-1/3 shadow-sm"
        />
      </div>
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader sortKey="name" label="Name" />
              <SortableHeader sortKey="id" label="ID" />
              <SortableHeader sortKey="fatPercentage" label="Fat %" />
              <SortableHeader sortKey="proteinPercentage" label="Protein %" />
              <SortableHeader sortKey="cellCount" label="Cell Count" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBulls.length > 0 ? (
              filteredBulls.map((bull) => (
                <TableRow
                  key={bull.id}
                  onClick={() => handleRowClick(bull.id)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{bull.name}</TableCell>
                  <TableCell>{bull.id}</TableCell>
                  <TableCell>{bull.geneticMerit.fatPercentage.toFixed(1)}</TableCell>
                  <TableCell>{bull.geneticMerit.proteinPercentage.toFixed(1)}</TableCell>
                  <TableCell>{bull.geneticMerit.cellCount.toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No bulls found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
