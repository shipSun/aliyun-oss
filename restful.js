/**
 * @author shipSun
 */
function RestFul(){
	this.type="get";
	this.url="";
	this.data="";
	this.async=true;
	this.debug = false;

	var restful = this;
    function successHandle(data){
        restful.isLoginHandle(data);
        restful.success(data);
    }

	this.ajax=function(){
		$.ajax({
			"type":this.type,
			"url":this.url,
			"async":this.async,
			"cache":true,
			"complete":this.complete,
			"error":this.error,
			"success":successHandle,
			"contentType":"application/x-www-form-urlencoded",
			"data":this.data,
			"dataType":"json"
		});
	};
	this.complete=function(xhr, type){
		if(this.debug) {
            console.log('执行完成', xhr, type);
        }
	};
	this.error=function(xhr,errStr){
        if(this.debug) {
            console.error('出错', xhr, errStr);
        }
		alert(errStr);
	};
    this.success = function(data){
        if(this.debug) {
            console.log('执行成功', data);
        }
    }
    this.isLoginHandle = function(data){
        if(this.debug) {
            console.error('登录失败', data);

        }else{
            if(data.code==403){
            	window.location.href=data.location;
            }
		}
    }
}
RestFul.prototype.init = function(config){
	if(config.async!==undefined){
		this.async = config.async;
	}
	if(config.debug!==undefined){
		this.debug = config.debug;
	}
	return this;
}
RestFul.prototype.post = function(url, data, success, error, complete){
	this.url=url;
	this.data=data;
	this.type='POST';
	if(success){
		this.success=success;
	}
	if(error){
		this.error = error;
	}
	if(complete){
		this.complete=complete;
	}
	this.ajax();
};
RestFul.prototype.get = function(url, success, error, complete){
	this.url=url;
	this.data='';
	this.type='GET';
	if(success){
		this.success=success;
	}
	if(error){
		this.error = error;
	}
	if(complete){
		this.complete=complete;
	}
	this.ajax();
};
RestFul.prototype.put = function(url, data, success, error, complete){
	this.url=url;
	this.data=data;
	this.type='PUT';
	if(success){
		this.success=success;
	}
	if(error){
		this.error = error;
	}
	if(complete){
		this.complete=complete;
	}
	this.ajax();
};
RestFul.prototype.del = function(url, success, error, complete){
	this.url=url;
	this.data='';
	this.type='DELETE';
	if(success){
		this.success=success;
	}
	if(error){
		this.error = error;
	}
	if(complete){
		this.complete=complete;
	}
	this.ajax();
};
jQuery.restful = new RestFul().init({});