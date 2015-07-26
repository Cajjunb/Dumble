<?php $id_usuario = strval($this->session->userdata('id_usuario')) ?>
    <script type="text/javascript" href="<?php echo base_url();?>assets/js/listar_usuarios_ajax.js"></script>
    <style type="text/css">
    modal-backdrop{
    	background-color: red;
    }
    </style>
<?php define("INDEX","index.php")?>
	<body id="wrap">
	<div class="row" style="margin:0px">
		<header class="template_usuario_header col-md-12">
			<div class="template_usuario_logo_header col-md-3">
				<span>
					<a href="<?php echo (base_url().INDEX."/usuario/visualizar_perfil/".$this->session->userdata('id_usuario')) ?>">
						DEIXA DICA
					</a>
				</span>
			</div>
			<div class="template_usuario_search col-md-6">
					<table class="col-md-12">
						<tr><td>
                                <?php echo form_open("usuario/listar_usuarios_cliente")?>
                                    <input placeholder="Procure seus amigos por aqui" class="col-md-12" name="pessoa" id="pessoa">
                                <?php echo form_close()?>
                                <!--<form onsubmit="ajaxCallListarUsuarios()" id="form_pessoa"><input class="col-md-12" name="pessoa" id="pessoa"></form>-->
                            </td>
                        </tr>
					</table>
			</div>
			<div class="template_usuario_icones col-md-2">
				<table>
					<tr>
						<td><a><img src=" <?php echo base_url();?>assets/img/notifications.png"></a></td>
						<td><a data-toggle="modal" data-target="#solicitacao_amizade" role="button" href="#">
								<img src="<?php echo base_url();?>assets/img/friends.png">
								<?php if($notificacao_amizade != 0){ ?>
								<span class="badge"><?php echo $notificacao_amizade ?></span><?php } ?>
							</a>
						</td>
						<td><a href="<?php echo base_url().INDEX.'/desejo/cadastro_desejo' ?>"><img src=" <?php echo base_url();?>assets/img/dicas.png"></a></td>
					</tr>
				</table>
			</div>
			<div class="template_usuario_menu col-md-2">
				<table>
					<tr>
						<td><span style="font-weight: bolder;"><?php echo $this->session->userdata('nome_usuario');?></span></td>
						<td><img src=" <?php echo base_url();?>assets/img/arrow.png"></td>
					</tr>
				</table>
				<span class="template_usuario_seta_branca"></span>
				<div class="template_usuario_caixa" style="  top: 60px;">
					<ul>
						<li><a class="col-md-12 popup_botao" href="<?php echo (base_url().INDEX."/usuario/visualizar_perfil/".$id_usuario) ?>"> Meu Perfil</a></li>
						
						<li><!-- OBRA!! -->
							<a class="col-md-12 popup_botao" data-toggle="modal" data-target="#editarperfil" href="#" role="button">Configurações</a>
						</li><!-- OBRA!! -->
						
						<li><a class="col-md-12 popup_botao" href="#" >Ajuda</a></li>
						<li><a class="col-md-12 popup_botao" href="<?php echo (base_url().INDEX."/login/deslogando_sistema") ?>">Logout</a></li>
					</ul>
				</div>
			</div>
		</header>
		<div class="template_usuario_faixa_esquerda">
		</div>
	</div>
	<script>
		function foto_input_typefile(el){
			var path = $(el).val();
			path = path.split("\\");
			path = path[2];
			$("#foto_1").next().text(path);
			check_file2();
		}
	</script>
