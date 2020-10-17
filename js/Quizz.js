let _answer_id = 0, _question_id = 0;
class Answer {
	constructor(answer, correct) {
		this._answer = answer;
		this._correct = !!correct;
		this._id = ++_answer_id;
	}
	
	get id() {
		return this._id;
	}
	get answer() {
		return this._answer;
	}
	/**
	  *	Returns true if the answer is correct otherwise false
	  *	@returns boolean
	*/
	get correct() {
		return this._correct;
	}
	set correct(bool) {
		this._correct = !!bool
	}
	
}

class Question {
	/**
	  * @param question string not null
	  * @param hint string optional 
	*/
	constructor(question, hint) {
		if (typeof question !== "string" && !question) {
			throw new Error("You passed an empty question.");
		}
		
		
		this._hint = hint || ""
		this._question = question;
		this._id = ++_question_id;
		this.reset();
	}
	
	/**
	 * resets the question
	 */ 
	reset() { 
		this._status = -1;
		this._answer = null;
	}
	
	/**
	 * Shuffle answers 
	 * @return this
	 */
	shuffle() {
		this._answers.sort(() => Math.random() - 0.5)
	}
	
	
	addAnswers(answers) {
		if (typeof answers != "object") {
			throw Error("You must add answers.");
		}
		const allAnswers = answers.every(a => a instanceof Answer);
		
		if (!allAnswers) {
			throw Error("You must add only answers with instance of Answer.");
		}
		
		const correct = answers.find(e => e.correct);
		if (correct === -1) {
			throw Error("You must have at least one correct answer.");
		}
		
		this._answers = answers;
		this._answer = null;
		return this;
	}
	get id() {
		return this._id;
	}
	get answers() {
		return this._answers;
	}
	get answer() {
		return this._answer;
	}
	
	/**
	 * Sets answer
	 *@return this
	 */
	set answer(answer_id) {
		let answer = this._answers.find(item => item.id == answer_id);
		if (answer) {
			this._status = answer.correct ? 1 : 0;
			this._answer = answer;
		}
		return this;
	}
	/**
	  * returns hint string 
	  * @return string
	  */
	get hint() {
		return this._hint;
	}
	/**
	 * Sets hint for the question
	 * @returns this
	 */
	set hint(str) {
		this._hint = str;
		return this;
	}
	/**
	 * questions string
	 * @return string
	 */
	get question() {
		return this._question;
	}
	/**
	 * Sets question 
	 * @return this
	 */
	set question(str) {
		this._question = question;
		return this;
	}
}

class Quizz {
	constructor() {
		this._questions = [];
		this.reset();
	}
	
	get totalQuestions() {
		return this._questions.length;
	}
	
	get totalLeftQuestions() {
		return this._questions.reduce(a,b => ((a.answer ? 0 : 1)+b), 0)
	}
	
	get totalAnsweredQuestions() {
		return this._questions.reduce(a,b => ((a.answer ? 1 : 0 )+b), 0)
	}
	
	get currentQuestion() {
		return this._currentQuestion+1;
	}
	
	next() {
		if (this.currentQuestion < this.totalQuestions) {
			this._currentQuestion++;
		}
		return this;
	}
	
	prev() {
		if (this.currentQuestion > 1) {
			this._currentQuestion--;
		}
		return this;
	}
	
	reset() {
		/*
		 * -1 - waiting
		 * 0 - wrong
		 * 1 - correct
		 */
		this._status = -1;
		this._currentQuestion = 0;
		this._questions.forEach(q => {
			q.reset();
		})
		return this;
	}
	
	
	addQuestion(question) {
		if (!question instanceof Question) {
			throw new Error("The question argument must be instance of Question.");
		}
		
		this._questions.push(question) 
	}
	
	get finished() {
		return this.status !== -1;
	}
	
	get status() {
		return this._status;
	}
	
	get question() {
		if (!this._questions[this._currentQuestion]) {
			throw Error("There is no question");
		}
		
		return this._questions[this._currentQuestion];
	}
	
}

function reset_quizzes() {
	quizzes.forEach(q => {
		q.reset();
	});
}


