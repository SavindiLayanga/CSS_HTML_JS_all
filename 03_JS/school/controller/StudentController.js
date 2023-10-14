import {StudentModel} from "../model/StudentModel.js";
import {student_db} from "../db/db.js";

var row_index = null;
var email_pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\n";
var regEmail=null;

const clear = () => {
    $("#student-id").val("");
    $("#first-name").val("");
    $("#last-name").val("");
    $("#address").val("");
    $(input[name='flexRadioDefault'][value='DEP']).prop("checked", true);
}

const loadStudentData = () => {
    $('#student-tbl-body').empty(); // make tbody empty
    student_db.map((item, index) => {
        let record = `<tr><td class="student_id">${item.student_id}</td><td class="first_name">${item.first_name}</td><td class="last_name">${item.last_name}</td><td class="email">${item.email}</td><td class="mobile">${item.mobile}</td><td class="address">${item.address}
        </td><td class="program">${item.program}</td></tr>`;
        $("#student-tbl-body").append(record);
    });
};

// submit
$("#student-btns>button[type='button']").eq(0).on("click", () => {
    // collect data from the array
    let student_id = $("#student-id").val();
    let first_name = $("#first-name").val();
    let last_name = $("#last-name").val();
    let email = $("#email").val();
    let mobile = $("#mobile").val();
    let address = $("#address").val();
    let program = $("input[name='flexRadioDefault']:checked").val();

    if (!student_id) {
        if (!first_name) {
            if (!last_name) {

                var emailValid=regEmail.test(email);

                if (!email && emailValid) {
                    if (!mobile) {
                        if (!address) {

                            let student_obj = new StudentModel(student_id, first_name, last_name,email, mobile, address, program);

                            // find item index
                            let index = student_db.findIndex(item => item.student_id === student_id);

                            // update item in the db
                            student_db[index] = student_obj;

                            // clear();
                            $("#student-btns>button[type='reset']").click();

                            // load student data
                            loadStudentData();
                        }
                        else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Invalid input',
                                text: 'please enter address',
                            })
                        } }

                    else
                    {
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid input',
                            text: 'please enter mobile',
                        })
                    }

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid input',
                        text: 'please enter email',
                    })
                }

            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid input',
                    text: 'please enter last_name',
                })
            } }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid input',
                text: 'please enter first_name',
            }) }
    }

    else {
        Swal.fire({
            icon: 'error',
            title: 'Invalid input',
            text: 'please enter student_id',
        })  }


    // prepare the object
    // let student_obj = {
    //     student_id: student_id,
    //     first_name: first_name,
    //     last_name: last_name,
    //     address: address,
    //     program, program
    // };

    let student_obj = new StudentModel(student_id, first_name, last_name, email, mobile, address, program);

    // save in the db
    student_db.push(student_obj);

    // clear();
    $("#student-btns>button[type='reset']").click();

    // load student data
    loadStudentData();


});
// update
$("#student-btns>button[type='button']").eq(1).on("click", () => {

    let student_id = $("#student-id").val();
    let first_name = $("#first-name").val();
    let last_name = $("#last-name").val();
    let address = $("#address").val();
    let email = $("#email").val();
    let mobile = $("#mobile").val();
    let program = $("input[name='flexRadioDefault']:checked").val();


    // prepare the object
    // let student_obj = {
    //     student_id: student_id,
    //     first_name: first_name,
    //     last_name: last_name,
    //     address: address,
    //     program: program
    // };


})

// delete
$("#student-btns>button[type='button']").eq(2).on("click", () => {
    let student_id = $("#student-id").val();

    // find item index
    let index = student_db.findIndex(item => item.student_id === student_id);

    // remove the item from the db
    student_db.splice(index, 1);

    $("#student-btns>button[type='reset']").click();

    // load student data
    loadStudentData();
})

$("#student-tbl-body").on("click", "tr", function() {
    row_index = $(this).index();

    console.log(row_index);

    let student_id = $(this).find(".student_id").text();
    let first_name = $(this).find(".first_name").text();
    let last_name = $(this).find(".last_name").text();
    let email = $(this).find(".email").text();
    let mobile = $(this).find(".mobile").text();
    let address = $(this).find(".address").text();
    let program = $(this).find(".program").text();

    $("#student-id").val(student_id);
    $("#first-name").val(first_name);
    $("#last-name").val(last_name);
    $("#address").val(address);
    $("#email").val(email);
    $("#mobile").val(mobile);
    $(input[name='flexRadioDefault'][value='${program}']).prop("checked", true);
});