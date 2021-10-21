# Get data into CSV
from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
from requests.api import request

URL_HEAD = "https://physionet.org"
URL = "https://physionet.org/about/database/"

# Get all song params in 2D array
def get_datasets():
    datasets = []
    
    # Setup soup
    page = requests.get(URL)
    soup = bs(page.content, "html.parser")
    dataset_list = soup.find("div", class_="main-content").find_all("ul")[1]

    count = 0
    for li in dataset_list.find_all("li"):
        if count == 10:
            break
        else:
            count += 1

        name = li.contents[0].string
        desc = li.contents[1].string[1:].strip()
        link = URL_HEAD + li.find('a', href=True)['href']

        dataset_page = requests.get(link)
        dataset_soup = bs(dataset_page.content, "html.parser")
        download = URL_HEAD + dataset_soup.find("h2", id="files").next_element.next_element.next_element.find('a', href=True)['href']

        dataset_info = [name, desc, link, download]
        datasets.append(dataset_info)
    
    return datasets

# Write data to csv file
def write_to_csv():
    col_names = ['Name', 'Description', 'Link', 'Download']
    data_table = get_datasets()
    datasets = pd.DataFrame(data_table, columns=col_names)
    datasets.to_csv('dataset_list.csv', index=False)

# write_to_csv()
write_to_csv()

# ------------------------------------------------

# Convert to JSON file
import csv
import json
 
 
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
     
    # create a dictionary
    data = {}
     
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
         
        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
             
            # Assuming a column named 'No' to
            # be the primary key
            key = rows['Name']
            data[key] = rows
 
    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
         
# Driver Code
 
# Decide the two file paths according to your
# computer system
csvFilePath = r'dataset_list.csv'
jsonFilePath = r'dataset_list.json'
 
# Call the make_json function
make_json(csvFilePath, jsonFilePath)