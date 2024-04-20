from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
import json
import requests
from DarazLink import generateList
urlLst = generateList()
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

        script_tags = soup.findAll('script')

        if len(script_tags) > 1:
            script_tag = script_tags[-11]
            if script_tag:
                script_content = script_tag.string
                
                if script_content:
                    price_index = script_content.find('salePrice')
                    if price_index != -1:
                        price_start = script_content.find('"text":"', price_index) + len('"text":"')
                        price_end = script_content.find('","value"', price_start)
                        product_price = script_content[price_start:price_end]
                        product_price = product_price.replace(',', '')
                        product_price = product_price.replace('Rs. ', '')
                        print(product_price)
                        name_index = script_content.find('pdt_name')
                        img_index = script_content.find('mainImage')
                        if name_index != -1:
                            name_start = script_content.find('":"', name_index) + len('":"')
                            name_end = script_content.find('","page"', name_start)
                            product_name = script_content[name_start:name_end]
                            if img_index != -1:
                                img_start = script_content.find('":"', img_index) + len('":"')
                                img_end = script_content.find('","showSFOTips"', img_start)
                                product_img = script_content[img_start:img_end]
                                print("Product Price:", product_price)
                                print("Product Name:", product_name)
                                dataSend(product_name, product_price, product_img, url, "Daraz")
                        else:
                            print("Product name not found in the script content.")
                    else:
                        print("Product price not found in the script content.")
                else:
                    print("No content found inside the script tag.")

                    
            else:
                print("Script tag not found.")
main()