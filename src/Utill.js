// Generated by CoffeeScript 1.9.3
var MapUtill;

window.MapUtill = MapUtill = (function() {
  function MapUtill(options) {
    this.map = options.map;
    this.maxZoom = options.maxZoom || 30;
  }

  MapUtill.prototype._calcZoom = function(bounds, mapDim) {
    var WORLD_DIM, latFraction, latRad, latZoom, lngDiff, lngFraction, lngZoom, ne, sw, zoom;
    WORLD_DIM = {
      height: 256,
      width: 256
    };
    latRad = function(lat) {
      var radX2, sin;
      sin = Math.sin(lat * Math.PI / 180);
      radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    };
    zoom = function(mapPx, worldPx, fraction) {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    };
    ne = bounds.getNorthEast();
    sw = bounds.getSouthWest();
    latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;
    lngDiff = ne.lng() - sw.lng();
    lngFraction = lngDiff < 0 ? lngDiff + 360 : lngDiff / 360;
    latZoom = zoom(mapDim.height, WORLD_DIM.height, Math.abs(latFraction));
    lngZoom = zoom(mapDim.width, WORLD_DIM.width, Math.abs(lngFraction));
    return Math.min(latZoom, lngZoom, this.maxZoom);
  };

  MapUtill.prototype.getMapSize = function() {
    return {
      width: this.map.getDiv().offsetWidth,
      height: this.map.getDiv().offsetHeight
    };
  };

  MapUtill.prototype.offsetPosition = function(latlng, offsetX, offsetY) {
    var point, projection, scale;
    if (offsetX == null) {
      offsetX = 0;
    }
    if (offsetY == null) {
      offsetY = 0;
    }
    scale = Math.pow(2, this.map.getZoom());
    projection = this.map.getProjection();
    point = projection.fromLatLngToPoint(latlng);
    point.x = point.x + offsetX / scale / 2;
    point.y = point.y + offsetY / scale / 2;
    return projection.fromPointToLatLng(point);
  };

  MapUtill.prototype.setCenter = function(latlng, offsetX, offsetY) {
    if (offsetX == null) {
      offsetX = 0;
    }
    if (offsetY == null) {
      offsetY = 0;
    }
    return this.map.setCenter(this.offsetPosition(latlng, offsetX, offsetY));
  };

  MapUtill.prototype.panTo = function(latlng, offsetX, offsetY) {
    var position;
    if (offsetX == null) {
      offsetX = 0;
    }
    if (offsetY == null) {
      offsetY = 0;
    }
    position = this.offsetPosition(latlng, offsetX, offsetY);
    return this.map.panTo(position);
  };

  MapUtill.prototype.setZoom = function(zoom) {
    return this.map.setZoom(zoom);
  };

  MapUtill.prototype.fitBounds = function(bounds, options) {
    var bottom, left, offsetX, offsetY, right, size, top;
    if (options == null) {
      options = {};
    }
    left = options.left || 0;
    right = options.right || 0;
    top = options.top || 0;
    bottom = options.bottom || 0;
    size = this.getMapSize();
    size.width -= right + left;
    size.height -= bottom + top;
    if (size.width < 0) {
      throw new Error("map with less then " + (right + left));
    }
    if (size.height < 0) {
      throw new Error("map height less then " + (bottom + top));
    }
    this.setZoom(this._calcZoom(bounds, size));
    offsetX = right - left;
    offsetY = bottom - top;
    return this.panTo(bounds.getCenter(), offsetX, offsetY);
  };

  return MapUtill;

})();

//# sourceMappingURL=Utill.js.map
