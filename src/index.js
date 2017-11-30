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
			this.plays = [ ]
		
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
			this.plays.push({
				player: this.turn,
				tile: tile
			})

			$(tile).addClass(this.turn);
			this.alternatePlayer();
			
			this.cpuPlay();
		}
	}
	
	cpuPlay() {
		if(this.pc == this.turn) {
			// available
				let available = $(".tile:not(.x):not(.o)")

			// get all possibilities
				var rows = [];
				for(let j of game.camadas) {
					for(let possibilidade of game.possibilidades.mesma_camada) {
						let row = [] 
						for(let i of possibilidade)   
							//row.push($("#p-" + j + "-" + i)[0])
							row.push("p-" + j + "-" + i)

						rows.push(row)
					}
				}

				for(let possibilidade of game.possibilidades.entre_camadas) {
					let row = []
					for(let i of possibilidade) {
						//row.push($("#p-" + i)[0])
						row.push("p-" + i)
					}
					rows.push(row)
				}

				




			//// get all wins
			//	let wins = [];

			//// get all looses
			//	let looses = [];


			// get all interferences based on the last play
				let interferences = []
				for(
					let row
					of rows
				) {
					for(
						let el
						of row
					) {
						if(el == this.plays[this.plays.length - 1].tile.id) {
							interferences.push(row)

							break;
						}
					}
				}

			// get all interferences available
				let available_interferences = []
				let ranking = []
				for(
					let row
					of interferences
				) {
					let count_interferences = 0;
					for(
						let tile
						of row
					) {
						for(
							let avl
							of available
						) {
							if(avl.id == tile) {
								available_interferences.push(tile)
								count_interferences++;
							}
						}
					}
					//console.log(count_interferences)
					ranking.push({
						interferences: count_interferences,
						row: row
					})
				}

			// ranking looses
				ranking.sort(function compare(a,b) {
					if(a.interferences == 0)
						return 999
					if (a.interferences < b.interferences)
						return -1;
					if (a.interferences > b.interferences)
						return 1;
					return 0;
				})
				console.log(JSON.stringify(ranking, true, 4))

			// get best plays
				let best_plays = [];
				for(
					let tile
					of ranking[0].row
				) {
					for(
						let avl
						of available
					) {
						if(avl.id == tile) {
							best_plays.push(tile)
						}
					}
				}
				
			let select_id = Math.floor(Math.random() * (best_plays.length - 1));
			let selected = document.querySelectorAll("#" + best_plays[select_id])[0]
			console.log(selected)
			if(selected == undefined){ 
				let select_id = Math.floor(Math.random() * (available_interferences.length - 1));
				selected = document.querySelectorAll("#" + available_interferences[select_id])[0]
			}
			this.executePlay(selected);
		}
	}

	resetBoard() {
		this.plays = [ ] 
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

var game = new TTT();
