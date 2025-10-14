from flask import Flask, request, jsonify
from flask_cors import CORS
from lexer import tokenize
from parser import parse_tokens
import traceback

app = Flask(__name__)

# Configure CORS for production
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://lexical-analyzer-parser-pied.vercel.app",
            "https://*.vercel.app"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/api/parse', methods=['POST', 'OPTIONS'])
def parse_expression():
    """Main API endpoint for parsing expressions"""
    
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'}), 200
    
    try:
        data = request.get_json()
        input_string = data.get('expression', '')
        
        if not input_string:
            return jsonify({
                'success': False,
                'error': 'Empty input string',
                'errors': [{'type': 'Empty Input', 'message': 'Please enter an expression'}]
            }), 400
        
        # Tokenize
        lexer_result = tokenize(input_string)
        tokens = lexer_result['tokens']
        symbol_table = lexer_result['symbol_table']
        lexer_errors = lexer_result.get('errors', [])
        
        # If no tokens, return error
        if not tokens:
            return jsonify({
                'success': False,
                'tokens': [],
                'symbol_table': [],
                'parse_tree': None,
                'derivation': [],
                'message': 'No valid tokens found',
                'errors': [{'type': 'Lexical Error', 'message': 'No valid tokens in input'}]
            })
        
        # Parse
        parse_result = parse_tokens(tokens)
        
        return jsonify({
            'success': parse_result['success'],
            'tokens': tokens,
            'symbol_table': symbol_table,
            'parse_tree': parse_result['tree'],
            'derivation': parse_result.get('derivation', []),
            'message': parse_result['message'],
            'errors': parse_result.get('errors', [])
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'errors': [{'type': 'Server Error', 'message': str(e)}],
            'trace': traceback.format_exc()
        }), 500

@app.route('/api/health', methods=['GET', 'OPTIONS'])
def health_check():
    """Health check endpoint"""
    
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'}), 200
    
    return jsonify({
        'status': 'ok',
        'message': 'Lexical Analyzer & Parser API is running'
    })

# For Vercel serverless - CRITICAL
def handler(request):
    with app.request_context(request.environ):
        return app.full_dispatch_request()

# Export for Vercel
app = app
