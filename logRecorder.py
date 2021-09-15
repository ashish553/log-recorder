from selenium import webdriver
from selenium.webdriver.chrome import options
from selenium.webdriver.chrome.options import Options
import time as t

# chromeOptions = Options()
# chromeOptions.add_argument('--log-level=3')
driver  = webdriver.Chrome('./chromedriver.exe')

f = open('pagesList.txt','w')

def urlCatch(stglink):
  pagesList = []
  driver.get(stglink)
  pagesListElements = driver.find_elements_by_tag_name('a')

  for element in pagesListElements:
    tempPage = element.get_attribute('href')
    if isinstance(tempPage,str) and tempPage.startswith(stglink):
      pagesList.append(tempPage)

  # for pagePath in pagesList:
  #   f.write(pagePath+'\n')
  # f.close()
  pagesList = list(dict.fromkeys(pagesList))
  return pagesList

def findError(stageLink):
  errorMessageList= []
  driver.get(stageLink)
  t.sleep(4)
  logEntries = driver.get_log("browser")
  for errObject in logEntries:
    if errObject['level']=='SEVERE':
      errorMessageList.append(errObject['message'])
  # driver.close()
  return errorMessageList

# Calling the functions
allPages = urlCatch('https://www.accenture.com')
# print(allPages)
# masterList = []
for pageLink in allPages:
  f.write(pageLink+'\n')
  errorList = findError(pageLink)
  # for message in errorList:
  #   f.write('\t'+message+'\n')
  print(errorList)

# print(findError('sitename'))