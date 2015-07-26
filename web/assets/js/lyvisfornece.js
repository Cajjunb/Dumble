(function($){
    $(window).load(function(){
        $(".administrador_lista_fornecedores").mCustomScrollbar();
    });
})(jQuery);

$(document).ready(function(){
    $('.administrador_signup_link').click(showhide_cadastro);
    $('.administrador_cancelar_botao').click(showhide_cadastro);
    $('.administrador_row_upposboxlist').mouseenter(enterchange_color);
    $('.administrador_row_upposboxlist').mouseleave(leavechange_color);
    $('#link_fecharperfil').click(closeprofile_user);
    $('.administrador_icon_edit_contato').css('visibility', 'hidden');
});

function showhide_cadastro(){
    /* #################### FECHANDO OUTRAS JANELAS $$$$$$$$$$$ */
    $(".administrador_seta").css('display', 'none');
    $(".col-md-4.administrador_div_edituserdata").css('display', 'none');
    $("#user_profilename").css('display', 'none');
    $("#input_useremail").attr('disabled','disabled');
    $(".administrador_div_upposboxtitle2").css('display', 'none');
    $(".administrador_div_backgrounddiv2").css('display', 'none');
    $(".col-md-1.administrador_foto_newsignup").css('display', 'none');
    $(".administrador_seta").css("display", "none");
    /* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
    if($(".col-md-4.administrador_div_newsignup").css('display')=='none'){
        $(".administrador_seta").css("margin-top", "347%");
        $(".administrador_seta").css('display', 'block');
        $(".col-md-4.administrador_div_newsignup").css('display', 'block');
        $(".administrador_div_backgrounddiv2").css('display', 'block');
        $(".administrador_div_dwnposboxtitle1").css('display', 'block');
        $(".administrador_div_dwnposbox").css('display', 'block');
    } else {
        $(".administrador_seta").css('display', 'none');
        $(".col-md-4.administrador_div_newsignup").css('display', 'none');
        $(".administrador_div_dwnposboxtitle1").css('display', 'none');
        $(".administrador_div_dwnposbox").css('display', 'none');
    }
}

function closeprofile_user(){
    $(".administrador_seta").css('display', 'none');
    $("#user_profilename").css('display', 'none');
    $(".administrador_div_upposboxtitle2").css('display', 'none');
    $(".administrador_div_backgrounddiv2").css('display', 'none');
    $(".col-md-1.administrador_foto_newsignup").css('display', 'none');
    $(".col-md-4.administrador_div_edituserdata").css('display', 'none');
}

function enterprofile_user(componente){
    /* #################### FECHANDO OUTRAS JANELAS $$$$$$$$$$$ */
    $(".col-md-4.administrador_div_newsignup").css('display', 'none');
    $(".administrador_div_dwnposboxtitle1").css('display', 'none');
    $(".administrador_div_dwnposbox").css('display', 'none');
    $(".col-md-1.administrador_foto_newsignup").css('display', 'none');
    /* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
    $("#input_useremail").attr('disabled','disabled');
    /* Salvando algumas referências */
    var admin_editdata = $(".col-md-4.administrador_div_edituserdata");
    var foto_newsign = $(".col-md-1.administrador_foto_newsignup");
    /* ->> Verifica se é necessário fazer uma animação <<- */
    if(admin_editdata.css('display')!='block'){
        var admin_seta = $(".administrador_seta");
        var user_profile = $("#user_profilename");
        var upposboxtitle2 = $(".administrador_div_upposboxtitle2");
        var backgrounddiv2 = $(".administrador_div_backgrounddiv2");
        admin_seta.css('display', 'block');
        admin_seta.css("margin-top", "32.5%");
        admin_editdata.css('display', 'block');
        user_profile.css('display', 'block');
        upposboxtitle2.css('display', 'block');
        backgrounddiv2.css('display', 'block');
        foto_newsign.css('display', 'block');
        var w_admin_seta = admin_seta.outerWidth();
        // Zerando todos opacity
        admin_editdata.css('opacity', '0');
        user_profile.css('opacity', '0');
        upposboxtitle2.css('opacity', '0');
        backgrounddiv2.css('opacity', '0');
        foto_newsign.css('opacity', '0');
        /* ------> animações <---------------- */
        admin_seta.css('width', '0');
        admin_seta.animate({
            width: w_admin_seta,
            duration: 10
        });
        admin_editdata.animate({
            opacity: 1,
            duration: 150
        });
        user_profile.animate({
            opacity: 1,
            duration: 150
        });
        upposboxtitle2.animate({
            opacity: 1,
            duration: 150
        });
        backgrounddiv2.animate({
            opacity: 1,
            duration: 150
        });
        foto_newsign.animate({
            opacity: 1,
            duration: 150
        });
    }
    /* ------> fim <---------------- */
    foto_newsign.css('display', 'block');
    document.getElementById("user_profilename").textContent = componente.innerHTML.trim();
    var input_nome = document.getElementById("input_nomeforne");
    if(input_nome!=null)
        input_nome.value = componente.innerHTML.trim();
    nome_do_usuario = componente.innerHTML.trim();
    console.log(componente.getAttribute('data-email'));
    document.getElementById("input_useremail").value = componente.getAttribute('data-email');
    var url = base_url_js;
    url = url+'/assets/img/user_images/';
    var default_image = 'default_user.png';
    if(componente.getAttribute('data-image')=='no'){
        $("#foto_user_display").attr("src", url+default_image);
    } else {
        var custom_image = componente.getAttribute('data-image');
        $("#foto_user_display").attr("src", url+custom_image);
    }
    document.getElementById("input_idforne").value = componente.getAttribute('data-id');
}

