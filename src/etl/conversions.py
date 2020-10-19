import csv
import json
import pandas as pd
import utils
import random
import os
import time

def convert():
    with open('../finalData/mainData.csv', 'r', encoding="utf-8") as f:
        reader = csv.reader(f, delimiter=',')
        data_list = list()
        row_c = 0
        try:
            for row in reader:
                data_list.append(row)
                row_c = row_c + 1
        except Exception as e:
            return(f"Problem on row {row_c}" + "\n" + str(e))
    data = [dict(zip(data_list[0],row)) for row in data_list]
    data.pop(0)
    s = json.dumps(data)
    f2 = open("../../public/mrt_new.json", 'w', encoding="utf-8")
    f2.write(s)
    f2.close()
    return "Success"
