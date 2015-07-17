$(document).scroll(verificasecarregamais);

$(document).ready(function(){
    get_products_ajax();
});

function verificasecarregamais(){
    var scrollAmount = $(window).scrollTop();
    var windowHeight = $(window).height();
    var documentHeight = $(document).height() + $('#content_listagem_modelos').height() ;
    if(scrollAmount + windowHeight >= (documentHeight- 700)){
        desejo_ajax_mostra_carregando();
        var filtro = $('#filtro_nome').val();
        if( filtro.length > 0){
            get_products_ajax_query(filtro);
        }
        else{
            get_products_ajax();
        }
    }
}


function desejo_ajax_mostra_carregando(){
    var div_carregando = "<div id='desejo_ajax_carregando' style='position:fixed;bottom: 50px;padding-left: 45%;'><h1 style='font-family:bebasNeue;font-size: 30px;color: #f5882e;'>Carregando...</h1></div>";
    $("#wrap").append(div_carregando);
    $("#desejo_ajax_carregando").animate({
        opacity: 0
      }, 2000, function() {
        $('div#desejo_ajax_carregando').remove();
      });

}

function get_products_ajax(){
    var url = base_url_js;
    var offset = 0;
    if($(".div_desejo").length!=0){
        offset = $(".div_desejo").length;
    }
    $.ajax({
        url : url+'index.php/modelo/retorna_desejos_AJAX',
        type : 'POST',
        data: {'offset':offset},
        success: function(data){
            var result = JSON.parse(data);
            draw_all_columns(result);
            $(".div_desejo_descricao_texto").mCustomScrollbar();
        },
        error: function(){
            error_loadmodels();
        }
    });
}

function get_products_ajax_query(query){
    var url = base_url_js;
    var offset = 0;
    if($(".div_desejo").length!=0){
        offset = $(".div_desejo").length;
    }
    $.ajax({
        url : url+'index.php/modelo/retorna_desejos_AJAX',
        type : 'POST',
        data: { 'offset':offset,
                'filtro':query},
        success: function(data){
            var result = JSON.parse(data);
            draw_all_columns(result);
            $(".div_desejo_descricao_texto").mCustomScrollbar();
        },
        error: function(){
            error_loadmodels();
        }
    });
}

function error_loadmodels(){
    swal("Ops...", "Não foi possível carregar os produtos. Tente novamente mais tarde.", "error");
}

function draw_all_columns(dados){
    var desejos_atuais = $(".div_desejo").length;
    if(desejos_atuais%3 == 1){
        draw_secondcolumn(dados);
        draw_thirdcolumn(dados);
        draw_firstcolumn(dados);
    } else if(desejos_atuais%3 == 2){
        draw_thirdcolumn(dados);
        draw_firstcolumn(dados);
        draw_secondcolumn(dados);
    } else {
        draw_firstcolumn(dados);
        draw_secondcolumn(dados);
        draw_thirdcolumn(dados);
    }
}

