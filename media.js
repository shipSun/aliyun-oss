function Media(){
    this.uploadClient;
    this.downloadClient;
}
Upload.prototype.initUpload = function(url){
    this.uploadClient = new OssSdk().init(url);
    this.uploadClient.setUpload(this);
}
Upload.prototype.initDownload = function(url){
    this.downloadClient = new OssSdk().init(url);
    this.uploadClient.setUpload(this);
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


