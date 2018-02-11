function Media(){
    this.uploadClient;
    this.downloadClient;
    this.debug = false;
}
Upload.prototype.initUpload = function(){
    this.uploadClient = new OssSdk().init('http://www.ship.com/upload/token.php');
}
Upload.prototype.initDownload = function(){
    this.downloadClient = new OssSdk().init('http://www.ship.com/upload/token.php');
}
Upload.prototype.upload = function(data, i){
    return this.uploadClient.upload(data, i);
}
Upload.prototype.download = function(){
    this.downloadClient.download();
}
Upload.prototype.progress = function(p){

}
Upload.prototype.success = function(fileName){

}


