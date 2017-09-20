"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TTT = function () {
	function TTT() {
		_classCallCheck(this, TTT);

		this.views = ["result", "new-game", "game", "muppet", "who-starts"];

		// someday this little const can evolve into a beautiful function
		this.possibilidades = {
			mesma_camada: [
			// diagonal
			[0, 5, 10, 15], [3, 6, 9, 12],

			// horizontal
			[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],

			// vertical
			[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]],
			entre_camadas: [
			// vertical
			["0-0", "1-0", "2-0", "3-0"], ["0-1", "1-1", "2-1", "3-1"], ["0-2", "1-2", "2-2", "3-2"], ["0-3", "1-3", "2-3", "3-3"], ["0-4", "1-4", "2-4", "3-4"], ["0-5", "1-5", "2-5", "3-5"], ["0-6", "1-6", "2-6", "3-6"], ["0-7", "1-7", "2-7", "3-7"], ["0-8", "1-8", "2-8", "3-8"], ["0-9", "1-9", "2-9", "3-9"], ["0-10", "1-10", "2-10", "3-10"], ["0-11", "1-11", "2-11", "3-11"], ["0-12", "1-12", "2-12", "3-12"], ["0-13", "1-13", "2-13", "3-13"], ["0-14", "1-14", "2-14", "3-14"], ["0-15", "1-15", "2-15", "3-15"],

			// diagonal
			["0-0", "1-5", "2-10", "3-15"], ["0-3", "1-6", "2-9", "3-12"], ["0-12", "1-9", "2-6", "3-3"], ["0-15", "1-10", "2-5", "3-0"],

			// diagonal vertical
			["0-0", "1-1", "2-2", "3-3"], ["0-4", "1-5", "2-6", "3-7"], ["0-8", "1-9", "2-10", "3-11"], ["0-12", "1-13", "2-14", "3-15"],

			// diagonal horizontal
			["0-0", "1-4", "2-8", "3-12"], ["0-1", "1-5", "2-9", "3-13"], ["0-2", "1-6", "2-10", "3-14"], ["0-3", "1-7", "2-11", "3-15"]]
		};

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

	TTT.prototype.setView = function setView(view_name) {
		for (var _iterator = this.views, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
			var _ref;

			if (_isArray) {
				if (_i >= _iterator.length) break;
				_ref = _iterator[_i++];
			} else {
				_i = _iterator.next();
				if (_i.done) break;
				_ref = _i.value;
			}

			var view = _ref;

			$("#" + view).css("display", view == view_name ? "flex" : "none");
		}
	};

	TTT.prototype.alternatePlayer = function alternatePlayer() {
		this.turn = this.turns[this.turn];

		$("#game").removeClass("x-turn o-turn");
		$("#game").addClass(this.turn + "-turn");
	};

	TTT.prototype.executePlay = function executePlay(tile) {
		if (tile != null) {
			$(tile).addClass(this.turn);
			this.alternatePlayer();

			this.cpuPlay();
		}
	};

	TTT.prototype.cpuPlay = function cpuPlay() {
		if (this.pc == this.turn) {
			var available = $(".tile:not(.x):not(.o)");

			var select_id = Math.floor(Math.random() * (available.length - 1));
			var selected = available.eq(select_id);
			this.executePlay(selected);
		}
	};

	TTT.prototype.resetBoard = function resetBoard() {
		$(".tile").removeClass("o x");
		$("#game").removeClass("x-trun o-turn");
		$("#game").addClass(this.turn + "-turn");
	};

	TTT.prototype.setEvents = function setEvents() {
		var ttt = this;

		// New game
		$("#pvc, #pvp").on("click", function () {
			if ($(this).attr("id") == "pvc") ttt.vs_cpu = true;else ttt.vs_cpu = false;
			ttt.setView("who-starts");
		});

		// Calc result
		$(".tile").on("click", function () {
			ttt.executePlay(this);
			var resultado = ttt.valida();
			if (resultado != null) ttt.displayWinner(resultado);
			//ttt.displayWinner(ttt.valida());
		});

		// Go back
		$(".goback").on("click", function () {
			ttt.setView("new-game");
		});

		// who starts
		$("#who-starts button").on("click", function () {
			if ($(this).hasClass("o")) ttt.turn = "o";else ttt.turn = "x";

			if (ttt.vs_cpu) ttt.pc = ttt.turns[ttt.turn];else ttt.pc = null;

			ttt.resetBoard();
			ttt.setView("game");
		});
	};

	TTT.prototype.displayWinner = function displayWinner(resultado) {
		//console.log(resultado);
		if (resultado != null) {
			if (resultado == "tie") $('#result>.content>h3').html("It's a tie.");else $('#result>.content>h3').html(resultado.toUpperCase() + " wins!");

			this.setView("result");
		}
	};

	TTT.prototype.valida = function valida() {
		for (var _iterator2 = this.players, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
			var _ref2;

			if (_isArray2) {
				if (_i2 >= _iterator2.length) break;
				_ref2 = _iterator2[_i2++];
			} else {
				_i2 = _iterator2.next();
				if (_i2.done) break;
				_ref2 = _i2.value;
			}

			var player = _ref2;

			// same layer
			for (var _iterator3 = this.camadas, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
				var _ref3;

				if (_isArray3) {
					if (_i3 >= _iterator3.length) break;
					_ref3 = _iterator3[_i3++];
				} else {
					_i3 = _iterator3.next();
					if (_i3.done) break;
					_ref3 = _i3.value;
				}

				var j = _ref3;

				for (var _iterator5 = this.possibilidades.mesma_camada, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
					var _ref5;

					if (_isArray5) {
						if (_i5 >= _iterator5.length) break;
						_ref5 = _iterator5[_i5++];
					} else {
						_i5 = _iterator5.next();
						if (_i5.done) break;
						_ref5 = _i5.value;
					}

					var possibilidade = _ref5;

					var match = true;
					for (var _iterator6 = possibilidade, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
						var _ref6;

						if (_isArray6) {
							if (_i6 >= _iterator6.length) break;
							_ref6 = _iterator6[_i6++];
						} else {
							_i6 = _iterator6.next();
							if (_i6.done) break;
							_ref6 = _i6.value;
						}

						var i = _ref6;

						if (!$("#p-" + j + "-" + i).hasClass(player)) match = false;
					}if (match) return player;
				}
			}

			// between layers
			for (var _iterator4 = this.possibilidades.entre_camadas, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
				var _ref4;

				if (_isArray4) {
					if (_i4 >= _iterator4.length) break;
					_ref4 = _iterator4[_i4++];
				} else {
					_i4 = _iterator4.next();
					if (_i4.done) break;
					_ref4 = _i4.value;
				}

				var possibilidade = _ref4;

				var match = true;
				var match_666 = true;

				for (var _iterator7 = possibilidade, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
					var _ref7;

					if (_isArray7) {
						if (_i7 >= _iterator7.length) break;
						_ref7 = _iterator7[_i7++];
					} else {
						_i7 = _iterator7.next();
						if (_i7.done) break;
						_ref7 = _i7.value;
					}

					var i = _ref7;

					if (!$("#p-" + i).hasClass(player)) match = false;

					if (!i.includes("-6")) match_666 = false;
				}

				if (match) {
					if (match_666) {
						this.showMuppet(true);
						return null;
					}

					return player;
				}
			}
		}

		// if all checked and no result, return tie
		var tie = true;
		$(".tile").each(function () {
			if (!$(this).hasClass("o") && !$(this).hasClass("x")) tie = false;
		});
		if (tie) this.displayWinner("tie");

		return null;
	};

	TTT.prototype.showMuppet = function showMuppet(match_666) {
		var _this = this;

		if (match_666) {
			(function () {
				_this.setView("muppet");

				$("#muppet").unbind("click");
				var ttt = _this;

				$("#muppet").on("click", function () {
					ttt.alternatePlayer();
					ttt.setView("game");

					ttt.displayWinner(ttt.turn);
				});
			})();
		}
	};

	return TTT;
}();

new TTT();