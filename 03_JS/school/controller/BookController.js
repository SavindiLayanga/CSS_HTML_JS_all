//------ Books -----------------------------------------------------------------------------------------------------------

// submit
$("#book-btns>button[type='button']").eq(0).on("click", () => {

    let book_id = $("#book-id").val();
    let book_name = $("#book-name").val();
    let author = $("#author").val();

    let record = `<tr><td class="book_id">${book_id}</td><td class="book_name">${book_name}</td><td class="author">${author}</td></tr>`;
    $("#book-tbl-body").append(record);

    // clear();
    $("#book-btns>button[type='reset']").click();
});
