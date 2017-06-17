var Aop = require('./aop.js');

var target = {
	counter: 0,
	targetFn: function(count) {
		this.counter = count + this.counter;
	}
};

var advice = function() {
	console.log("hello! " + this.counter);
};

Aop.before('targetFn', advice, [target])
// namespace를 제공할때, 배열로 넘겨야됨..ㅠ
Aop.after('targetFn', advice, [target]);

console.log("start!");
target.targetFn(20);