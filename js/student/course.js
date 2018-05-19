
var basePath="https://lms-yagna.herokuapp.com/";

//var basePath="http://127.0.0.1:8000/";
function bodyOnLoad(){
    $(".loader").show();
    $.get(basePath+"api/get-all/", function(data, status){
            var superUser = localStorage.getItem("isSuperUser");
            if(superUser==="true"){
            for(var i=0; i<data.length;i++){
            var obj = data[i];
                if(obj.isAvailable === false){

                    var card ="<div class='card'><div class='card-body'><h4 class='card-title'>"+obj.title+"</h4><p class='card-title'><label><b>Duration(in Days) :  </b>"+obj.days+"</label></p><p class='card-title'><label><b>Author    :    </b>"+obj.author+"</label></p><p class='card-text'><label><b>Description</b></label><hr><p class='card-text'>"+obj.courseDetails+"</p><a href='#' class='button btn btn-primary disabled'>Seats Not available</a><button class='btn btn-danger' style='margin-left:10px' onClick='deleteCourse("+obj.id+")'>Delete Course</button></div></div>";

            $("#cardId").append(card);
         }
                else{
                 var card ="<div class='card'><div class='card-body'><h4 class='card-title'>"+obj.title+"</h4><p class='card-title'><label><b>Duration(in Days) :  </b>"+obj.days+"</label></p><p class='card-title'><label><b>Author  :        </b>"+obj.author+"</label></p><label><b>Description</b></label><hr><p class='card-text'><p class='card-text'>"+obj.courseDetails+"</p><button class='enroll btn btn-primary' onClick='enroll("+obj.id+")'>Enroll Course</button><button class='btn btn-danger' style='margin-left:10px' onClick='deleteCourse("+obj.id+")'>Delete Course</button></div></div>";
               $("#cardId").append(card);


                }
            }
            }
            else{
             for(var i=0; i<data.length;i++){
            var obj = data[i];

            if(obj.isAvailable === false){

             var card ="<div class='card'><div class='card-body'><h4 class='card-title'>"+obj.title+"</h4><p class='card-title'><label><b>Duration(in Days) :  </b>"+obj.days+"</label></p><p class='card-title'><label><b>Author     :     </b>"+obj.author+"</label></p><label><b>Description</b></label><hr><p class='card-text'><p class='card-text'>"+obj.courseDetails+"</p><a href='#' class='button btn btn-primary disabled'>Seats Not available</a></div></div>";

            $("#cardId").append(card);

                   }
             else{

           var card ="<div class='card'><div class='card-body'><h4 class='card-title'>"+obj.title+"</h4><p class='card-title'><label><b>Duration(in Days) :  </b>"+obj.days+"</label></p><p class='card-title'><label><b>Author        :    </b>"+obj.author+"</label></p><label><b>Description</b></label><hr><p class='card-text'><p class='card-text'>"+obj.courseDetails+"</p><button class='enroll btn btn-primary' onClick='enroll("+obj.id+")'>Enroll Course</button></div></div>";
            $("#cardId").append(card);

                       // $("#dtable").append("<tr id='row_"+obj.id+"' class='details' style='display:None'><td>"+obj.courseDetails+"</td></tr>");
             }




                }
             }
             $(".loader").hide();
        });

}

function studentEnrolled(){

   $.ajax({     type: "GET",
                url: basePath+"api/student/get-enroll-courses-by-student/",
                contentType: "application/json",
                data: JSON.stringify({

                }),
                 headers: {
                "Authorization":"Token "+localStorage.getItem('token'),
                },
                dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                 var obj = data[i];
                      $("#course-row").append("<tr><td>"+(i+1)+"</td><td>"+obj.title+"</td><td>"+obj.author+"</td><td>"+obj.days+"</td><td>ENROLLED</td></tr>");
                }

            },
            error: function (data) {

            }

        });


}

function enroll(courseId){

     $.ajax({     type: "PUT",
                url: basePath+"api/student/enroll-course/",
                contentType: "application/json",
                data: JSON.stringify({
                    courseId: courseId
                }),
                 headers: {
                "Authorization":"Token "+localStorage.getItem('token'),
                },
                dataType:"json",
        success:function (data) {

            alert("Enrolled successfully");
            window.location.reload();
        },
        error:function (data) {
         if(data.status=== 500){
             alert("This email id not registered");
         }
         else if(data.status ===401){
             alert("please login to enroll");
             window.location.replace("./login.html");
         }
         else if(data.status===207){
            alert("already enrolled this course..")
         }
         else if(data.status===200){
 alert("Enrolled successfully");
         }
        }

    });

}

function addCourse(){

        var title= $("#title").val();

         var days = $("#days").val();
         var courseDetails = $("#courseDetails").val();
         var author = $("#author").val();

var flag =true;
if(title===null || title.length===0 || days ===null || days.length===0 || courseDetails ===null|| courseDetails.length===0 ||author===null || author.length===0){

flag=false;
alert("please fill the form with valid details");
}
if(flag){

     $.ajax({     type: "POST",
                url: basePath+"api/admin/add-course/",
                contentType: "application/json",
                data: JSON.stringify({
                    title: title,
                    days:days,
                    author:author,
                    courseDetails:courseDetails
                }),
                 headers: {
                "Authorization":"Token "+localStorage.getItem('token'),
                },
                dataType:"json",
        success:function (data) {

            alert("success")
            window.location.reload();
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html");
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            window.location.replace("./login.html");
         }
        }

    });
}
}



