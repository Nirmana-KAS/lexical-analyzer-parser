# Grammar Definition - Extended
# E -> TE'
# E' -> +TE' | -TE' | ε
# T -> FT'
# T' -> *FT' | /FT' | %FT' | ε
# F -> P^F | P
# P -> (E) | func(E) | id | number
# func -> sin | cos | tan | log | ln | sqrt | abs | exp
# id -> a-z | A-Z | identifiers
# number -> 0-9 | decimals

GRAMMAR = {
    'E': ['TE\''],
    'E\'': ['+TE\'', '-TE\'', 'ε'],
    'T': ['FT\''],
    'T\'': ['*FT\'', '/FT\'', '%FT\'', 'ε'],
    'F': ['P^F', 'P'],
    'P': ['(E)', 'func(E)', 'id', 'number'],
    'func': ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'abs', 'exp'],
    'id': ['a-z', 'A-Z', 'identifiers'],
    'number': ['0-9', 'decimals']
}

# Token types with descriptions
TOKEN_TYPES = {
    'ID': 'Identifier/Number',
    'NUMBER': 'Number',
    'PLUS': '+ - Addition',
    'MINUS': '- - Subtraction',
    'MULTIPLY': '* - Multiplication',
    'DIVIDE': '/ - Division',
    'MODULO': '% - Modulo',
    'POWER': '^ - Power/Exponentiation',
    'LPAREN': '( - Left Parenthesis',
    'RPAREN': ') - Right Parenthesis',
    'EQUALS': '= - Equals',
    'SEMICOLON': '; - Semicolon',
    'COMMA': ', - Comma',
    'SIN': 'sin - Sine function',
    'COS': 'cos - Cosine function',
    'TAN': 'tan - Tangent function',
    'LOG': 'log - Logarithm base 10',
    'LN': 'ln - Natural logarithm',
    'SQRT': 'sqrt - Square root',
    'ABS': 'abs - Absolute value',
    'EXP': 'exp - Exponential e^x'
}
