# 3Commas Marketplace Scraper

- Paste code in the browser console while logged in into 3Commas website
- Set the marketplace id on ```await init(id)```
- Copy and paste the results into a file .csv
- Import it into Google Sheet without formatting data
- Use this method to convert unix epoch timestamp to human readable dates ```=((((F2/1000)/60)/60)/24)+DATA(1970,1,1)```