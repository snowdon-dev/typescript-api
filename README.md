# Typescript Web Application and API

Development is happening on branch `develop/ds/staging`

## Development
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

## API usage example

First to get a short url you must create a `LinkEntry`.

The following example uses the bash `curl` command to make a GET request:
```console
$ curl -i "localhost:3000/api/shorten?awinaffid=202937&awinmid=2832&platform=dl&p=%5B%5Bhttps%3A%2F%2Fwww.footasylum.com%2Fkids%2Fkidsfootwear%2Fjunior-sizes-3-65%2Fadidas-originals-juniorgazelle-trainer-tactile-rose-cloud-white-4037450%2F%5D%5D";
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 29
ETag: W/"1d-GiNyd1SePwOi2PSKrzgd0VmP+xQ"
Date: Sat, 19 Oct 2019 15:03:07 GMT
Connection: keep-alive

{"url":"localhost:3000/Xe8u"}
```

Once you have the short url, any GET requests will redirect to the endpoint (p) from the inital `LinkEntry`. 

```console
$ curl -i "localhost:3000/Xe8u";
HTTP/1.1 302 Found
X-Powered-By: Express
Location: https://www.footasylum.com/kids/kidsfootwear/junior-sizes-3-65/adidas-originals-juniorgazelle-trainer-tactile-rose-cloud-white-4037450/
Vary: Accept
Content-Type: text/plain; charset=utf-8
Content-Length: 157
Date: Sat, 19 Oct 2019 15:03:19 GMT
Connection: keep-alive

Found. Redirecting to https://www.footasylum.com/kids/kidsfootwear/junior-sizes-3-65/adidas-originals-juniorgazelle-trainer-tactile-rose-cloud-white-4037450/
```

### API

#### /api/shorten
type: POST | GET
params: 
```
awinaffid (required): integer
awinmid   (required): integer
platform  (optinal) : string
p         (required): string
```
returns (json):
````
{
    url: string
}

#### /[a-zA-Z0-9]{4}
type: GET
returns (header field(s))
```
Location: string
```
