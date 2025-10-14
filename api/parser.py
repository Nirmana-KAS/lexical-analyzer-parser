from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add parent directory to path to import modules
sys.path.append(os.path.dirname(__file__))

from lexer import tokenize
from parser import parse_tokens

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Get content length
        content_length = int(self.headers['Content-Length'])
        
        # Read and parse POST data
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        expression = data.get('expression', '')
        
        if not expression:
            response = {
                'success': False,
                'error': 'Empty input string',
                'errors': [{'type': 'Empty Input', 'message': 'Please enter an expression'}]
            }
            self.send_response(400)
        else:
            # Tokenize
            lexer_result = tokenize(expression)
            tokens = lexer_result['tokens']
            symbol_table = lexer_result['symbol_table']
            
            if not tokens:
                response = {
                    'success': False,
                    'tokens': [],
                    'symbol_table': [],
                    'parse_tree': None,
                    'derivation': [],
                    'message': 'No valid tokens found',
                    'errors': [{'type': 'Lexical Error', 'message': 'No valid tokens in input'}]
                }
            else:
                # Parse
                parse_result = parse_tokens(tokens)
                
                response = {
                    'success': parse_result['success'],
                    'tokens': tokens,
                    'symbol_table': symbol_table,
                    'parse_tree': parse_result['tree'],
                    'derivation': parse_result.get('derivation', []),
                    'message': parse_result['message'],
                    'errors': parse_result.get('errors', [])
                }
            
            self.send_response(200)
        
        # Send headers
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        # Send response
        self.wfile.write(json.dumps(response).encode('utf-8'))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
