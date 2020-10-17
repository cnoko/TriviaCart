/*
const wrongAnswers = ['wrong-answer-one', 'wrong-answer-two', 'wrong-answer-three'];
const speed = ['slow', 'fast', 'normal']
const getSpeed = (className) => {
  
  const ret = speed.find(el => className === el);
  
    if (ret) {
       return ret;
    }
  
  return 'slow'; 
};
*/
const questions = [];
function init() {
	const quizz = new Quizz();
	const q_a = [{
		question: "What is the capital of New York?",
		answers: ['New York City', 'Buffalo', 'Syracuse'],
		correct: "Albany",
		hint: "The capital is not the biggest city!"
	}, {
		question: "A or B",
		answers: ['A', 'B', 'C', 'D'],
		correct: 'G',
		hint: "ABCD"
	}, {
		question: "1 or 2",
		answers: [1,2,3,4],
		hint: '4 is not 5',
		correct: 6
	}];
	q_a.forEach(q => {
		const answers = [];
		q.answers.forEach(answer => {
			answers.push(new Answer(answer));
		});
		(() => {
			const answer = new Answer(q.correct);
			answer.correct = true;
			answers.push(answer);
		})();
		
		const question = new Question(q.question);
		question.hint = q.hint;
		question.addAnswers(answers);
		question.shuffle();
		quizz.addQuestion(question);
	});
	
	return quizz;
}
function toggleElements(hideClassNames, showClassNames) {
	const hideElements = {classNames: hideClassNames || [], func: 'fadeOut'},
		  showElements = {classNames: showClassNames || [], func: 'fadeIn'};
	[hideElements, showElements].forEach(obj => {
		obj.classNames.forEach(className => {
			$(`.${className}`)[obj.func](1000);
		});
	});
}
function getClassNamesToShow(answer) {
	if (answer) {
		if (answer.correct) {
			return ['smiley'];
		} else {
			return ['frown'];
		}
	} 
	return [];
}

function getClassNamesToHide(answer) {
	const items = ['hint'];
	if (answer) {
		if (answer.correct) {
			items.push('frown');
		} else {
			items.push('smiley');
			items.push('answered');
		}
	} else {
		items.push('frown');
		items.push('smiley');
	}
	return items;
}
function printQuestion(question, handleSelectAnswer) {
	/*
	const hideElements = ['hint'],
		  showElements = [];
	const hideDivs = [];
	
	if (question.answer) {
		if (question.answer.correct) {
			showElements.push('smiley');
			hideElements.push('frown');
		} else {
			showElements.push('frown');
			hideElements.push('smiley');
			hideElements.push('answered');
		}
	} 
	*/
	$('#answers').empty();
	
	$('.question-text').text(question.question);
	$('.hint-text').text(question.hint);
	question.answers.forEach((answer, index) => {
		  $div = $('<div></div>');
		  $div.addClass('answer').attr('key', answer.id)
				.css({backgroundColor: (index % 2) ? '#FFF' : '#edf5ff'});;

		  if (question.answer && question.answer.id == answer.id) {
			  $div.addClass('answered');
		  }
		
		  $('<div></div>').addClass('answer-text').text(answer.answer).appendTo($div);
		  $('#answers').append($div);
		  $div.on('click', handleSelectAnswer);
	 });
	
	toggleElements(getClassNamesToHide(question.answer), getClassNamesToShow(question.answer));
	
}
$(document).ready(() => {
	const quizz =  init();



	
    $('.hint-box').on('click', () => {
      $('.hint').slideToggle();
    });

	
	const handleSelectAnswer = function() {
		if (quizz.question.answer) {
			return;
		}
		quizz.question.answer = parseInt($(this).attr('key'));
		$(this).addClass('answered')
		toggleElements(getClassNamesToHide(quizz.question.answer), getClassNamesToShow(quizz.question.answer));
	};
	['next', 'prev'].forEach((func) => {
		$(`.${func}`).on('click', () => {
			const currentQuestionId = quizz.question.id;
			const nextQuestionId = quizz[func]().question.id;
			if (currentQuestionId !== nextQuestionId)  {
				printQuestion(quizz.question, handleSelectAnswer);
			}
		});
	});	
	$('.reset').on('click', () => {
		quizz.question.reset();
		printQuestion(quizz.question, handleSelectAnswer);
	});
	printQuestion(quizz.question, handleSelectAnswer);
});