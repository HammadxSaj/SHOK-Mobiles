from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def generateList():
    options = Options()
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    lst = []
    driver.get("https://www.telemart.pk/mobile-and-tablets/mobile-phone.html")
    driver.maximize_window()
    time.sleep(5)

    pl = driver.find_elements('css selector', "a[class='pagination cursor-pointer mx-1 font-bold hover:text-white rounded-full p-1 px-2']")
    pl.remove(pl[0])
    pl.remove(pl[-1])
    p = pl[-1]
    driver.execute_script("arguments[0].scrollIntoView();", p)
    try:
        p.click()
    except Exception as e:
        driver.execute_script("arguments[0].click();", p)
    time.sleep(5)
    t = driver.find_elements('css selector', 'div[class="col-span-3 bg-white relative cursor-pointer p-0.5"]')
    #getting the links of all the products from the a tags
    for i in t:
        lst.append(i.find_element('css selector', 'a').get_attribute('href'))
    for x in range(3):
        p = driver.find_element('css selector', "a[class='pagination cursor-pointer mx-1 font-bold hover:text-white rounded-full p-1 px-2']")
        driver.execute_script("arguments[0].scrollIntoView();", p)
        try:
            p.click()
        except Exception as e:
            driver.execute_script("arguments[0].click();", p)
        time.sleep(5)
        t = driver.find_elements('css selector', 'div[class="col-span-3 bg-white relative cursor-pointer p-0.5"]')
        for i in t:
            lst.append(i.find_element('css selector', 'a').get_attribute('href'))
    driver.quit()
    return lst
