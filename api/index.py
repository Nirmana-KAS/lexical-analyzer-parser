from flask import Flask, request, jsonify
from flask_cors import CORS
from lexer import tokenize
from parser import parse_tokens
import traceback
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/parse', methods=['POST'])
def parse_expression():
    """Main API endpoint for parsing expressions"""
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

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'Lexical Analyzer & Parser API is running'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))

