'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { parseExpression } from '@/lib/api';
import { ParseResult } from '@/types';
import { exportParseTreeToPDF, exportSymbolTableToPDF } from '@/lib/pdfExport';

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
import { Loader2, Download, AlertCircle, Code2, Play } from 'lucide-react';

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
  };

  const handleDownloadSymbolTable = () => {
    exportSymbolTableToPDF('symbol-table-container', expression, 'symbol-table.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-7xl">
        {/* Header with Animation */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-8 h-8 md:w-10 md:h-10 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-3xl md:text-5xl font-bold gradient-text">
              Lexical Analyzer & Parser
            </h1>
          </div>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Modern web-based compiler tool for parsing arithmetic expressions with real-time visualization
          </p>
        </motion.header>

        {/* Main Grid Layout - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left Sidebar - Grammar & Test Cases */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 space-y-4"
          >
            <div className="glass-card rounded-xl p-4 md:p-6">
              <GrammarDisplay />
            </div>
            <div className="glass-card rounded-xl p-4 md:p-6">
              <TestCases onSelect={handleTestSelect} />
            </div>
          </motion.aside>

          {/* Main Content Area */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-9 space-y-4 md:space-y-6"
          >
            {/* Code Editor Section */}
            <div className="glass-card rounded-xl p-4 md:p-6">
              <CodeEditor value={expression} onChange={setExpression} height="180px" />
              
              <motion.div
                className="mt-4 flex flex-col sm:flex-row gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleParse}
                  disabled={loading}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Parsing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      Parse Expression
                    </>
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="glass-card border-red-300 dark:border-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="ml-2 text-sm md:text-base">{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Derivation Steps */}
            {result?.derivation && result.derivation.length > 0 && (
                  <DerivationSteps steps={result.derivation} />
                )}

            {/* Results Tabs */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-xl p-4 md:p-6"
              >
                <Tabs defaultValue="tokens" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 gap-2 mb-6 bg-indigo-100/50 dark:bg-gray-800/50 p-1 rounded-lg">
                    <TabsTrigger value="tokens" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                      Tokens
                    </TabsTrigger>
                    <TabsTrigger value="symbol-table" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                      Symbol Table
                    </TabsTrigger>
                    <TabsTrigger value="parse-tree" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                      Parse Tree
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="tokens" className="mt-0">
                    <TokenDisplay tokens={result.tokens} />
                  </TabsContent>

                  <TabsContent value="symbol-table" className="mt-0">
                    <div id="symbol-table-container">
                      <SymbolTable entries={result.symbol_table} />
                    </div>
                    <Button
                      onClick={handleDownloadSymbolTable}
                      variant="outline"
                      className="mt-4 w-full sm:w-auto"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download as PDF
                    </Button>
                  </TabsContent>

                  <TabsContent value="parse-tree" className="mt-0">
                    <div id="parse-tree-container" className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <ParseTreeVisualization tree={result.parse_tree} />
                    </div>
                    <Button
                      onClick={handleDownloadParseTree}
                      variant="outline"
                      className="mt-4 w-full sm:w-auto"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download as PDF
                    </Button>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
