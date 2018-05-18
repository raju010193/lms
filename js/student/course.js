
var basePath="https://lms-yagna.herokuapp.com/";
function bodyOnLoad(){

    $.get(basePath+"api/get-all/", function(data, status){
            var superUser = localStorage.getItem("isSuperUser");
            if(superUser==="true"){
            for(var i=0; i<data.length;i++){
            var obj = data[i];

                  $("#course-row").append("<tr><td>"+(i+1)+"</td><td>"+obj.title+"</td><td>"+obj.author+"</td><td>"+obj.days+"</td><td><button class='enroll btn btn-primary' onClick='enroll("+obj.id+")'>Enroll Course</button></td><td><button class='enroll btn btn-primary' onClick='viewCourse("+obj.id+")'>View Course</button</td><td><button class='btn btn-danger' onClick='deleteCourse("+obj.id+")'>Delete Course</button></td></tr><tr id='row_"+obj.id+"' class='details' style='display:None'><td><textarea rows='10'cols='90'>"+obj.courseDetails+"</textarea></td></tr>");

            }
            }
            else{
             for(var i=0; i<data.length;i++){
            var obj = data[i];

            if(obj.isAvailable === false){
             $("#course-row").append("<tr><td>"+(i+1)+"</td><td>"+obj.title+"</td><td>"+obj.author+"</td><td>"+obj.days+"</td><td>SEATS FULL</td><td><button class='enroll btn btn-primary' onClick='viewCourse('row_'"+obj.id+")'>View Course</button</td></tr><tr id='row_"+obj.id+"' class='details' style='display:None'><td><textarea rows='10'cols='90'>"+obj.courseDetails+"</textarea></td></tr>");

             }
             else{
              $("#course-row").append("<tr><td>"+(i+1)+"</td><td>"+obj.title+"</td><td>"+obj.author+"</td><td>"+obj.days+"</td><td><button class='enroll btn btn-primary' onClick='enroll("+obj.id+")'>Enroll Course</button></td><td><button class='enroll btn btn-primary' onClick='viewCourse("+obj.id+")'>View Course</button</td></tr><tr id='row_"+obj.id+"' class='details' style='display:None'><td><textarea rows='10'cols='90'>"+obj.courseDetails+"</textarea></td></tr>");
                // $("#dtable").append("<tr id='row_"+obj.id+"' class='details' style='display:None'><td>"+obj.courseDetails+"</td></tr>");
             }




                }
             }
        });

};
function viewCourse(id){
$(".details").hide();
$("#row_"+id).show();

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
        success:function (data) {

            alert("success")
        },
        error:function (data) {
         if(data.status=== 500){
             alert("This email id not registered");
         }
         else if(data.status ===401){
             alert("please login to enroll")
         }
         else if(data.status===207){
            alert("already enrolled this course..")
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
if(title===null || days ===null || courseDetail===null||author===null){

flag=false;
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
             window.location.replace("./login.html")
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            alert("./login.html")
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
 for (var i = 0; i < data.length; i++) {
                 var obj = data[i];
                      $("#course-row").append("<tr><td>"+(i+1)+"</td><td>"+obj.userName+"</td><td>"+obj.email+"</td><td>"+obj.total+"</td><td><button class='btn btn-danger' onClick='deleteStudent("+obj.id+")'>Delete</button></td></tr>");
                }
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html")
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            alert("./login.html")
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
             window.location.replace("./login.html")
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            alert("./login.html")
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
        success:function (data) {
            window.location.reload()
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html")
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            alert("./login.html")
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
        success:function (data) {
            window.location.reload()
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html")
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            alert("./login.html")
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
        success:function (data) {
            window.location.reload()
        },
        error:function (data) {
         if(data.status=== 500){
             alert("something went wrong.");
         }
         else if(data.status ===401){
             alert("Permissions Denied.")
             window.location.replace("./login.html")
         }
         else if(data.status===403){
         alert("Your are not loggedIn.")
            alert("./login.html")
         }
        }
    });

}
