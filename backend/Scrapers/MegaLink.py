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
    driver.get("https://www.mega.pk/mobiles/")
    #waiting for the page to load
    driver.maximize_window()
    driver.implicitly_wait(15)


    d = driver.find_elements('css selector', 'div[id="lap_name_div"]')
    # gettting the href attribute of all the a tags in the div list
    # for x in d:
    #     lst.extend(x.a.get_attribute('href'))
    lst.extend([b.find_element('css selector', 'a').get_attribute('href') for b in d])
    for i in range(8):
        # finding the next page button <a href="https://www.mega.pk/mobiles/2/">»</a>
        next_div = driver.find_element('css selector', 'div[class="pagination"]')
        next_page_lst = next_div.find_elements('css selector', 'a')
        next_page = next_page_lst[-1]
        # next_page = driver.find_element_by_xpath("//a[text()='»']")
        driver.execute_script("arguments[0].scrollIntoView();", next_page)
        try:
            next_page.click()
        except Exception as e:
            driver.execute_script("arguments[0].click();", next_page)
        time.sleep(3)
        #explicit wait for div[id="lap_name_div"] to load
        d = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div#lap_name_div')))
        lst.extend([b.find_element('css selector', 'a').get_attribute('href') for b in d])
    driver.close()
    return lst