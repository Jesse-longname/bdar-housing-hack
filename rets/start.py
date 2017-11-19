from rets import Session
from geopy.geocoders import Nominatim
from google.cloud import storage, firestore
import sys

LOGIN_URL = 'http://matrixrets.onregional.ca/rets/Login.ashx'
USERNAME = 'USERNAME'
PASSWORD = 'PASSWORD'

FILTER_LOOKUP = {
    'Residential': 'SF'
}

GEOLOCATOR = Nominatim()

def get_client():
    client = Session(LOGIN_URL, USERNAME, PASSWORD)
    client.login()
    return client

def destroy_client(client):
    client.logout()

def get_residential_listings(client, limit, offset=0, search_filter={}):
    search_filter.update({'PropertyType': FILTER_LOOKUP['Residential']})
    return client.search(resource='Property', resource_class='Listing', limit=limit, search_filter=search_filter, offset=offset)

def print_important_columns(data):
    print()
    print('======== IMPORTANT COLUMNS ========')
    columns_file = open('important_columns.txt', 'r')
    cols = columns_file.readlines()
    columns_file.close()
    for i in range(len(data)):
        print('======== LISTING ' + str(i+1) + ' ========')
        for col in cols:
            prop = col.strip()
            print(prop + ': ' + data[i][prop])
    print('======== END IMPORTANT COLUMNS ========')
    print()

def print_cities(data):
    print()
    print('======== CITIES ========')
    for info in data:
        print(info['CountyOrParish'] + ', ' + info['City'])
    print('======== END CITIES ========')
    print()

def print_loc_info(data):
    for info in data: 
        print()
        if 'ROAD' in info['StreetName']:
            info['StreetName'] = info['StreetName'].replace('ROAD', '')
        print(info['StreetNumber'] + ' ' + info['StreetName'] + ' ' + info['StreetSuffix'] + ' ' + info['City'] + ' ' + info['StateOrProvince'])
        location = GEOLOCATOR.geocode(info['StreetNumber'] + ' ' + info['StreetName'] + ' ' + info['StreetSuffix'] + ' ' + info['City'] + ' ' + info['StateOrProvince'])
        if location is None:
            continue
        print(location.address)
        print((location.latitude, location.longitude))
        print()

def gen_images(client, data):
    for info in data:
        object_dict_list = client.get_object(
            resource='Property',
            object_type='LargePhoto',
            content_ids=info['Matrix_Unique_ID']
        )
        
        for ob in object_dict_list:
            file_name = "images/{}_{}.png".format(info['Matrix_Unique_ID'], ob['object_id'])
            with open(file_name, 'wb') as f:
                f.write(ob['content'])

def firebase_it(client, data):
    # Initialize firebase stuff
    db = firestore.Client('bdar-d0f45')
    store = storage.Client('bdar-d0f45')
    bucket = store.get_bucket('bdar-d0f45.appspot.com')

    # The data we will upload
    # upload_data = [{} for _ in range(len(data))]
    for i in range(len(data)):
        print('START: ' + str(i))
        info = data[i]
        upload_data = {}

        # Info from data
        upload_data.update({'price': info['ListPrice']})
        upload_data.update({'baths': info['BathsTotal']})
        upload_data.update({'beds': info['BedsTotal']})
        upload_data.update({'remarks': info['RemarksForClients']})
        upload_data.update({'sqft': info['SqFtTotal']})
        upload_data.update({'year_built': info['YearBuilt']})

        # Location Info
        if 'ROAD' in info['StreetName']:
            info['StreetName'] = info['StreetName'].replace('ROAD', '')
        location = GEOLOCATOR.geocode(info['StreetNumber'] + ' ' + info['StreetName'] + ' ' + info['StreetSuffix'] + ' ' + info['City'] + ' ' + info['StateOrProvince'])
        if location is None:
            continue
        upload_data.update({'address': location.address})
        upload_data.update({'lat': location.latitude})
        upload_data.update({'long': location.longitude})

        # Take care of images
        object_dict_list = client.get_object(
            resource='Property',
            object_type='LargePhoto',
            content_ids=info['Matrix_Unique_ID']
        )

        for ob in object_dict_list:
            file_name = 'images-upload/{}_{}.png'.format(info['Matrix_Unique_ID'], ob['object_id'])
            with open(file_name, 'wb') as f:
                f.write(ob['content'])
            if int(ob['object_id']) == 0:
                new_blob = bucket.blob('house-photos/{}/{}.png'.format(info['Matrix_Unique_ID'], ob['object_id']))
                new_blob.upload_from_filename(filename='images-upload/{}_{}.png'.format(info['Matrix_Unique_ID'], ob['object_id']))
                upload_data.update({'imageUrl': new_blob.media_link})
            
        db.collection(u'houses').document().set(upload_data)
        print('END: ' + str(i))
        print()

if __name__ == '__main__':
    rets_client = get_client()

    custom_search_filter = {
        'City': 'Barrie',
        'Status': 'A'
    }

    residential_listings = get_residential_listings(rets_client, 20, search_filter=custom_search_filter)

    if 'print_cols' in sys.argv:
        print_important_columns(residential_listings)
    elif 'print_loc' in sys.argv:
        print_loc_info(residential_listings)
    elif 'firebase' in sys.argv:
        firebase_it(rets_client, residential_listings)

    destroy_client(rets_client)

