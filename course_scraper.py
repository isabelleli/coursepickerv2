from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
import json
import os
import re

chrome_options = Options()
chrome_options.add_argument('--headless')
driver = webdriver.Chrome(chrome_options=chrome_options)
driver.get('https://courses.wellesley.edu/')
select = Select(driver.find_element_by_id('semester'))
select.select_by_visible_text('Spring 2018')
driver.find_element_by_class_name('formsection').click()

course_elements = driver.find_elements_by_class_name('coursecode')
name_elements = driver.find_elements_by_class_name('coursename_small')
course_info = list(map(lambda elem: elem.text, course_elements))
info = list(map(lambda elem: elem.text, name_elements)) #contains a list of strings that contains the class name and prof
class_names = list(map(lambda elem: elem.find_element_by_tag_name('p').text, name_elements)) #just gets the class name

with open('course-names-s18.json', 'w') as f:
    json.dump(class_names, f)

professors = []
for i in range(len(info)):
    professors.append(info[i].replace(class_names[i], ''))
with open('professors-s18.json', 'w') as f:
    json.dump(professors, f)

time_info = list(map(lambda elem: elem.split('; CURRENT')[0], course_info))
with open('course-info-s18.json', 'w') as f:
    json.dump(time_info, f)

def openFile(filename):
    data = []
    if os.path.isfile(filename):
        with open(filename) as f:
            data = json.load(f)
    return data

def getCourseInfoDict(info): #example input: 'SPAN 253 - 01 (14629'
    courseInfoDict = {}
    split_info = info.split(' (')
    courseInfoDict['Course Title'] = split_info[0]
    courseInfoDict['CRN'] = split_info[1]
    return courseInfoDict

#example input: 'MTH - 09:50 AM - 11:00 AM'
#potential input: '- '
def getCourseTimeDict(info): #another example input: 'M - 12:30 PM - 02:40 PM; TH - 01:30 PM - 02:40 PM'
    courseTimeDict = {}
    days = []
    times = []
    if len(info) > 2:
        for i in info.split(';'):
            split_time = i.split('-')
            date = split_time[0].strip()
            if len(date) > 1: #more than one letter (3 possible scenarios)
                if 'TH' in date: #class is on a thursday
                    days.append('TH')
                    date = date.replace('TH', '')
                    days += list(date)
                elif re.search(r'\w\d', date): #searches for pattern that has word char followed by digit char
                    days.append('W') #alternative wednesdays are always by themselves
                    courseTimeDict['Alternative Wednesday'] = 'Check course browser for exact dates!'
                else: #multiple days with the same time
                    days += list(date)
            else:
                days.append(date)

            for x in range(len(days)-len(times)): #the days and times lists should both be at the same length
                times.append(split_time[1].strip() + '-' + split_time[2].strip())
            
    courseTimeDict['Day(s)'] = days
    courseTimeDict['Time(s)'] = times 
    return courseTimeDict

def createDicts():
    courseList = []
    courses = openFile('course-names-s18.json')
    professors = openFile('professors-s18.json')
    info = openFile('course-info-s18.json')
    for i in range(len(courses)):
        courseDict = {}
        courseDict['Course Name'] = courses[i]
        courseDict['Professor(s)'] = professors[i]
        split_info = info[i].split(') ') #example format: ['SWA 101 - 01 (11408', 'MWTH - 09:50 AM - 11:00 AM']
        courseDict.update(getCourseInfoDict(split_info[0]))
        courseDict.update(getCourseTimeDict(split_info[1]))
        courseList.append(courseDict)
    with open('parsed-courses-s18.json', 'w') as f:
        json.dump(courseList, f)