function draw_firstcolumn(dados){
    var url = base_url_js;
    url = url+'assets/img/user_images/';
    var dados_size = dados.length;
    var old_products = $(".coluna_desejos_1").children(".div_desejo").length;
    var current = 0;
    while(current<dados_size){
        $(".coluna_desejos_1").append("<div class='div_desejo' id='cl_1target_DD"+(current+old_products)+"'></div>");
        $("#cl_1target_DD"+(current+old_products)).append("<div class='div_desejo_imagem' id='cl_1target_DDM"+(current+old_products)+"'></div>");
        var product_image = "<img class='div_desejo_imagem_img' src='"+dados[current]['foto']+"'>";
        $("#cl_1target_DDM"+(current+old_products)).append(product_image);
        var produto_nome_display = '<span id="produto_nome">'+dados[current]['nome_produto']+'</span>';
        if(dados[current]['nome_produto'].length>7){
            produto_nome_display = dados[current]['nome_produto'];
            produto_nome_display = '<span id="produto_nome">'+produto_nome_display+'</span>';
        }
        var categoria_nome_display = '<span id="categoria_nome">'+dados[current]['nome_categoria']+'</span>';
        if(dados[current]['nome_categoria'].length>7){
            categoria_nome_display = dados[current]['nome_categoria'];
            categoria_nome_display = '<span id="categoria_nome">'+categoria_nome_display+'</span>';
        }
        var legenda_desejo = "<div class='div_desejo_imagem_legenda'><span class=" +
            "'div_desejo_legenda_texto'>"+produto_nome_display+' / '+categoria_nome_display+"</span></div>";
        $("#cl_1target_DDM"+(current+old_products)).append(legenda_desejo);
        /* DIV DAS INFORMAÇÕES DO DESEJOS */
        var fornecedor_foto_own = dados[current]['fornecedor_foto'];
        if(fornecedor_foto_own=='no'){
            fornecedor_foto_own = 'default_user.png';
        }
        $("#cl_1target_DD"+(current+old_products)).append("<div style='height:110px' id='cl_1infotarget_D"+(current+old_products)+"'></div");
        var imagem_fornecedor = "<div style='background-color:#979797;width:38%;height:100%;padding:10px;float:left;'>" +
            "<img src='"+url+fornecedor_foto_own+"' style='width:100%;height:100%;'></div>";
        $("#cl_1infotarget_D"+(current+old_products)).append(imagem_fornecedor);
        /* Informações do modelo */
        var div_info_modelos = "<div id='cl_1_target_Minfo_"+(current+old_products)+"' style='margin-left:-1.1%;width:148px;height:100%;float:right;'></div>";
        $("#cl_1infotarget_D"+(current+old_products)).append(div_info_modelos);
        var nome_modelo_info_display = dados[current]['nome_modelo'];
        if(dados[current]['nome_modelo'].length>15){
            nome_modelo_info_display = dados[current]['nome_modelo'].substring(0, 14);
            nome_modelo_info_display = nome_modelo_info_display+'...';
        }
        var nome_produto_info = "<div class='div_desejo_legenda_nomeproduto'><span>"+nome_modelo_info_display+"</span></div>";
        $("#cl_1_target_Minfo_"+(current+old_products)).append(nome_produto_info);
        var nome_fornecedor_info_display = dados[current]['nome_fornecedor'];
        if(dados[current]['nome_fornecedor'].length>15){
            nome_fornecedor_info_display = dados[current]['nome_fornecedor'].substring(0, 14);
            nome_fornecedor_info_display = nome_fornecedor_info_display+'...';
        }
        var nome_fornecedor_info = "<div class='div_desejo_legenda_nomefornecedor'><span>"+nome_fornecedor_info_display+"</span></div>";
        $("#cl_1_target_Minfo_"+(current+old_products)).append(nome_fornecedor_info);
        var button_euquero = "<div class='div_desejo_legenda_comprardesejo' onclick='cadastra_desejo(this)'><span>Eu quero!</span></div>";
        $("#cl_1_target_Minfo_"+(current+old_products)).append(button_euquero);
        //var button_registerproduto = "<div class='div_desejo_produtosbuttonbuy' onclick='add_product_ajax("+dados[current]['produto_id']+","+dados[current]['id_categoria']+","+dados[current]['fk_fornecedor']+")'>Adicionar produto aos desejos</div>";
        //$("#cl_1target_DD"+(current+old_products)).append(button_registerproduto);
        var descricao_modelo_display = "<div class='mCustomScrollbar div_desejo_descricao_texto' data-mcs-theme='dark'>"+dados[current]['descricao']+"</div>";
        $("#cl_1target_DD"+(current+old_products)).append(descricao_modelo_display);
        $("#cl_1target_DD"+(current+old_products)).append("<input type='hidden' class='info_product_js' id='cl1_srsinfo_PRO"+(current+old_products)+"'>");
        $("#cl1_srsinfo_PRO"+(current+old_products)).attr('data-id-fornecedor', dados[current]['fk_fornecedor']);
        $("#cl1_srsinfo_PRO"+(current+old_products)).attr('data-id-categoria', dados[current]['id_categoria']);
        $("#cl1_srsinfo_PRO"+(current+old_products)).attr('data-id-produto', dados[current]['produto_id']);
        $("#cl1_srsinfo_PRO"+(current+old_products)).attr('data-id-modelo', dados[current]['id_modelo']);
        current+=3;
    }
}

