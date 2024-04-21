from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time


def generateList():
    options = Options()
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    lst = []
    driver.get("https://www.ishopping.pk/electronics/mobile-phones-tablet-pc/mobile-phones-prices-in-pakistan.html")
    #waiting for the page to load
    driver.maximize_window()
    driver.implicitly_wait(15)


    a = driver.find_elements('css selector', 'a[class="image-holder"]')
    lst.extend([a.get_attribute('href') for a in a])
    for i in range(8):
        next_page = driver.find_element('css selector', 'a[class="action  next"]')
        driver.execute_script("arguments[0].scrollIntoView();", next_page)
        try:
            next_page.click()
        except Exception as e:
            driver.execute_script("arguments[0].click();", next_page)
        time.sleep(3)
        #explicit wait for a[class="image-holder"] to load
        a = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a.image-holder'))
)
        lst.extend([a.get_attribute('href') for a in a])
    driver.close()
    return lst