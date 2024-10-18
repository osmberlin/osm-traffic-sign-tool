# createJson.ts

Figure out what to do with data/json/README.md or remove this setup…

# url safety

Make use we handle urls with duplikate keys
http://localhost:3001/DE?signs=DE:241-30;241-30;241-30;241-30;240;240;239

And make sure we cleanup URLs like
http://localhost:3001/DE?signs=DE:241-30;

We probably want to show some warnings in those cases
