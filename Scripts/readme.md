# Documentation for the Newspage.js script
The script is loaded in the portal by a script tag referencing the GitHub production release version and is loaded through a CDN.

#### Example on how this is done:
In Humany admin, on the VIP portal, in the custom HTML and JavaScript footer:
<script src="https://cdn.jsdelivr.net/gh/fuzzypawzz/ACE@2.2/Scripts/Newspage.min.js"></script>
This is pointing to this script (the CDN will be minifying the code): https://github.com/fuzzypawzz/ACE/blob/master/Scripts/Newspage.js
See the latest release package, when writing this guide it was version 2.2.

#### The guides in Humany
The news will be written in different guides in Humany. Each guide (which is basically a partial HTML page) will have a unique id-number.

#### How to determine which guides to load and parse data from
The script has logic implemented to check the URL for which it is executed on.
The function for this logic is called “segmentProvider()”.
The segment provider function check the location.href and returns a segment number based on the url. Forexample, it would return “2”, if the URL contains “VIP”.
Using that segment, the script has a switch statement to determine which specific guides to fetch data from.

#### Table data parser
To see how to parsing of the news-data works, please the function “fetchNotificationTables()”.
Basically all the news data is collected in a table element inside the guide, and that data will be parsed by the script and written into the innerHTML of the components in the news-page modal.
Currently, if the guide id has to change for some reason, we would require a new release to production. This is because the guide id’s are hardcoded and not dynamically imported to the script.

#### Why are we not following best practices?
Our hacking of Humany has a lot of limitations since we don’t have access to the source code, this is why the code is not living up to all the best practices you may find or know of.
