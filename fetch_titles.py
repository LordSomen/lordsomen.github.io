import urllib.request
import re

urls = [
    "https://www.udacity.com/certificate/e/c4a74ae2-60a5-11f0-b853-1f5e86ad5df7",
    "https://www.credly.com/badges/7ab127a2-d1eb-4be2-ba91-66939ab086e6/public_url",
    "https://www.coursera.org/account/accomplishments/specialization/JL925L64JLCU",
    "https://www.coursera.org/account/accomplishments/specialization/MHSU2NTTBL5Z",
    "https://www.udacity.com/certificate/ANJCSFGH",
    "https://www.coursera.org/account/accomplishments/specialization/W3KVT7EMWML8",
    "https://www.hackerrank.com/certificates/1e1d7b54bd08",
    "https://www.coursera.org/account/accomplishments/certificate/99N8UQAQ72TS",
    "https://www.coursera.org/account/accomplishments/verify/NRCVTEUFVDRM"
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8')
        match = re.search(r'<title.*?>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
        title = match.group(1).strip() if match else "No title found"
        print(f"URL: {url}\nTitle: {title}\n")
    except Exception as e:
        print(f"URL: {url}\nError: {e}\n")
