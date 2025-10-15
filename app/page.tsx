'use client';

import { useState } from 'react';
import { parseExpression } from '@/lib/api';
import { ParseResult } from '@/types';
import { exportParseTreeToPDF, exportSymbolTableToPDF } from '@/lib/pdfExport';
import SplineBot from '@/components/SplineBot';


import CodeEditor from '@/components/CodeEditor';
import TokenDisplay from '@/components/TokenDisplay';
import SymbolTable from '@/components/SymbolTable';
import ParseTreeVisualization from '@/components/ParseTreeVisualization';
import TestCases from '@/components/TestCases';
import GrammarDisplay from '@/components/GrammarDisplay';
import DerivationSteps from '@/components/DerivationSteps';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Download, AlertCircle } from 'lucide-react';

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

  const handleDownloadParseTree = () => {
    exportParseTreeToPDF('parse-tree-container', expression, 'parse-tree.pdf');
    //                   ↑ ID                    ↑ NO QUOTES  ↑ filename
  };

  const handleDownloadSymbolTable = () => {
    exportSymbolTableToPDF('symbol-table-container', expression, 'symbol-table.pdf');
    //                      ↑ ID                     ↑ NO QUOTES  ↑ filename
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 3D Spline Bot */}
          <div className="mb-8">
            <SplineBot />
          </div>
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            Lexical Analyzer & Parser
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Interactive Expression Parser with Visualization
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input & Grammar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Input Expression</h2>
              <CodeEditor value={expression} onChange={setExpression} />
              <Button
                onClick={handleParse}
                disabled={loading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
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

              {/* Status Message */}
              {result && (
                <Alert
                  className={`mt-4 ${
                    result.success
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  <AlertDescription>{result.message}</AlertDescription>
                </Alert>
              )}

              {/* Error Display */}
              {error && (
                <Alert className="mt-4 bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Detailed Errors */}
              {result && result.errors && result.errors.length > 0 && (
                <div className="mt-4 space-y-2">
                  {result.errors.map((err, index) => (
                    <Alert key={index} className="bg-red-50 border-red-200">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <span className="font-semibold">{err.type}:</span> {err.message}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </div>

            <GrammarDisplay />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Derivation Steps */}
            {result && result.derivation && result.derivation.length > 0 && (
              <DerivationSteps steps={result.derivation} />
            )}

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <Tabs defaultValue="tokens" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tokens">Tokens</TabsTrigger>
                  <TabsTrigger value="symbol">Symbol Table</TabsTrigger>
                  <TabsTrigger value="tree">Parse Tree</TabsTrigger>
                </TabsList>

                <TabsContent value="tokens" className="mt-4">
                  {result ? (
                    <TokenDisplay tokens={result.tokens} />
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      No tokens to display
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="symbol" className="mt-4">
                  {result ? (
                    <div>
                      <div className="flex justify-end mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadSymbolTable}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                      <div id="symbol-table-container">
                        <SymbolTable entries={result.symbol_table} />
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      No symbol table to display
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="tree" className="mt-4">
                  {result && result.parse_tree ? (
                    <div>
                      <div className="flex justify-end mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadParseTree}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                      <div id="parse-tree-container">
                        <ParseTreeVisualization tree={result.parse_tree} />
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      No parse tree to display
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <TestCases onSelect={handleTestSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
