'use client';

import { Token } from '@/types';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface TokenDisplayProps {
  tokens: Token[];
}

export default function TokenDisplay({ tokens }: TokenDisplayProps) {
  const getTokenColor = (type: string) => {
    switch (type) {
      case 'ID': return 'bg-blue-500';
      case 'PLUS': return 'bg-green-500';
      case 'MULTIPLY': return 'bg-purple-500';
      case 'LPAREN': return 'bg-yellow-500';
      case 'RPAREN': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">Tokens</h3>
      {tokens.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tokens to display</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Position</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{token.position}</TableCell>
                  <TableCell>
                    <Badge className={getTokenColor(token.type)}>{token.type}</Badge>
                  </TableCell>
                  <TableCell className="font-mono">{token.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
