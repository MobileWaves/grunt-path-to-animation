var bezier = require('bezier-curve');

var path = {
  isNested: function(sourcePath) {
    return sourcePath.every(function(item) {
      return item instanceof Array;
    });
  },

  nest: function(sourcePath) {
    var xAndY = [];
    return sourcePath.reduce(function(all, item, index) {
      xAndY.push(item);

      if (index % 2 === 1) {
        all.push(xAndY);
        xAndY = [];
      }

      return all;
    }, []);
  },

  interpolate: function(sourcePath) {
    var result = [];
    for(var t=0; t<1; t+=0.03) {
      result.push(bezier(t, sourcePath));
    }

    return result;
  },

  addOffset: function(sourcePath, offsetX, offsetY) {
    return sourcePath.map(function(xAndY) {
      var x = xAndY[0];
      var y = xAndY[1];

      return [x + offsetX, y + offsetY];
    });
  },

  toPercentages: function(sourcePath, relativeElementWidth, relativeElementHeight) {
    var firstPositionX = sourcePath[0][0];
    var firstPositionY = sourcePath[0][1];

    return sourcePath.map(function(xAndY, index) {
      var x = xAndY[0];
      var y = xAndY[1];

      if (index === 0) {
        return ['0%','0%'];
      } else {
        return [
          ((x.toFixed(3) - firstPositionX) / relativeElementWidth * 100) + '%',
          ((y.toFixed(3) - firstPositionY) / relativeElementHeight * 100) + '%'
        ];
      }
    });
  }
};

module.exports = path;