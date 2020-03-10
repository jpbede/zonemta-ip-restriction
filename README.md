# zonemta-ip-restriction

IP Restriction plugin for [ZoneMTA](https://github.com/zone-eu/zone-mta). Install this to see restrict connections for the receiver interfaces.

## Setup

Add this as a dependency for your ZoneMTA app

```
npm install zonemta-ip-restriction --save
```

Add a configuration entry in the "plugins" section of your ZoneMTA app

```json
...
  "plugins": {
    "modules/zonemta-ip-restriction": {
      "enabled": "receiver",
      "interfaces": ["feeder"], // or * for all interfaces
      "allowedips": ["127.0.0.1"] // or use "https://<url>" instead of to query a url (see below)
    }
  }
...
```

### HTTP query

Instead of using a static ip list, you can use a URL which should be queried.
A POST-request is made to this url. 
The endpoint should return a "200 OK" if the connection should be accepted.
Every other response code is treated as reject.

The POST-request contains following data:

```
ip = remote-address (ip of the connecting client)
```

## License

European Union Public License 1.1 ([details](http://ec.europa.eu/idabc/eupl.html))