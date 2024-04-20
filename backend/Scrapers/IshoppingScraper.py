from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
# from TelemartLink import generateList
import json
import requests
urlLst = ['https://www.ishopping.pk/xiaomi-poco-m6-pro-price-in-pakistan.html?968=9432']
def dataSend(n,p,i,u,s):
    product_name = n
    product_price = p
    product_img = i
    product_url = u
    product_store = s

    url = 'http://localhost:4000/data'

    data = {
        "name": product_name,
        "price": product_price,
        "image": product_img,
        "url": product_url,
        "store": product_store
    }

    # print(json.dumps(data, indent=4))

    response = requests.post(url, json=data)

    if response.status_code == 200:
        print("Data sent successfully to the server")
    else:
        print("Failed to send data to the server")

def main():
    for url in urlLst:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        page = urlopen(req).read()
        urlopen(req).close
        soup = BeautifulSoup(page, 'html.parser')
        script_tag_lst = soup.find_all('script', type='application/ld+json')
        span_tag = soup.find('span', id='product-price-undefined')
        script_tag = script_tag_lst[2]
        if span_tag:
            product_price = span_tag
        if script_tag:
            script_content = script_tag.string
            
            if script_content:
                json_data = json.loads(script_content)
                
                product_name = json_data.get('name')
                product_price = json_data.get('offers', {}).get('price')
                product_image = json_data.get('image')
                
                if product_name:
                    if product_price:
                        # print("Product Price:", product_price)
                        # print("Product Name:", product_name)
                        dataSend(product_name,product_price, product_image, url, "Ishopping")
                else:
                    print("not found in JSON data.")
            else:
                print("No content found inside the script tag.")
        else:
            print("Script tag not found.")
main()