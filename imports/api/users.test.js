import expect from 'expect';
import { validateNewUser } from './users';
import { Meteor } from 'meteor/meteor';

if(Meteor.isServer) {

  describe('users', function(){
    it('should allow valida email address', function(){
      // set up test data
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      };
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it('should reject invalid email', function(){
      const testUser = {
        emails: [
          {
            address: 'mikamacworld.com'
          }
        ]
      }
      expect(() => {
        validateNewUser(testUser);
      }).toThrow();

    });
  });
}


// const add = (a,b) => {
//   if(typeof b !== 'number') return a+a;
//   return a + b;
// }
//
// const square =(a) => a * a;
//
// describe('add', function(){
//   it('should add two numbers', function(){// avid arrow functions
//     const result = add(11,9);
//     expect(result).toBe(20);
//   });
//
//   it('should double a single number', function(){
//     const res = add(44);
//     expect(res).toBe(88);
//   });
// });
//
// describe('Square', function(){
//   it('should multipy itself with itself', function(){
//     const res = square(3);
//     expect(res).toBe(9);
//   });
// });
