'use client';

import { SymbolTableEntry } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SymbolTableProps {
  entries: SymbolTableEntry[];
}

export default function SymbolTable({ entries }: SymbolTableProps) {
  if (!entries || entries.length === 0) {
    return (
      <Card className="p-4">
        <p className="text-center text-gray-500">No entries in symbol table</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">Symbol Table</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-3 font-semibold">Index</th>
              <th className="text-left py-2 px-3 font-semibold">Lexeme</th>
              <th className="text-left py-2 px-3 font-semibold">Token</th>
              <th className="text-left py-2 px-3 font-semibold">Position</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{index + 1}</td>
                <td className="py-2 px-3 font-mono">{entry.lexeme}</td>
                <td className="py-2 px-3">
                  <Badge variant="outline">{entry.token}</Badge>
                </td>
                <td className="py-2 px-3">{entry.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