<!--MODAL CONFIGURACOES-->
	<div id="editarperfil" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="editarPerfil" aria-hidden="true" aria-describedby="">
	  <div class="modal-dialog modal-lg">
	    <div class="modal-content popup_caixaConfiguracoes" >
		    <div class="container-fluid">
		    	<div class="row popup_tituloFundo">
		    		<div class="col-md-3 col-md-offset-1">
		      			<h1 class="popup_titulo"> CONFIGURAÇÕES</h1>
		      		</div>
		      	</div>
		      	<div class="col-md-6">
			    	<form action="<?php echo base_url();?>index.php/usuario/configurar_usuario" method="POST" enctype="multipart/form-data" onsubmit="">
			    		<input name="id_usuario" type="hidden" value="<?php echo $dados_perfil['id_usuario'] ?>">
				      	<div class="row"><!--nome Ncamisa -->
				      		<div class="col-md-5 col-md-offset-1">
				      			<br><span class="popup_texto">Nome</span><br>
				      			<input id="nome" name="nome" type="text" class="popup_input popup_inputLeft" value="<?php echo $dados_perfil['username'] ?>" required maxlength="20" onchange="validateName()">
				      			<br><span class="popup_texto">Email</span><br>
				      			<input id="email" name="email" type="email" class="popup_input popup_inputLeft" value="<?php echo $dados_perfil['email'] ?>" required maxlength="50" onchange="validateEmail()">
				      			<br><span class="popup_texto">Senha</span><br>
				      			<input id="senha" name="senha" type="password" class="popup_input popup_inputLeft" placeholder="Escreva aqui..." onchange="valida_senha()">
				      			<br><span class="popup_texto">Confirme sua senha...</span><br>
				      			<input id="senha2" name="senha2" type="password" class="popup_input popup_inputLeft" placeholder="Escreva aqui..." onchange="valida_senha()">
				      		</div>
				      		<div class="col-md-6">
				      			<br><span class="popup_texto">Número de camisa</span><br>
				      			<select name="nro_camisa" class="popup_input pop_inputRight">
				      				<option value=""></option>
				      				<option value="P">P</option>
				      				<option value="M">M</option>
				      				<option value="G">G</option>
				      				<option value="G">GG</option>
				      			</select>
				       			<br><span class="popup_texto">Número de calçado</span><br>
				       			<select name="nro_sapato" class="popup_input pop_inputRight">
				       				<option value=""></option>
				      				<option value="10">10</option>
				      				<option value="14">14</option>
				      				<option value="18">18</option>
				      				<option value="22">22</option>
				      			</select>
				      			<br><span class="popup_texto">Número de cinto</span><br>
				      			<select name="nro_camisaso" class="popup_input pop_inputRight">
				      				<option value=""></option>
				      				<option value="30">30</option>
				      				<option value="32">32</option>
				      				<option value="34">34</option>
				      				<option value="36">36</option>
				      			</select>
				      			<br><span class="popup_texto">Número da camisa social</span><br>
				      			<select name="nro_calca" class="popup_input pop_inputRight" >
				      				<option value=""></option>
				      				<option value="30">30</option>
				      				<option value="32">32</option>
				      				<option value="34">34</option>
				      				<option value="36">36</option>
				      			</select>
				      		</div>
				      	</div>
			      	</form>
		      		<div class="row popup_espacamento col-md-offset-1"><!--descricao -->
			      		<div class="col-md-12 ">
			      			<br><p class="popup_texto">Descrição pessoal</p>
			      			<textarea name="descricao" cols="46" rows="4" class="popup_input"><?php echo $dados_perfil['descricao'] ?></textarea>
			      		</div>
				      </div>
			      </div>
			      <div class="col-md-6">
			      		
				      	<div class="row popup_espacamento " style="  margin-top: 5%;"><!--imagens -->
				      		<div class="col-md-4">
				      			<a href="#" onclick="document.getElementById('foto_1').click()">
				      				<img src="<?php echo $dados_perfil['fotos']['foto1'] ?>" class="img-responsive popup_imagem">	
				      			</a>
				      			<input type="file" id="foto_1" name="foto1" accept="image/jpeg,image/jpg,image/png,image/bmp" onchange="foto_input_typefile(this);" style="display:none;">
				      			<span class="popup_file">Nenhuma Foto</span>
				      		</div>
				      		<div class="col-md-4">
				      			<a href="#" onclick="document.getElementById('foto_2').click()">
				      				<img src="<?php echo $dados_perfil['fotos']['foto2'] ?>" class="img-responsive popup_imagem">	
				      			</a>
				      			<input type="file" id="foto_2" name="foto2" accept="image/jpeg,image/jpg,image/png,image/bmp" onchange="check_file2()" style="display:none;">
				      			<span class="popup_file">Nenhuma Foto</span>
				      		</div>
				      		<div class="col-md-4">
				      			<a href="#" onclick="document.getElementById('foto_3').click()">
				      				<img src="<?php echo $dados_perfil['fotos']['foto3']?>" class="img-responsive popup_imagem">
				      			</a>
				      			<input type="file" id="foto_3" name="foto3" accept="image/jpeg,image/jpg,image/png,image/bmp" onchange="check_file2()" style="display:none;">
				      			<span class="popup_file">Nenhuma Foto</span>
				      		</div>	      			      		
				      	</div>
			      </div>
		      	<div class="popup_botoes row popup_espacamento"><!--botoes -->
		      		<div class="col-md-6">
		      			<button class="btn popup_botao1" type="submit" >Ok!</button>
		      		</div>
		      		<div class="col-md-6">
		      			<button class="btn popup_botao2" style="  border: 1px solid white;border-radius: 10px;"data-dismiss="modal">Cancelar</button>
		      		</div>
		      	</div>
		    	<div class="row" id="popup_footer">  
		    			
		    	</div>  

		    </div><!--CONTAINER-->

	    </div>

	  </div>

	</div>
<!--MODAL CONFIGURACOES-->
<!--MODAL SOLICITACAO DE AMIZADES -->
<div id="solicitacao_amizade" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
	    <div class="modal-content">
			<div class="container-fluid">
			    	<?php 
						if(empty($convites)){  
					?>
					    	<div class="row popup_caixaDeconteudo">
					    		<div class="col-md-4 popup_fundo1">	
				    			</div>
				    			<div class="col-md-8">
				    				<p class="popup_texto">Sua caixa esta vazia.</p>
			    				</div>
			    			</div>
					<?php 
						}else{   
							foreach ($convites as $convite): ?>

								<div class="row popup_caixaDeconteudo">

						    		<div class="col-md-4 popup_fundo1">	

 										<img src="<?php echo $convite->foto ?>" class="img-responsive popup_img" alt="Responsive image" style="margin-left:22%"> 											    		

					    			</div>

					    			<div class="col-md-8">

					    				<a href="<?php echo base_url().'index.php/usuario/visualizar_perfil/'.$convite->id_usuario; ?>" style="text-decoration:blink;"><?php echo $convite->nome ?>
					    				<p class="popup_texto">Solicitou sua amizade!</p></a>
					    				<div class="row">
					    					<div class="col-md-6">

												<a href="<?php echo base_url() . 'index.php/usuario/aceitar_amizade/'.$convite->id_usuario.'/invite'?>" style="text-decoration:blink;">Aceitar</a>

											</div>

											<div class="col-md-6">

												<a href="<?php echo base_url() . 'index.php/usuario/negar_amizade/'.$convite->id_usuario.'/invite'?>" style="text-decoration:blink;">Recusar</a>

											</div>

										</div>								

				    				</div>

				    			</div>

			    			<?php endforeach; ?>

			    	<?php	} ?>
			    	</div>
			    	</div>
			</div>

	</div>
	<div class="col-md-offset-1"id="content">
<!--MODAL SOLICITACAO DE AMIZADES -->