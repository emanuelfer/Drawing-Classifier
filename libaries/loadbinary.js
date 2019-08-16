class LoadBytes{
   loadBytes(file, callback){
    var self = this;
    var data = {};
    var oReq = new XMLHttpRequest();
    oReq.open("GET", file, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function(oEvent) {
      var arrayBuffer = oReq.response;
      if (arrayBuffer) {
        data.bytes = new Uint8Array(arrayBuffer);
        if (callback) {
          callback(data);
        }
        self._decrementPreload();
      }
    }
    oReq.send(null);
    return data;
  }
}