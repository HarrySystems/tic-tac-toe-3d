class TTT {
	constructor() {
		this.views = [
			"result",
			"new-game",
			"game",
			"muppet",
			"who-starts"
		]
		
		// someday this little const can evolve into a beautiful function
			this.possibilidades = {
				mesma_camada: [
					// diagonal
					[0, 5, 10, 15],
					[3, 6,  9, 12],

					// horizontal
					[0,  1,   2,  3],
					[4,  5,   6,  7],
					[8,  9,  10, 11],
					[12, 13, 14, 15],

					// vertical
					[0,  4,  8, 12],
					[1,  5,  9, 13],
					[2,  6, 10, 14],
					[3,  7, 11, 15],
				],
				entre_camadas: [
					// vertical
					["0-0", "1-0", "2-0",  "3-0"],
					["0-1", "1-1", "2-1",  "3-1"],
					["0-2", "1-2", "2-2",  "3-2"],
					["0-3", "1-3", "2-3",  "3-3"],
					["0-4", "1-4", "2-4",  "3-4"],
					["0-5", "1-5", "2-5",  "3-5"],
					["0-6", "1-6", "2-6",  "3-6"],
					["0-7", "1-7", "2-7",  "3-7"],
					["0-8", "1-8", "2-8",  "3-8"],
					["0-9", "1-9", "2-9",  "3-9"],
					["0-10","1-10","2-10","3-10"],
					["0-11","1-11","2-11","3-11"],
					["0-12","1-12","2-12","3-12"],
					["0-13","1-13","2-13","3-13"],
					["0-14","1-14","2-14","3-14"],
					["0-15","1-15","2-15","3-15"],

					// diagonal
					["0-0",   "1-5", "2-10",  "3-15"],
					["0-3",   "1-6",  "2-9",  "3-12"],
					["0-12",  "1-9",  "2-6",   "3-3"],
					["0-15",  "1-10", "2-5",   "3-0"],

					// diagonal vertical
					["0-0", "1-1", "2-2", "3-3"],
					["0-4", "1-5", "2-6", "3-7"],
					["0-8", "1-9", "2-10", "3-11"],
					["0-12", "1-13", "2-14", "3-15"],

					// diagonal horizontal
					["0-0", "1-4",  "2-8", "3-12"],
					["0-1", "1-5",  "2-9", "3-13"],
					["0-2", "1-6", "2-10", "3-14"],
					["0-3", "1-7", "2-11", "3-15"]
				]
			}

			//this.players = {
			//	"x": "o", 
			//	"o": "x"
			//};
			this.turns = {
				"x": "o",
				"o": "x"
			};
		
			this.players = ["o", "x"];

			this.camadas = [0, 1, 2, 3];
		
			this.pc = null;
			this.vs_cpu = false;
		
		this.setEvents();
		//this.setView("who-starts");
	}

	setView(view_name) {
		for(let view of this.views)
			$("#" + view).css(
				"display",
				(view == view_name ? "flex" : "none")
			)
	}
	
	alternatePlayer() {
		this.turn = this.turns[this.turn];
		
		$("#game").removeClass("x-turn o-turn");
		$("#game").addClass(this.turn + "-turn");
	}
	
	executePlay(tile) {
		if(tile != null)
		{
			$(tile).addClass(this.turn);
			this.alternatePlayer();
			
			this.cpuPlay();
		}
	}
	
	cpuPlay() {
		if(this.pc == this.turn) {
			let available = $(".tile:not(.x):not(.o)")

			let select_id = Math.floor(Math.random() * (available.length - 1));
			let selected = available.eq(select_id)	
			this.executePlay(selected);
		}
	}

	resetBoard() {
		$(".tile").removeClass("o x");
		$("#game").removeClass("x-trun o-turn");
		$("#game").addClass(this.turn + "-turn");
	}
	
	setEvents() {
		let ttt = this;
		
		// New game
			$("#pvc, #pvp").on("click", function() {
				if($(this).attr("id") == "pvc")
					ttt.vs_cpu = true;
				else
					ttt.vs_cpu = false;
				ttt.setView("who-starts");
			});

		// Calc result
			$(".tile").on("click", function() {
				ttt.executePlay(this);
				let resultado = ttt.valida();
				if(resultado != null)
					ttt.displayWinner(resultado);
				//ttt.displayWinner(ttt.valida());
			});


		// Go back
			$(".goback").on("click", () => {
				ttt.setView("new-game")
			});
		
		// who starts
			$("#who-starts button").on("click", function () {
				if($(this).hasClass("o"))
					ttt.turn = "o";	
				else
					ttt.turn = "x";
					
				if(ttt.vs_cpu)
					ttt.pc = ttt.turns[ttt.turn];
				else
					ttt.pc = null;
					
				
				ttt.resetBoard();
				ttt.setView("game");
			})
	}

	displayWinner(resultado) {
		//console.log(resultado);
		if(resultado != null) {
			if(resultado == "tie")
				$('#result>.content>h3').html("It's a tie.")
			else
				$('#result>.content>h3').html(resultado.toUpperCase() + " wins!")

			this.setView("result");
		}
	}
	
	valida() {
		for(let player of this.players) {
			// same layer
			for(let j of this.camadas) {
				for(let possibilidade of this.possibilidades.mesma_camada) {
					let match = true;
					for(let i of possibilidade)	
						if(!$("#p-" + j + "-" + i).hasClass(player))
							match = false;
					
					if(match)
						return player;
				}
			}

			// between layers
			for(let possibilidade of this.possibilidades.entre_camadas) {
				let match = true;
				let	match_666 = true;
				
				for(let i of possibilidade) {
					if(!$("#p-" + i).hasClass(player))
						match = false;
					
					if(!i.includes("-6"))
						match_666 = false;
				}
				
				if(match) {
					if(match_666)
					{
						this.showMuppet(true);
						return null;
					}
					
					return player;
				}
			}
		}

		// if all checked and no result, return tie
			var tie = true;
			$(".tile").each(function() {
				if(!$(this).hasClass("o") && !$(this).hasClass("x"))
					tie = false;
			})
			if(tie)
				this.displayWinner("tie");
		
		return null;
	}
	
	showMuppet(match_666) {
		if(match_666) {
			this.setView("muppet");

			$("#muppet").unbind("click");
			let ttt = this;
			
			$("#muppet").on("click", function() {
				ttt.alternatePlayer();
				ttt.setView("game");
				
				ttt.displayWinner(ttt.turn);
			})
		}
	}
}

new TTT();