function Product(){
    this.sourceMedia;
    this.thumbMedia;
    this.thumbMediaLen;
    this.downloadMedia;
}
Product.prototype.initSource = function(){
    this.sourceMedia = new Media().initUpload('http://www.ship.com/upload/token.php');
}
Product.prototype.initThumb = function(){
    this.thumbMediaLen = 5;
    this.thumbMedia = new Media().initUpload('http://www.ship.com/upload/token.php');
}
Product.prototype.initDownload = function(){
    this.downloadMedia = new Media().initDownload('http://www.ship.com/upload/token.php');
}
Product.prototype.uploadFile = function(data){
    this.initSource();
    this.sourceMedia.upload(data, 0);
    this.thumbMedia.progress = function(p){
        product.sourceProgress(p);
    }
    this.thumbMedia.success = function(){
        product.sourceSuccess();
    }
}
Product.prototype.uploadThumb = function(data){
    var product = this;
    this.initThumb();
    if(data.length < this.thumbMediaLen){
        this.thumbMediaLen = data.length;
    }
    for(var i=0;i<this.thumbMediaLen;i++){
        this.uploadThumb(data,i);
        this.thumbMedia.progress = function(p){
            product.thumbProgress(p);
        }
        this.thumbMedia.success = function(){
            product.thumbSuccess();
        }
    }
}
Product.prototype.thumbProgress = function(p){

}
Product.prototype.thumbSuccess = function(){

}
Product.prototype.sourceProgress = function(p){

}
Product.prototype.sourceSuccess = function(){

}
