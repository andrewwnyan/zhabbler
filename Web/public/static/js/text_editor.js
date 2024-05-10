$(document).ready(function(){
    $(document).on("input", ".popup:first form .postContent", function(){
        if($(this).html().trim().length == 0){
            zhabbler.insertIntoEditorContent('p', locale['go_ahead_put_smth']);
        }
    });
    $(document).on("click", ".popup:first form", function(){
        $("#ContextMenuTextConfig").fadeOut(200);
    });
    $(document).on("click", "#ContextMenuTextConfig .color", function(){
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, $(this).css("background-color"));
    });
    $(document).on("click", ".ui__btn__image__delete", function(){
        $(`.photo--[data-src="${$(this).data("src")}"]`).remove();
    });
    $(document).on("contextmenu", ".popup:first form .postContent", function(e){
        $("#ContextMenuTextConfig").css({"top":e.clientY, "left":e.clientX});
        $("#ContextMenuTextConfig").fadeToggle(200);
        e.stopPropagation();
        return false;
    });
    $(document).on('click', '#createLink', function(){
        let userLink = prompt("Введите URL");
        if(userLink !== '' && userLink){
            if(/http/i.test(userLink)){
                document.execCommand('createLink', false, userLink);
            }else{
                userLink = "http://" + userLink;
                document.execCommand('createLink', false, userLink);
            }
        }
    });
});
const publish = (repost, question) => {
    if($("#pC_sS .postContent .photo-- .loader").length > 0){
        zhabbler.addWarn(locale['err_photo_post']);
        return false;
    }
    $("#app").prepend(`<div class="popup popup_do_not_close" style="z-index:102048!important;">
        <div class="loader">
            <div class="loader_part loader_part_1"></div>
            <div class="loader_part loader_part_2"></div>
            <div class="loader_part loader_part_3"></div>
        </div>
    </div>`);
    $.post("/api/Posts/add", {content:$("#pC_sS .postContent").html(), post_id:$("input[name=post_id]").val(), post_contains:$("select[name=post_contains]").val(), who_can_comment:$("select[name=who_can_comment]").val(), who_can_repost:$("select[name=who_can_repost]").val(), repost:repost, question:question}, function(data){
        if(data.error == null){
            goToPage("/me")
        }else{
            zhabbler.addError(data.error);
            $(".popup:first").remove();
        }
    })
}
const closeEditor = () => {
    if($(".popup:first form .postContent").html().replace(/<[^>]*>?/gm, '').trim().length > 0){
        $("#app").prepend(`<div class="popup popup_choose_alert popup_do_not_close">
        <div>
            <div>
                <h1>
                    ${locale['delete_this_post']}
                </h1>
            </div>
            <div style="display: flex;">
                <div class="button button_gray" onclick="$('.popup:first').remove();" style="margin:0 auto;">
                    ${locale['cancel']}
                </div>
                <div class="button" onclick="$('.popup').remove();" style="margin:0 auto;">
                    ${locale['delete']}
                </div>
            </div>
        </div>
    </div>`);
        return false;
    }
    $('.popup:first').remove();
}