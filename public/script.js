"use srtrict";
$(document).ready(()=> {
	let userName = "";
	let userLastName = "";
	let userPosition = "";
 	getUsers=()=> {
        $.ajax({
            url: "/api/users",
            type: "GET",
            contentType: "application/json",
            success: (users)=>{
                let someUser = "";
                $.each(users,(index, user)=> {
                    someUser += createUser(user);
                })
                $(".user-info").append(someUser);
                choiceUser()
            }
        })
    }

    createUser=(user)=> {
        return  "<div class='user'> <div class='user-ava'><img src='"
	        +user.avatar+"'></div><div class='user-desc'><div class='user-name'>"
	        +user.name+ "</div><div class='user-lastName'>"
	        +user.lastName+"</div><div class='user-pos'>"
	        +user.position+"</div></div> </div>"
    }
    getUsers();

    createParameters=()=> {
	    $.ajax({
	        url: "/api/parameters",
	        type: "GET",
	        contentType: "application/json",
	        success:(parameters)=> {
	           	let foodPos = $("<select class='food-position'>");
	           	let favorKitch = $("<select class='favor-kitchen'>");
	           	let firstEatTime = $("<select class='first-eat-time'>");
	           	getParam(parameters.foodPosition,foodPos)
	           	getParam(parameters.favoriteKitchen,favorKitch)
	           	getParam(parameters.firstEatingTime,firstEatTime)
	            $(".param-info").append(foodPos)
	            				.append(favorKitch)
	            				.append(firstEatTime)
	            				.append($("<input type='text' class='dish' placeholder='Favorite dish'>"))
	         }
	    })
    }
    getParam=(param,elem,className)=>{
    	for(let i = 0; i < param.length;i++){
    		elem.append($("<option class='"+className+"'>"+param[i]+"</option>"))
    	}
    }
    createParameters();
    $(".send").click(()=>{
    	sendData()
    })
    sendData=()=>{
    	if(userName!=""){
    		$.ajax({
	            url: "/api/usersOuter",
	            contentType: "application/json",
	            method: "POST",
	            data: JSON.stringify({
	                foodPos      :$(".food-position").val(),
	                favorKitch 	 :$(".favor-kitchen").val(),
	                firstEatTime :$(".first-eat-time").val(),
	                dish 		 :$(".dish").val(),
	                userName 	 : userName, 
	                userLastName : userLastName, 
	                userPos 	 : userPosition
	            }),
	            success:(userOuter)=>{
					console.log(userOuter)
	       		}
	        })
    	}else{
    		alert("choice user");
    	}
    }

 	choiceUser=()=>{
		$(".user").click((e)=>{
			let $this = $(e.currentTarget);
			userName = $this.find(".user-name").text();
			userLastName = $this.find(".user-lastName").text();
			userPosition = $this.find(".user-pos").text();
			$(".user").css({"background":"none"})
			$this.css({"background":"#b7220b"})
	    	console.log(userName+" "+userLastName+" "+userPosition)
	    })
	}
})