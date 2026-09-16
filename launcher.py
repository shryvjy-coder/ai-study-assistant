import os
from flask import Response
from app import app, BASE_DIR


def enhanced_index():
    html = (BASE_DIR / 'index.html').read_text(encoding='utf-8')
    marker = '<script src="script.js"></script>'
    enhancement = marker + '\n<script src="ui-enhancements.js"></script>'
    if 'ui-enhancements.js' not in html:
        html = html.replace(marker, enhancement)
    return Response(html, mimetype='text/html')


app.view_functions['index'] = enhanced_index


if __name__ == '__main__':
    app.run(
        host='127.0.0.1',
        port=int(os.getenv('PORT', '5000')),
        debug=os.getenv('FLASK_DEBUG', '1') == '1',
    )
