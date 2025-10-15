'use client';

import { SymbolTableEntry } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hash, Type, Database, FileText } from 'lucide-react';

interface SymbolTableProps {
  entries: SymbolTableEntry[];
}

export default function SymbolTable({ entries }: SymbolTableProps) {
  if (!entries || entries.length === 0) {
    return (
      <Card className="p-8 text-center border-0 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
        <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">No entries in symbol table</p>
        <p className="text-gray-400 text-sm mt-2">Parse an expression to generate symbol table</p>
      </Card>
    );
  }

  const getTokenBadgeColor = (token: string) => {
    switch (token.toLowerCase()) {
      case 'id':
      case 'identifier':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      case 'number':
      case 'num':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700';
      case 'operator':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700';
      case 'function':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const getTokenIcon = (token: string) => {
    switch (token.toLowerCase()) {
      case 'id':
      case 'identifier':
        return <Type className="h-3 w-3" />;
      case 'number':
      case 'num':
        return <Hash className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <Card className="overflow-hidden border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
              <Database className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Symbol Table</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {entries.length} symbol{entries.length !== 1 ? 's' : ''} identified
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {entries.length}
            </div>
            <div className="text-xs text-gray-500">Symbols</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="w-[80px] font-semibold text-gray-700 dark:text-gray-300">
                  Index
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Lexeme
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Token
                </TableHead>
                <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">
                  Position
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow 
                  key={index} 
                  className="border-gray-100 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="font-mono text-sm font-medium">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm font-semibold">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md px-3 py-2 border border-gray-200 dark:border-gray-700">
                      <code className="text-purple-600 dark:text-purple-400">
                        {entry.lexeme}
                      </code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getTokenBadgeColor(entry.token)} flex items-center gap-1.5 w-fit font-medium`}
                    >
                      {getTokenIcon(entry.token)}
                      {entry.token}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                      {entry.position}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Symbol Statistics */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {entries.filter(e => e.token.toLowerCase().includes('id') || e.token.toLowerCase().includes('identifier')).length}
              </div>
              <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium">Identifiers</div>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {entries.filter(e => e.token.toLowerCase().includes('number') || e.token.toLowerCase().includes('num')).length}
              </div>
              <div className="text-xs text-orange-600/70 dark:text-orange-400/70 font-medium">Numbers</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {entries.filter(e => !e.token.toLowerCase().includes('id') && !e.token.toLowerCase().includes('identifier') && !e.token.toLowerCase().includes('number') && !e.token.toLowerCase().includes('num')).length}
              </div>
              <div className="text-xs text-purple-600/70 dark:text-purple-400/70 font-medium">Others</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}