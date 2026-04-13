import urllib.request
from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        if tag == "img":
            print("Encountered an img tag:", dict(attrs).get('src'))

parser = MyHTMLParser()
html = urllib.request.urlopen("https://sites.google.com/view/daase/people/faculty").read().decode('utf-8')
parser.feed(html)