function success_edit(){
    // Inicializa o sweetAlert. Se retirado dá erro no console.
    sweetAlertInitialize();
    swal("Sucesso!", "A edição foi efetuada com sucesso!", "success");
}

function error_edit(){
    // Inicializa o sweetAlert. Se retirado dá erro no console.
    swal("Ops...", "A edição não pode ser efetuada.", "warning");
}

function custom_error(custom_msg){
    // Inicializa o sweetAlert. Se retirado dá erro no console.
    swal("Ops...", custom_msg, "warning");
}

function enterchange_color(){
    $(this).css('background', 'white');
    $(this).find(':nth-child(1)').css('visibility', 'visible');
}

function leavechange_color(){
    $(this).css('background', '#dcdddf');
    $(this).find(':nth-child(1)').css('visibility', 'hidden');
}

function deletar_admin(id){
    swal({
        title: "Excluir registro",
        text: "Você tem certeza que deseja excluir o registro deste administrador?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
        closeOnConfirm: false
    },
    function(){
        var control = 'administrador/';
        var met = 'deletar_admin/';
        var url = base_url_js;
        url = url+'index.php/'+control+met+id;
        $.ajax({
            url:url,
            type:'GET',
            success:function(data){
                var result = JSON.parse(data);
                if(result.status=='TRUE'){
                    swal({
                        title: "Excluído!",
                        text: "O administrador foi excluído.",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#AEDEF4",
                        confirmButtonText: "OK",
                        closeOnConfirm: false
                    },
                    function(){
                        /* Poderia ter uma melhora e mudar somente os dados listados */
                        location.reload();
                    });
                } else {
                    swal("Ops...", "Esse administrador não pode ser excluído.", "error");
                }},
                'error':function(){
                    swal("Ops...", "Sua operação não pode ser realizada. Tente novamente mais tarde.", "error");
                }
            });
    });
}

function deletar_fornecedor(id){
    swal({
        title: "Excluir registro",
        text: "Você tem certeza que deseja excluir o registro deste fornecedor?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
        closeOnConfirm: false
    },
    function(){
        var control = 'fornecedor/';
        var met = 'deletar_fornecedor/';
        var url = base_url_js;
        url = url+'index.php/'+control+met+id;
        $.ajax({
            url:url,
            type:'GET',
            success:function(data){
                var result = JSON.parse(data);
                if(result.status=='TRUE'){
                swal({
                    title: "Excluído!",
                    text: "O fornecedor foi excluído.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#AEDEF4",
                    confirmButtonText: "OK",
                    closeOnConfirm: false
                },
                    function(){
                        /* Poderia ter uma melhora e mudar somente os dados listados */
                        location.reload();
                    });
            } else {
                    swal("Ops...", "Esse fornecedor não pode ser excluído.", "error");
                }},
            'error':function(){
                swal("Ops...", "Sua operação não pode ser realizada. Tente novamente mais tarde.", "error");
            }
        });
    });
}

