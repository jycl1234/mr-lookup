# fgo-lookup

Simple web-based tool to look up Fate Grand/Order crowd-sourced dropsheet data.

Dropsheet is here: https://docs.google.com/spreadsheets/d/1_SlTjrVRTgHgfS7sRqx4CeJMqlz687HdSlYqiW-JvQA/edit#gid=843570146

## How to Use

This is a frontend for the Google Sheets API. Documentation can be found here: https://developers.google.com/sheets/api

To use this tool, first obtain an API key: https://console.developers.google.com/apis/credentials?pli=1

Create a file named apiKey.js, and add this line of code: `export const apiKey = "{your api key here}";`. Save the file.

As of 5/2/2020, the Sheets API has a limit of 500 requests per 100 seconds.

Once the `apiKey.js` file is created, build the project and deploy.

## Data Source

There are two files that provide the source of truth for the API: `sheets.js` and `mats.js`.

`sheets.js` provides the list of sheets with the ID and URL-encoded name of the sheet itself. Note that the API does not actually use the ID.

`mats.js` is a list of mats in Fate Grand Order, a starting cell (startRange), an ending cell (endRange), a rarity, and a type. The last two are used for filtering. You must ensure startRange and endRange correspond to the sheet, or this tool will not work.
