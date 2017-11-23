$(".spc_list li").each(function(){
        if($(this).hasClass("no")){
           $(this).click(function(){
               close($('#left_menu'));
            })
        }else{
            $(this).click(function(){
                open($('#left_menu'));
            })
        }
})