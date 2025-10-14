'use client';

import { useState } from 'react';
import { parseExpression } from '@/lib/api';
import { ParseResult } from '@/types';
import { testCases } from '@/lib/testCases';
import { downloadJSON, downloadCSV } from '@/lib/utils';

import CodeEditor from '@/components/CodeEditor';
import TokenDisplay from '@/components/TokenDisplay';
import SymbolTable from '@/components/SymbolTable';
import ParseTreeVisualization from '@/components/ParseTreeVisualization';
import TestCases from '@/components/TestCases';
import GrammarDisplay from '@/components/GrammarDisplay';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Download } from 'lucide-react';

export default function Home() {
  const [expression, setExpression] = useState('3+4*5');
  const [result, setResult] = useState<ParseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParse = async () => {
    if (!expression.trim()) {
      setError('Please enter an expression');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await parseExpression(expression);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse expression');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTestSelect = (testExpression: string) => {
    setExpression(testExpression);
  };

  const handleDownloadTree = () => {
    if (result?.parse_tree) {
      downloadJSON(result.parse_tree, 'parse-tree.json');
    }
  };

  const handleDownloadSymbolTable = () => {
    if (result?.symbol_table) {
      downloadCSV(result.symbol_table, 'symbol-table.csv');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Lexical Analyzer & Parser
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive Expression Parser with Visualization
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CodeEditor value={expression} onChange={setExpression} />

            <div className="flex gap-3">
              <Button
                onClick={handleParse}
                disabled={loading}
                className="flex-1"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Parsing...
                  </>
                ) : (
                  'Parse Expression'
                )}
              </Button>
              {result && (
                <>
                  <Button
                    onClick={handleDownloadTree}
                    variant="outline"
                    size="lg"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Tree JSON
                  </Button>
                  <Button
                    onClick={handleDownloadSymbolTable}
                    variant="outline"
                    size="lg"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Symbol CSV
                  </Button>
                </>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <Alert variant={result.success ? 'default' : 'destructive'}>
                <AlertDescription>
                  {result.message}
                </AlertDescription>
              </Alert>
            )}

            {result && (
              <Tabs defaultValue="tokens" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tokens">Tokens</TabsTrigger>
                  <TabsTrigger value="symbols">Symbol Table</TabsTrigger>
                  <TabsTrigger value="tree">Parse Tree</TabsTrigger>
                </TabsList>
                <TabsContent value="tokens">
                  <TokenDisplay tokens={result.tokens} />
                </TabsContent>
                <TabsContent value="symbols">
                  <SymbolTable symbolTable={result.symbol_table} />
                </TabsContent>
                <TabsContent value="tree">
                  <ParseTreeVisualization tree={result.parse_tree} />
                </TabsContent>
              </Tabs>
            )}
          </div>

          <div className="space-y-6">
            <GrammarDisplay />
            <TestCases testCases={testCases} onSelectTest={handleTestSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
