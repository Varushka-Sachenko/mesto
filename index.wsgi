import os
import sys
sys.path.append('/home/c/cshse/.local/lib/python3.6/site-packages')
sys.path.insert(0, os.path.dirname(__file__))
from werkzeug.debug import DebuggedApplication
from myapp import app as application
application.debug = True
application.wsgi_app = DebuggedApplication(application.wsgi_app, evalex=True)
