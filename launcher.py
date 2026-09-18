import os
from flask import Response
from app import app, BASE_DIR


def enhanced_index():
    html = (BASE_DIR / 'index.html').read_text(encoding='utf-8')

    style_marker = '<link rel="stylesheet" href="cobalt-theme.css" />'
    style_enhancement = style_marker + '\n  <link rel="stylesheet" href="sat-exam-tools.css" />'
    if 'sat-exam-tools.css' not in html:
        html = html.replace(style_marker, style_enhancement)

    script_marker = '<script src="script.js"></script>'
    script_enhancement = (
        script_marker
        + '\n<script src="ui-enhancements.js"></script>'
        + '\n<script src="sat-mock-data.js"></script>'
        + '\n<script src="sat-exam-tools.js"></script>'
    )
    if 'sat-exam-tools.js' not in html:
        html = html.replace(script_marker, script_enhancement)

    return Response(html, mimetype='text/html')


app.view_functions['index'] = enhanced_index


if __name__ == '__main__':
    app.run(
        host='127.0.0.1',
        port=int(os.getenv('PORT', '5000')),
        debug=os.getenv('FLASK_DEBUG', '1') == '1',
    )
