var clickListUser = 1;

$("#btnListUser").on("click", function (e) {
    console.log(clickListUser);
    if (clickListUser == 1) {
        $(".div-disapear").show();
        $(".div-disapear").removeClass("out").addClass("active");
        clickListUser = clickListUser + 1;
    }
    if (clickListUser == 2) {
        $(".button--disapear").show();
        $(".button--disapear").removeClass("active").addClass("out");
        clickListUser = 1;
    }
});
