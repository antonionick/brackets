module.exports = function check(str, bracketsConfig) {
	let brackets = new Brackets(bracketsConfig);
	return brackets.solution(str);
};

class Brackets {
	constructor(config = []) {
		this._correct = true;
		// _open array contents open brackets
		this._open = [];
		this._config = config;
	}

	solution(str) {
		// each element checks for an opening or closing bracket
		for (let i = 0; i < str.length; i++) {
			if (!this._correct) {
				break;
			}

			// check element is open or close bracket
			this._checkDependence(str[i]);
		}

		// if we checked each element and _open has elements, it's mistake
		if (this._open.length > 0) {
			this._correct = false;
		}

		return this._correct;
	}

	_checkDependence(bracket) {
		let is_open = true;
		let is_break = false;

		for (let i = 0; i < this._config.length; i++) {
			// if element of bracketsConfig isn't compare element of bracket which we check, continue
			if (this._config[i][0] !== bracket && this._config[i][1] !== bracket) {
				continue;
			}

			// if open and close brackets are same
			if (this._config[i][0] === this._config[i][1]) {
				[i, is_open, is_break] = this._checkSameConfig(i, is_open, is_break);
			}
			else {
				// if element of bracket which we check is close bracket
				if (this._config[i][1] === bracket) {
					this._correctClose(i);
					is_break = true;
					is_open = false;
				}
			}

			if (is_break) {
				i = this._config.length;
			}
		}

		// if bracket is open, add bracket in _open array
		if (is_open) {
			this._open.push(bracket);
		}
	}

	_checkSameConfig(i, is_open, is_break) {
		// if first element, break
		// else if the last element in _open is same with element of bracketsConfig, delete from _open and break
		if (this._open.length === 0) {
			is_break = true;
		}
		else if (this._open[this._open.length - 1] === this._config[i][0]) {
			is_break = true;
			is_open = false;
			this._open.pop();
		}

		return [i, is_open, is_break];
	}

	_correctClose(i) {
		// if _open isn't empty and opening brackets are different, mistake
		if (!this._open.length || this._config[i][0] !== this._open[this._open.length - 1]) {
			this._correct = false;
			return;
		}
		// else delete open bracket from _open and break
		this._open.pop();
	}
}
