'use client';

import { SymbolTableEntry } from '@/types';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SymbolTableProps {
  symbolTable: SymbolTableEntry[];
}

export default function SymbolTable({ symbolTable }: SymbolTableProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">Symbol Table</h3>
      {symbolTable.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No symbols to display</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Index</TableHead>
                <TableHead>Lexeme</TableHead>
                <TableHead>Token</TableHead>
                <TableHead className="w-[100px]">Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {symbolTable.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-mono">{entry.lexeme}</TableCell>
                  <TableCell>{entry.token}</TableCell>
                  <TableCell>{entry.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