function draw_thirdcolumn(dados){
    var url = base_url_js;
    url = url+'assets/img/user_images/';
    var dados_size = dados.length;
    var old_products = $("#coluna_3").children(".div_desejo").length;
    var current = 2;
    while(current<dados_size){
        $("#coluna_3").append("<div class='div_desejo' id='cl3target_DD"+(current+old_products)+"'></div>");
        $("#cl3target_DD"+(current+old_products)).append("<div class='div_desejo_imagem' id='cl3target_DDM"+(current+old_products)+"'></div>");
        var product_image = "<img class='div_desejo_imagem_img' src='"+dados[current]['foto']+"'>";
        $("#cl3target_DDM"+(current+old_products)).append(product_image);
        var produto_nome_display = '<span id="produto_nome">'+dados[current]['nome_produto']+'</span>';
        if(dados[current]['nome_produto'].length>7){
            produto_nome_display = dados[current]['nome_produto'];
            produto_nome_display = '<span id="produto_nome">'+produto_nome_display+'</span>';
        }
        var categoria_nome_display = '<span id="categoria_nome">'+dados[current]['nome_categoria']+'</span>';
        if(dados[current]['nome_categoria'].length>7){
            categoria_nome_display = dados[current]['nome_categoria'];
            categoria_nome_display = '<span id="categoria_nome">'+categoria_nome_display+'</span>';
        }
        var legenda_desejo = "<div class='div_desejo_imagem_legenda'><span class=" +
            "'div_desejo_legenda_texto'>"+produto_nome_display+' / '+categoria_nome_display+"</span></div>";
        $("#cl3target_DDM"+(current+old_products)).append(legenda_desejo);
        /* DIV DAS INFORMAÇÕES DO DESEJOS */
        $("#cl3target_DD"+(current+old_products)).append("<div style='height:110px' id='cl3infotarget_D"+(current+old_products)+"'></div");
        var imagem_fornecedor = "<div style='background-color:#979797;width:38%;height:100%;padding:10px;float:left;'>" +
            "<img src='"+url+dados[current]['fornecedor_foto']+"' style='width:100%;height:100%;'></div>";
        $("#cl3infotarget_D"+(current+old_products)).append(imagem_fornecedor);
        /* Informações do modelo */
        var div_info_modelos = "<div id='cl3_target_Minfo_"+(current+old_products)+"' style='margin-left:-1.1%;width:148px;height:100%;float:right;'></div>";
        $("#cl3infotarget_D"+(current+old_products)).append(div_info_modelos);
        var nome_modelo_info_display = dados[current]['nome_modelo'];
        if(dados[current]['nome_modelo'].length>15){
            nome_modelo_info_display = dados[current]['nome_modelo'].substring(0, 14);
            nome_modelo_info_display = nome_modelo_info_display+'...';
        }
        var nome_produto_info = "<div class='div_desejo_legenda_nomeproduto'><span>"+nome_modelo_info_display+"</span></div>";
        $("#cl3_target_Minfo_"+(current+old_products)).append(nome_produto_info);
        var nome_fornecedor_info_display = dados[current]['nome_fornecedor'];
        if(dados[current]['nome_fornecedor'].length>15){
            nome_fornecedor_info_display = dados[current]['nome_fornecedor'].substring(0, 14);
            nome_fornecedor_info_display = nome_fornecedor_info_display+'...';
        }
        var nome_fornecedor_info = "<div class='div_desejo_legenda_nomefornecedor'><span>"+nome_fornecedor_info_display+"</span></div>";
        $("#cl3_target_Minfo_"+(current+old_products)).append(nome_fornecedor_info);
        var button_euquero = "<div class='div_desejo_legenda_comprardesejo' onclick='cadastra_desejo(this)'><span>Eu quero!</span></div>";
        $("#cl3_target_Minfo_"+(current+old_products)).append(button_euquero);
        //var button_registerproduto = "<div class='div_desejo_produtosbuttonbuy' onclick='add_product_ajax("+dados[current]['produto_id']+","+dados[current]['id_categoria']+","+dados[current]['fk_fornecedor']+")'>Adicionar produto aos desejos</div>";
        //$("#cl3target_DD"+(current+old_products)).append(button_registerproduto);
        var descricao_modelo_display = "<div class='mCustomScrollbar div_desejo_descricao_texto' data-mcs-theme='dark'>"+dados[current]['descricao']+"</div>";
        $("#cl3target_DD"+(current+old_products)).append(descricao_modelo_display);
        $("#cl3target_DD"+(current+old_products)).append("<input type='hidden' class='info_product_js' id='cl3_srsinfo_PRO"+(current+old_products)+"'>");
        $("#cl3_srsinfo_PRO"+(current+old_products)).attr('data-id-fornecedor', dados[current]['fk_fornecedor']);
        $("#cl3_srsinfo_PRO"+(current+old_products)).attr('data-id-categoria', dados[current]['id_categoria']);
        $("#cl3_srsinfo_PRO"+(current+old_products)).attr('data-id-produto', dados[current]['produto_id']);
        $("#cl3_srsinfo_PRO"+(current+old_products)).attr('data-id-modelo', dados[current]['id_modelo']);
        current+=3;
    }
}