$("#administrador_input_pesquisar").keyup(function(){
    var data = this.value;
    var rows = $(".administrador_table_upposboxlist").find("tr");
    if (this.value == "") {
        rows.show();
        return;
    }
    rows.hide();
    rows.filter(function (i, v) {
        var $t = $(this);
        var stringsFromRowNodes = $t.children("td:nth-child(n)")
        .text().toLowerCase();
        var searchText = data.toLowerCase();
        if(stringsFromRowNodes.contains(searchText)){
            return true;
        }
        return false;
    })
    .show();
});

function check_file(){
    var name_file = $("#foto_user_send").val();
    name_file = name_file.split(".");
    var extension = name_file.pop();
    switch(extension){
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'bmp':
            // do something!;
            break;
        default:
            swal("Extensão Incorreta!", "A foto só pode ser: .jpg, .jpeg, .png ou .bmp!", "error");
    }
}

function check_file2(){
    var name_file = $("#foto_user_send").val();
    name_file = name_file.split(".");
    var extension = name_file.pop();
    switch(extension){
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'bmp':
            document.getElementById("foto_user_form").submit();
            break;
        default:
            swal("Extensão Incorreta!", "A foto só pode ser: .jpg, .jpeg, .png ou .bmp!", "error");
            break;
    }
}

function openedit_admin_ownname(){
    $("#change_own_name2").css('display', 'none');
    // ->> Animaçao <<-
    var seta_admin = $("#arrow_ownprofile");
    seta_admin.css('top', '5px');
    var janela_cadastro = $("#change_own_name");
    if(janela_cadastro.css('display')!='block'){
        var w_seta_admin = seta_admin.outerWidth();
        var w_janela_cadastro = janela_cadastro.outerWidth();
        seta_admin.css('width', '0');
        janela_cadastro.css('width', '0');
        seta_admin.animate({
            width: w_seta_admin,
            duration: 5
        });
        janela_cadastro.animate({
            width: w_janela_cadastro,
            duration: 70
        });
        seta_admin.css('display', 'block');
        janela_cadastro.css('display', 'block');
    }
}

function openedit_admin_ownname2(){
    $("#change_own_name").css('display', 'none');
    // ->> Animaçao <<-
    var seta_admin = $("#arrow_ownprofile");
    seta_admin.css('top', '25px');
    var janela_cadastro = $("#change_own_name2");
    if(janela_cadastro.css('display')!='block'){
        var w_seta_admin = seta_admin.outerWidth();
        var w_janela_cadastro = janela_cadastro.outerWidth();
        seta_admin.css('width', '0');
        janela_cadastro.css('width', '0');
        seta_admin.animate({
            width: w_seta_admin,
            duration: 5
        });
        janela_cadastro.animate({
            width: w_janela_cadastro,
            duration: 70
        });
        seta_admin.css('display', 'block');
        janela_cadastro.css('display', 'block');
    }
}

function closeedit_admin_ownname(){
    var seta_admin = $("#arrow_ownprofile");
    var janela_cadastro = $("#change_own_name");
    seta_admin.css('display', 'none');
    janela_cadastro.css('display', 'none');
}

function closeedit_admin_ownname2(){
    var seta_admin = $("#arrow_ownprofile");
    var janela_cadastro = $("#change_own_name2");
    seta_admin.css('display', 'none');
    janela_cadastro.css('display', 'none');
}

function show_edit_formown(){
    var email_old = $("#user_email_old");
    var input_email = $("#input_email_old");
    var ok_bttn = $("#link_ok_emailchange");
    if(input_email.css('display')=='none'){
        email_old.css('display', 'none');
        input_email.css('display', 'inline-block');
        ok_bttn.css('display', 'inline-block');
    } else {
        email_old.css('display', 'inline-block');
        input_email.css('display', 'none');
        ok_bttn.css('display', 'none');
    }
}
