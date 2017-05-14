import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users'; // executes directly
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {



});

// WebApp.connectHandlers.use((req,resp, next)=>{
//   console.log('hello from custom middle ware');
//   console.log(req.url, req.method, req.headers, req.query);
//   // is used to teach the webserver to do something new
//   // http://www.httpstatuses.com
//   // resp.statusCode = 404;
//   // resp.setHeader('my-customHeader', 'Mikael');
//   // // resp.write('<h1>Middleware </h1>');
//   // resp.end(); // completely takes over the server
//   next();
// });

  // code to run on server at startup
  // const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200,
  //     optional: true
  //   },
  //   age: {
  //     type: Number,
  //     min: 0
  //   },
  //   contactNumber: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Phone
  //   }
  // });
  //
  // petSchema.validate({
  //   age: 1,
  //   contactNumber: '444'
  // });
  //
  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200
  //   },
  //   hourlyWage: {
  //     type: Number,
  //     min: 0,
  //     optional: true
  //   },
  //   email: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Email
  //   }
  // });
  //
  // employeeSchema.validate({
  //   name:'Mikae',
  //   email: 'mika@'
  // })
