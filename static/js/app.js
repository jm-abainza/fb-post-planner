
window.fbAsyncInit = function() {
	FB.init({
	  appId      : '769629883075681',
	  xfbml      : true,
	  version    : 'v2.1'
	});
	initialize();
};
(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



function initialize() {
	var user;
	var baseUrl = "https://graph.facebook.com/v2.1/";
	getLoginStatus();
    $("#fb-login").click(function(){
    	getLoginStatus(login);
    })
    $("#fb-logout").click(logout);
    $("#post-form").submit(function(){
    	if(user){
    		var msg = $("#post-form textarea").val();
    		postToFB(msg);
    		return false;
    	}else{
    		alert("Please Login to post");
    		return false;
    	}
    });

    function getLoginStatus(callback){
    	FB.getLoginStatus(function(response){
    		if(response.status=="connected"){
    			getFBresponse(response);
    			toggleLogin();
    		}else if(typeof callback === 'function' && callback()){
    			callback(response);
    		}
    	});
    }
    function postToFB(msg){
    	var url = baseUrl + user.userID + "/feed/";
    	var data = {
					method: "post",
					message: msg,
					access_token: user.accessToken
				};
		$.get(url,data,function(response){
					if(response.id){
						alert('Post Successful');
						var msg = $("#post-form textarea").val("");
					}else{
						alert('An error occured. Try to reload the page and try again.')
					}
				});	
    }
    function getFBresponse(response){
    	user=response.authResponse;
    }
    function login(){
    	FB.login(function(response){
    		if(response.authResponse){
    			getFBresponse(response);
    			toggleLogin();
    		}
    	}, {scope: 'publish_actions',return_scopes:true});
    }
    function logout(){
    	FB.logout(function(){
    		toggleLogin();
    		user=null;
    	});
	}

    function toggleLogin(){
		$("#fb-login,#fb-logout").toggle();
    }
}