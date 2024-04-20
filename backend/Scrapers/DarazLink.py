from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time


def generateList():
    options = Options()
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    lst = []
    driver.get("https://www.daraz.pk/smartphones/")
    time.sleep(5)


    a = driver.find_elements('css selector', 'a[id="id-a-link"]')
    lst.extend([a.get_attribute('href') for a in a])
    for i in range(8):
        next_page = driver.find_element('css selector', 'li[title="Next Page"]')
        next_page.click()
        time.sleep(5)
        if (i > 0):
            a = driver.find_elements('css selector', 'a[id="id-a-link"]')
            lst.extend([a.get_attribute('href') for a in a])
    driver.close()
    return lst