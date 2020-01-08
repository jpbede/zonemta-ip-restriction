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
      "interfaces": ["feeder"],
      "allowedips": ["127.0.0.1"]
    }
  }
...
```

## License

European Union Public License 1.1 ([details](http://ec.europa.eu/idabc/eupl.html))