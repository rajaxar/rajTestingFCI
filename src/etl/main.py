import csv
import json
import pandas as pd
import utils
import random
import os
import time
import conversions

# Grab/Make some dataframes
# seenFiles is files we've already seen
seenFiles = pd.read_csv('../openedSheets.csv', index_col = False)
# will be used to keep track of new/old uploads
files = pd.DataFrame({'name':[], 'dateAdded':[]})
# hosts our "final" dataset
mainData = pd.read_csv('../finalData/mainData.csv', index_col = False)

# This block goes through spreadsheets and logs them
filePath = '../uploadedSpreadsheets/'
checkFiles = os.listdir(filePath)
for csv in checkFiles:
    currFile = filePath+csv
    f = os.path.getmtime(currFile)
    f = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(f))
    files = files.append(pd.DataFrame({'name': [csv], 'dateAdded': [f]}), ignore_index = True)

# For each file, let's examine more in depth.
for fileIndex, fileRow in files.iterrows():
    currFileName = fileRow['name']
    currDateAdded = fileRow['dateAdded']
    # If our file is "not seen", then let's see it! Check it's data with mainData
    # Also if our file has been seen, but it's been updated since.
    if (currFileName not in seenFiles['name'].values) or (currDateAdded not in seenFiles.loc[seenFiles['name'] == currFileName]['dateAdded'].values):
        currData = pd.read_csv(filePath + currFileName, index_col = False)
        for index,row in currData.iterrows():
            currName = row['name']
            currAddy = row['address']
            currKey = currName + ":" + currAddy
            # If our data is NOT in main data, let's add it in
            if currKey not in mainData['key'].values:
                # First, let's grab the lat and long
                a = utils.individualGeocode(currAddy)
                # Then let's put it in the mainData DF
                newRow = {'name' : currName,
                          'address' : currAddy,
                          'key': currKey,
                          'description' : row['description'],
                          'phone' : row['phone'],
                          'hours' : row['hours'],
                          'website' : row['website'],
                          'lat' : a[0],
                          'long' : a[1],
                          'lastUpdated' : currDateAdded}
                mainData = mainData.append(newRow, ignore_index = True )
            # Now, if our data IS in main data, let's see if the updated time is older > newer 
            else:
                mainTime = mainData.loc[mainData['key'] == currKey]['lastUpdated'].iloc[0]
                mainIndex = mainData.loc[mainData['key'] == currKey]['lastUpdated'].index[0]
                # Since mainTime is smaller, we have to update the values
                if mainTime < fileRow['dateAdded']:
                    mainData.loc[mainIndex, 'description'] = row['description']
                    mainData.loc[mainIndex, 'phone'] = row['phone']
                    mainData.loc[mainIndex, 'hours'] = row['hours']
                    mainData.loc[mainIndex, 'website'] = row['website']
                    mainData.loc[mainIndex, 'lastUpdated'] = currDateAdded
                # Do nothing, as we already have the same > better dataset
                else:
                    continue
        # Now that we have finished looping through everything, we should make sure the seen files is updated
        # If not in the seenFiles, add it
        if (currFileName not in seenFiles):
            newRow = {'name' : currFileName,
                      'dateAdded' : currDateAdded}
            seenFiles = seenFiles.append(newRow, ignore_index = True)
        # Just update it if it's already in
        else:
            seenFiles.loc[currFileName, 'dateAdded'] = currDateAdded
    else:
        # We have no need to look at this current file, as it hasn't been updated, so let's continue.
        continue

# Now let's save everything so we can access it
mainData.to_csv('../finalData/mainData.csv', index = False)
seenFiles.to_csv('../openedSheets.csv', index = False)

# Now let's call the conversions.
print(conversions.convert())