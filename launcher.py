import os
from flask import Response
from app import app, BASE_DIR


def enhanced_index():
    html = (BASE_DIR / 'index.html').read_text(encoding='utf-8')

    style_marker = '<link rel="stylesheet" href="cobalt-theme.css" />'
    style_enhancement = (
        style_marker
        + '\n  <link rel="stylesheet" href="site-premium.css" />'
        + '\n  <link rel="stylesheet" href="command-center.css" />'
    )
    if 'site-premium.css' not in html:
        html = html.replace(style_marker, style_enhancement)

    script_marker = '<script src="script.js"></script>'
    # Keep the exact script tag from index.html. Flask's static route serves
    # script.js, while query-string variants can fall through to the SPA HTML
    # route and break JavaScript execution.
    bridged_script = '<script defer src="script.js"></script>'
    script_enhancement = (
        bridged_script
        + '\n<script defer src="ui-enhancements.js"></script>'
        + '\n<script defer src="flashcard-enhancements.js"></script>'
        + '\n<script defer src="performance-loader.js"></script>'
        + '\n<script defer src="command-center.js"></script>'
        + '\n<script defer src="smart-study-planner.js"></script>'
        + '\n<script defer src="weekly-learning-report.js"></script>'
        + '\n<script defer src="sat-study-planner.js"></script>'
        + '\n<script defer src="revision-sheets.js"></script>'
        + '\n<script defer src="learning-planner.js"></script>'
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
