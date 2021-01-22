import {Request, RestBindings, get, param, post, ResponseObject, requestBody} from '@loopback/rest';
import {inject} from '@loopback/core';

/**
 * OpenAPI response for ping()
 */
const redis = require("redis");
const client = redis.createClient();

const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}
  @post('/saveError', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  saveError(     
   ): void {
      console.log('connected11');
  
  let time:Date = new Date();
  console.log(time.toLocaleString());
      client.hset("  "+time.toLocaleString()+"  ", "apis.err", "fallo la peticion al servidor");
  
      };
   
   
       
 

       
    
  
  // Map to `GET /ping`
  @post('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  ping(     
  @requestBody() rqBody: any): object {
    console.log('connected11');


 
    console.log(rqBody.lat);
    console.log(rqBody.long);
    console.log(rqBody.city);

    let coord:object = {
      lat: rqBody.lat,
      long: rqBody.long,
      name: rqBody.city

    };
 
    client.on('connect', function() {
      console.log('connected');
     
    });
    client.hset("apis.err", "field1", "value1");
    client.set('lat'+rqBody.city, rqBody.lat.toString());
    client.set('long'+rqBody.city, rqBody.long.toString());

  
    //client.set(rqBody.city+"long",  rqBody.long);
   // client.set(rqBody.city,  rqBody.city.toString());


    
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url:  "  this.req.body.toString()",
      headers: Object.assign({}, this.req.headers),
    };
  }
}