function draw_secondcolumn(dados){
    var url = base_url_js;
    url = url+'assets/img/user_images/';
    var dados_size = dados.length;
    var old_products = $("#coluna_2").children(".div_desejo").length;
    var current = 1;
    while(current<dados_size){
        $("#coluna_2").append("<div class='div_desejo' id='cl2target_DD"+(current+old_products)+"'></div>");
        $("#cl2target_DD"+(current+old_products)).append("<div class='div_desejo_imagem' id='cl2target_DDM"+(current+old_products)+"'></div>");
        var product_image = "<img class='div_desejo_imagem_img' src='"+dados[current]['foto']+"'>";
        $("#cl2target_DDM"+(current+old_products)).append(product_image);
        var produto_nome_display = '<span id="produto_nome">'+dados[current]['nome_produto']+'</span>';
        if(dados[current]['nome_produto'].length>7){
            produto_nome_display = dados[current]['nome_produto'];
            produto_nome_display = '<span id="produto_nome">'+produto_nome_display+'</span>';
        }
        var categoria_nome_display = '<span id="categoria_nome">'+dados[current]['nome_categoria']+'</span>';
        if(dados[current]['nome_categoria'].length>7){
            categoria_nome_display = dados[current]['nome_categoria'];
            categoria_nome_display = '<span id="categoria_nome">'+categoria_nome_display+'</span>';
        }
        var legenda_desejo = "<div class='div_desejo_imagem_legenda'><span class=" +
            "'div_desejo_legenda_texto'>"+produto_nome_display+' / '+categoria_nome_display+"</span></div>";
        $("#cl2target_DDM"+(current+old_products)).append(legenda_desejo);
        /* DIV DAS INFORMAÇÕES DO DESEJOS */
        $("#cl2target_DD"+(current+old_products)).append("<div style='height:110px' id='cl2infotarget_D"+(current+old_products)+"'></div");
        var imagem_fornecedor = "<div style='background-color:#979797;width:38%;height:100%;padding:10px;float:left;'>" +
            "<img src='"+url+dados[current]['fornecedor_foto']+"' style='width:100%;height:100%;'></div>";
        $("#cl2infotarget_D"+(current+old_products)).append(imagem_fornecedor);
        /* Informações do modelo */
        var div_info_modelos = "<div id='cl2_target_Minfo_"+(current+old_products)+"' style='margin-left:-1.1%;width:148px;height:100%;float:right;'></div>";
        $("#cl2infotarget_D"+(current+old_products)).append(div_info_modelos);
        var nome_modelo_info_display = dados[current]['nome_modelo'];
        if(dados[current]['nome_modelo'].length>15){
            nome_modelo_info_display = dados[current]['nome_modelo'].substring(0, 14);
            nome_modelo_info_display = nome_modelo_info_display+'...';
        }
        var nome_produto_info = "<div class='div_desejo_legenda_nomeproduto'><span>"+nome_modelo_info_display+"</span></div>";
        $("#cl2_target_Minfo_"+(current+old_products)).append(nome_produto_info);
        var nome_fornecedor_info_display = dados[current]['nome_fornecedor'];
        if(dados[current]['nome_fornecedor'].length>15){
            nome_fornecedor_info_display = dados[current]['nome_fornecedor'].substring(0, 14);
            nome_fornecedor_info_display = nome_fornecedor_info_display+'...';
        }
        var nome_fornecedor_info = "<div class='div_desejo_legenda_nomefornecedor'><span>"+nome_fornecedor_info_display+"</span></div>";
        $("#cl2_target_Minfo_"+(current+old_products)).append(nome_fornecedor_info);
        var button_euquero = "<div class='div_desejo_legenda_comprardesejo' onclick='cadastra_desejo(this)'><span>Eu quero!</span></div>";
        $("#cl2_target_Minfo_"+(current+old_products)).append(button_euquero);
        //var button_registerproduto = "<div class='div_desejo_produtosbuttonbuy' onclick='add_product_ajax("+dados[current]['produto_id']+","+dados[current]['id_categoria']+","+dados[current]['fk_fornecedor']+")'>Adicionar produto aos desejos</div>";
        //$("#cl2target_DD"+(current+old_products)).append(button_registerproduto);
        var descricao_modelo_display = "<div class='mCustomScrollbar div_desejo_descricao_texto' data-mcs-theme='dark'>"+dados[current]['descricao']+"</div>";
        $("#cl2target_DD"+(current+old_products)).append(descricao_modelo_display);
        $("#cl2target_DD"+(current+old_products)).append("<input type='hidden' class='info_product_js' id='cl2_srsinfo_PRO"+(current+old_products)+"'>");
        $("#cl2_srsinfo_PRO"+(current+old_products)).attr('data-id-fornecedor', dados[current]['fk_fornecedor']);
        $("#cl2_srsinfo_PRO"+(current+old_products)).attr('data-id-categoria', dados[current]['id_categoria']);
        $("#cl2_srsinfo_PRO"+(current+old_products)).attr('data-id-produto', dados[current]['produto_id']);
        $("#cl2_srsinfo_PRO"+(current+old_products)).attr('data-id-modelo', dados[current]['id_modelo']);
        current+=3;
    }
}

