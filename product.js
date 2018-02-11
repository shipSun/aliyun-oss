function Product(){
    this.sourceMedia;
    this.thumbMedia;
    this.downloadMedia;
}
Product.prototype.initSource = function(){
    this.sourceMedia = new Media().initUpload();
}
Product.prototype.initThumb = function(){
    this.thumbMedia = new Media().initUpload();
}
Product.prototype.initDownload = function(){
    this.downloadMedia = new Media().initDownload();
}
Product.prototype.uploadFile = function(data){
    this.sourceMedia.upload(data, 0);
}
Product.prototype.uploadThumb = function(){

}
