import {inject} from '@loopback/core';
import {get, Request, ResponseObject, RestBindings} from '@loopback/rest';
const request = require('request');
/**
 * OpenAPI response for Wheather()
 */
const CITIES_REQUEST: Array<string> = ["Santiago", "Zurich", "Auckland", "Sydney", "Londres", "Georgia"];
const Wheather_RESPONSE: ResponseObject = {
  description: 'Wheather Response',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        title: 'WheatherResponse',
        properties: {
          temperature: {type: 'number'},
          nombre: {type: 'string'},
          nombreCiudad: {type: 'string'},
          latitude: {type: 'number'},
          longitude: {type: 'number'}

        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class WheatherController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  // Map to `GET /Wheather`
  @get('/Wheather', {
    responses: {
      '200': CITIES_REQUEST,
    },
  })







  Wheather(): Array<object> {

    var cities: Array<object> = [];






    CITIES_REQUEST.forEach(function (value) {
      let cityName = "";
      cityName = value;
      request('http://api.openweathermap.org/data/2.5/weather?q=' + value + '&appid=2298978e1d8d29716f7d795c83033d7b', function (error: any, response: any, body: string) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        var city = JSON.parse(body);
        cities.push(city);
        var obj: object = JSON.parse(body);

  


      });
      var cityObject = {
        nombreCiudad: value
      }
      cities.push(cityObject);
      console.log("load 2");
      return cities;

      // Print the HTML for the Google homepage.






    }

    );
    // Reply with a greeting, the current time, the url, and request headers
    return cities;
  }


  consultarCiudad(cityName: string): string {
    var responseBody: string;
    console.log(cityName);
    console.log("consulta ciudad", cityName);
    request('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=2298978e1d8d29716f7d795c83033d7b', function (error: any, response: any, body: string) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body);
      responseBody = body;
      return responseBody;

    });
    return "OK";


  }
}