function cadastra_desejo(component){
    var url = base_url_js;
    url = url+'index.php/desejo/cadastra_desejo_ajax';
    var temp = $(component).parent().parent().parent().find(".info_product_js");
    var div_desejo = $(component).parent().parent().parent();
    var id_fornecedor = temp.attr('data-id-fornecedor');
    var id_categoria = temp.attr('data-id-categoria');
    var id_produto = temp.attr('data-id-produto');
    var id_modelo = temp.attr('data-id-modelo');
    swal({
            title: "Cadastrar Desejo",
            text: "Você tem certeza que deseja adicionar aos seus desejos?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            closeOnConfirm: false
        },
        function(){
            $.ajax({
                url:url,
                type:'POST',
                data:{'id_fornecedor':id_fornecedor, 'id_categoria':id_categoria, 'id_produto':id_produto,
                    'id_modelo':id_modelo},
                'success':function(){
                    swal("Adicionado!", "O produto foi adicionado ao seus desejos!", "success");
                    div_desejo.remove();
                },
                'error':function(data){
                    swal("Ops...", "Operação não pôde ser completada. Tente novamente mais tarde", "error");
                }
            });
        });
}

function add_product_ajax(id_produto, id_categoria, id_fornecedor){
    var url = base_url_js;
    $.ajax({
        url: url+'index.php/desejo/cadastra_desejogenerico_ajax',
        type: 'POST',
        data: {'id_produto':id_produto, 'id_categoria':id_categoria, 'id_fornecedor':id_fornecedor},
        success: function(data){
            var result = JSON.parse(data);
            if(result=='scs_signup')
                swal("Sucesso!", "Você cadastrou essa categoria como desejo!", "success");
            else
                swal("Ops...", "Você já cadastrou essa categoria como desejo.", "warning");
        },
        error: function(data){
            console.log(JSON.stringify(data));
            swal("Ops...", "Você já cadastrou isso como um desejo.", "error");
        }
    });
}