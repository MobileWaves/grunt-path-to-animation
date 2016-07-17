var brain = require('../lib/brain');
var expect = require('chai').expect;

describe('Brain', function() {
  it('should generate css from flat array', function() {
    var input = {
      item1: [50,50,100,100]
    }

    var elementSize = {
      width: 100,
      height: 100
    };

    var namespace = 'mynamespace';

    var expectedOutput = [
      '@keyframes mynamespace-item1 {',
      '\t0% { transform: translate(0%, 0%); }',
      '\t100% { transform: translate(50%, 50%); }',
      '}',
      '.animated-mynamespace-item1 {',
      '\t@include animationName(mynamespace-item1);',
      '}'
    ].join('\n');

    var output = brain.generateCss(input, namespace, elementSize.width, elementSize.height);
    expect(output).to.equal(expectedOutput);
  });
  
});