/*
 © Copyright IBM Corp. 2018
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

var expect = require('chai').expect;
var http = require('http');

// Below code demonstrates using various methods of testing
describe('Testing Server', function() {

  before(function(done){
    require(process.cwd() + '/server/server');
    setTimeout(done, 5000); // Waiting 5 seconds for server to start
    this.timeout(10000);
  });
    it('Public endpoint returns "Hello!"', function(done){
      var responseString = '';

      var options = {
        host: 'localhost',
        port: process.env.PORT || 3000,
        path: '/'
      };

      var callback = function(response){
        response.on('data', function (chunk) {
          responseString += chunk;
        });

        response.on('end', function () {
          expect(responseString).to.include('You need to enable JavaScript to run this app.');
          done();
        });
      };

      http.request(options, callback).end();
    });

    it('Health endpoint shows status up', function(done){
      var responseString = '';

      var options = {
        host: 'localhost',
        port: process.env.PORT || 3000,
        path: '/health'
      };

      var callback = function(response){
        response.on('data', function (chunk) {
          responseString += chunk;
        });

        response.on('end', function () {
          expect(responseString).to.equal('{"status":"UP"}');
          done();
        });
      };

      http.request(options, callback).end();
    });
});
