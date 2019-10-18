# Typescript Web Application and API

Development is happening on branch `develop/ds/staging`

## Development
- Add GUI link submission panel
- Use PUT or POST request type for inputing inital URL
- Add hit tracking
- Docker dev environment rejig - reload (nodemon etc setup)
- E2e testing
- Layer testing

## Testing
I've only implemented Unit Testing so far

```bash
$ yarn install
$ yarn test
```

## Build steps
Build steps will change - To run the application follow:

```bash
$ yarn install
$ ./node_modules/.bin/tsc

// method one
$ docker-compose up

// method two
$ node build/api/index.js
```

## Hiting the api

First you must make a `LinkEntry` to get the shortend URL

The following example uses the bash `curl` command to make a GET request:

```bash
$ curl "localhost:3000/api/shorten?awinaffid=202937&awinmid=2832&platform=dl&p=%5B%5Bhttps%3A%2F%2Fwww.footasylum.com%2Fkids%2Fkidsfootwear%2Fjunior-sizes-3-65%2Fadidas-originals-juniorgazelle-trainer-tactile-rose-cloud-white-4037450%2F%5D%5D";
{"url":"localhost:3000/DLIb"}
```

Once you have the short url, any GET requests will redirect to then endpoint (p) from the inital `LinkEntry`. 

> Note the cookie header is only present because i've logged into the GUI part of the app. 

```
$ curl -i localhost:3000/MBEj;
HTTP/1.1 302 Found
X-Powered-By: Express
Location: https://www.footasylum.com/kids/kidsfootwear/junior-sizes-3-65/adidas-originals-juniorgazelle-trainer-tactile-rose-cloud-white-4037450/
Vary: Accept
Content-Type: text/plain; charset=utf-8
Content-Length: 157
Set-Cookie: connect.sid=s%3AKRFEZ54NKk6Y3F3xIBTUqAJsnLsLcq0V.Q%2B4PSRt6NuoAjZsjX%2BEyHdgEnO6A0o2K4YMg32VMb8M; Path=/; Expires=Fri, 18 Oct 2019 04:05:15 GMT; HttpOnly
Date: Fri, 18 Oct 2019 04:04:15 GMT
Connection: keep-alive

Found. Redirecting to https://www.footasylum.com/kids/kidsfootwear/junior-sizes-3-65/adidas-originals-juniorgazelle-trainer-tactile-rose-cloud-white-4037450/