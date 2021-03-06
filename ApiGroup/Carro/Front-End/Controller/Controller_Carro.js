class Controller_Carro{  
	constructor() {
		this.service = new APIService_Carro(); 
		this.service_modelo = new APIService_Modelo();
		this.service_versao = new APIService_Versao();
		this.service_cor = new APIService_Cor();
		this.table = new Table_Carro(this,"main");
		this.form = new Form_Carro(this,"main");
	} 

	init(){
		this.load_table();
	}

	load_form(){
		event.preventDefault();
		const self = this;

		self.service_modelo.read_item_all(
			function(modelo) 
			{ 
				self.service_versao.read_item_all(
					function(versao) 
					{ 
						self.service_cor.read_item_all(
							function(cor) 
							{ 
								self.form.montarForm(modelo,versao,cor); 
							}
						)
					}
				) 
			},
			function(statusCode) {
				console.log("Erro - status:",statusCode);
			}
		)

		

		

	}

	load_table(){
		const self = this;
		//definição da função que trata o buscar carro com sucesso
		const sucesso = function(carro){
			self.table.montarTabela(carro);
		}

		//definição da função que trata o erro ao buscar os carro
		const trataErro = function(statusCode) {
			console.log("Erro:",statusCode);
		}

		this.service.read_item_all(sucesso, trataErro);
	}

	limpar(event){
		event.preventDefault();
		this.form.limparFormulario();
		this.load_table();
	}
	
	salvar(event){        
		event.preventDefault();
		var carro = this.form.getDatacarro();        
		console.log("carro", carro);

		this.create_item(carro);

	}

	create_item(carro){
		const self = this;

		const sucesso = function(carro_Criado) {
			console.log("carro Criado",carro_Criado);
			self.load_table();
			self.form.limparFormulario();
		}

		const trataErro = function(statusCode) {
			console.log("Erro:",statusCode);
		}
				
		this.service.create_item(carro, sucesso, trataErro);    

	}

	delete_item(id, event){
		const self = this;
		this.service.delete_item_id(id, 
			//colocar direto a funcao no parametro
			//nao precisa criar a variavel ok e erro
			function() {
				self.load_table();
			},
			function(status) { 
				console.log(status);
			}
		);
	}

	read_item_id(id, event){
		event.preventDefault();             
		const self = this;


		const ok = function(carro){
			self.service_modelo.read_item_all(
                function(modelo) { 
                    self.service_versao.read_item_all(
						function(versao) 
						{ 
							self.service_cor.read_item_all(
								function(cor) 
								{ 
									self.form.montarForm(modelo,versao,cor,carro); 
								}
							)
						}
					) 
                }
            )
		}
		console.log('OK',ok);
		

		const erro = function(status){
			console.log(status);
		}

		this.service.read_item_id(id,ok,erro);   
	}

	update_item(id,event){
		event.preventDefault();
	
		let carro = this.form.getDatacarro();
		
		const self = this;

		this.service.update_item_id(id,carro, 
			function() {
				self.form.limparFormulario();
				self.load_table();
			},
			function(status) {
				console.log(status);
			} 
		);

	}

		
}
