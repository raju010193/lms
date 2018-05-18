

var basePath="https://lms-yagna.herokuapp.com/";
$(document).ready(function () {

var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
if(username !== null && token  !== null&& typeof(Storage) !== "undefined"){
       $("#loggedin").show();
            $("#userId").text(username)
                $("#loginLi").hide()

}else{
     $("#loggedin").hide();
    $("#loginLi").show();
}
var isSuperUser = localStorage.getItem("isSuperUser");
 if(isSuperUser === "true"){
                    $("#isadmin").show();
                }
                else{
                $("#isadmin").hide();


                }

});

function register() {
     var userName = $("#userName").val();
        var emailId = $("#emailId").val();
        var password = $("#password").val();
        var confirm = $("#confirm").val();

        var flag= true;

        if(emailId===null || password===null || confirm===null){
        flag=false;
        }
        $("#confirmId").hide()
        if(password != confirm){
        flag=false;
        $("#confirmId").show();
        }
        if(flag){

     $.ajax({
                type: "POST",
                url: basePath+"api/register/",
                contentType: "application/json",
                data: JSON.stringify({
                    username: userName,
                    password: password,
                    email: emailId
                }),
            success: function(data){
                alert("your account is created successfully.");

                  window.location.replace("./login.html");

            },
            error: function(data){
                if(data.status===207){
                alert("User Already Exist please try different username.");
                }else if(data.status===204){
                alert("please set currect formate");
                }
            }
        });
        }

}



    // $(".register-directly").click(function(){
    //
    // });


// update new password here

function changePassword() {
     var newPassword = $("#newPassword").val();
        var confirmPassword = $("#confirmPassword").val();
        var oldPassword = $("#oldPassword").val();
        var id = $("#passwordId").val();
        var flag= true;
        if(confirmPassword===null || newPassword===null || oldPassword===null){
            flag= false;
        }
        $("#confirmId").hide()
        if(newPassword != confirmPassword){
        flag=false;
        $("#confirmId").show();
        }
        if(flag){
 $.ajax({
                type: "PUT",
                url: basePath+"api/accounts/change-password/",
                contentType: "application/json",
                data: JSON.stringify({
                 oldPassword:oldPassword,newPassword:newPassword
                }),
                 headers: {
                "Authorization":"Token "+localStorage.getItem('token')
                },
                dataType: "json",
        success:function (data) {
             localStorage.setItem('token', data.token);
            alert("success")
            window.location.reload();
        },
        error:function (data) {
         if(data.status === 500){
             alert("This email id not registered");
             window.location.reload();

         }
         else if(data.status ===401){
             alert("Your current Password is does not matched.");
             window.location.reload();
         }
        }
    });
}
}



function  userLogin() {
      var userName = $("#user-name").val();
        var password = $("#user-password").val();
        var flag=true;
        if(userName===null || password===null){
        flag=false;

        }
        if(flag){
        $.ajax({
                type: "POST",
                url: basePath+"api/accounts/login/",
                contentType: "application/json",
                data: JSON.stringify({
                    username: userName,
                    password: password
                }),
                dataType: "json",
            success: function(data){
                localStorage.setItem("token", data.user.token);
                localStorage.setItem("username",data.user.username);
                $("#loggedin").show();
                $("#loginLi").hide();
                localStorage.setItem("isSuperUser",data.user.is_superuser)
                if(data.user.is_superuser===true){
                    $("#isadmin").show();
                     window.location.replace("./postcourse.html");
                }
                else{
                $("#isadmin").hide();
                 window.location.replace("./course.html");
                }

            },
            error: function(data){
                if(data.status==500){
                alert("Something went wrong")
                }
                if(data.status==401){
                   alert("username or password wrong please enter again")

                }

            }
        });
        }
}


  function logout(){

        $.ajax({
                type: "GET",
                url: basePath+"api/accounts/logout",
                contentType: "application/json",
                data: JSON.stringify({

                }),
            success: function(data){
                localStorage.clear();
                 $("#loggedin").hide();
                $("#loginLi").show();
                alert("Logged out Successfully.")
                window.location.replace('./login.html');
            },
            error: function(data){
                localStorage.clear();
                 $("#loggedin").hide();
                $("#loginLi").show();
                alert("Something went wrong..");
                window.location.reload();
            }
        });

    }