function viewStudents(){




     $.ajax({     type: "GET",
                url: basePath+"api/admin/get-students/",
                contentType: "application/json",
                data: JSON.stringify({

                }),
                 headers: {
                "Authorization":"Token "+localStorage.getItem('token'),
                },
                dataType: "json",
        success:function (data) {
        var students = data;

         $.get(basePath+"api/get-all/", function(data, status){


 for (var i = 0; i < students.length; i++) {
                 var obj = students[i];
                      $("#course-row").append("<tr><td>"+(i+1)+"</td><td>"+obj.userName+"</td><td>"+obj.email+"</td><td>"+obj.total+"</td><form id='addToCourseForm_"+obj.id+"'><td><input type='hidden' id='student_"+obj.id+"' name='courseId' value='"+obj.id+"'</td><td><select id='course_"+obj.id+"'name='selectedCourse'></select></td><td><button type='submit' data-form-id='addToCourseForm_"+obj.id+"' onclick='addToCourse("+obj.id+")' class='btn btn-primary'>add to course</button></td></form><td><button class='btn btn-danger' onClick='deleteStudent("+obj.id+")'>Delete</button></td></tr>");
                var select = document.getElementById("course_"+obj.id);
                  for(var j=0;j<data.length;j++) {
                  var cObj = data[j];
                 // alert(cObj.title);
    select.options[select.options.length] = new Option(cObj.title, cObj.id);
}

                }
                });
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html");
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
          window.location.replace("./login.html");
         }
        }

    });

}

function addToCourse(addToCourseFormId){
  var courseId = $("#course_"+addToCourseFormId).val();
  var studentId = $("#student_"+addToCourseFormId).val();

   $.ajax({     type: "PUT",
                url: basePath+"api/admin/add-to-course/",
                contentType: "application/json",

                 headers: {
                "Authorization":"Token "+localStorage.getItem('token'),
                },
                 data: JSON.stringify({
                    courseId:courseId,
                    studentId:studentId
                }),
                dataType: "json",
        success:function (data) {
            alert("student added to course.");
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html");
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            window.location.replace("./login.html");
         }

         else if(data.status===207){
            alert("student already enrolled this course..")
         }
         else if(data.status===306){
 alert("This course Seats are full..");
         }
        }

    });



}


function viewEnrolledCourse(){


     $.ajax({     type: "GET",
                url: basePath+"api/admin/get-enrolled-students/",
                contentType: "application/json",
                data: JSON.stringify({

                }),
                 headers: {
                "Authorization":"Token "+localStorage.getItem('token'),
                },
                dataType: "json",
        success:function (data) {
 for (var i = 0; i < data.length; i++) {
                 var obj = data[i];

                    $("#course-row").append("<tr><td>"+(i+1)+"</td><td>"+obj.course.title+"</td><td>"+obj.course.author+"</td><td>"+obj.course.days+"</td><td>"+obj.student.userName+"</td><td>"+obj.student.email+"</td><td><button class='enroll btn btn-primary' onClick='deleteEnrolledStudents("+obj.enId+")'>Delete Enrolled Students</button></td></tr>");
                }
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html");
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            window.location.replace("./login.html");
         }
        }

    });

}



function deleteEnrolledStudents(enrollId){

     $.ajax({     type: "DELETE",
                url: basePath+"api/admin/remove-student-course/",
                contentType: "application/json",
                data: JSON.stringify({
                    enrollId:enrollId
                }),
                 headers: {
                "Authorization":"Token "+localStorage.getItem('token'),
                },
                dataType:"json",
        success:function (data) {
        alert("Enrolled Student removed Successfully.");
            window.location.reload()
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html");
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            window.location.replace("./login.html");
         }
        }

    });

}


function deleteCourse(courseId){

     $.ajax({     type: "DELETE",
                url: basePath+"api/admin/remove-course/",
                contentType: "application/json",
                data: JSON.stringify({
                    courseId:courseId
                }),
                 headers: {
                "Authorization":"Token "+localStorage.getItem('token'),
                },
                dataType:"json",
        success:function (data) {
        alert("Course Removed Successfully.");
            window.location.reload()
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html");
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            window.location.replace("./login.html");
         }
        }

    });

}

function deleteStudent(studentId){

     $.ajax({     type: "DELETE",
                url: basePath+"api/admin/remove-student/",
                contentType: "application/json",
                data: JSON.stringify({
                    studentId:studentId
                }),
                 headers: {
                "Authorization":"Token "+localStorage.getItem('token'),
                },
                dataType:"json",
        success:function (data) {
        alert("Student is Removed Successfully.");
            window.location.reload()
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html");
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
           window.location.replace("./login.html");
         }
        }

    });

}