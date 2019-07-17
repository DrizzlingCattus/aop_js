var Aop = {};

Aop.around = function(pointcut, advice, namespaces) {
	var isArounded = false;
	if(namespaces === undefined || namespaces.length === 0) {
		namespaces = [(function() {return this;}).call()];
	}
	
	// 이름공간을 전부 순회한다.
	for(var i in namespaces) {
		var ns = namespaces[i];
		for(var member in ns) {
			if(typeof ns[member] === 'function' && member.match(pointcut)) {
				(function(fn, fnName, ns) {
					// member의 fn 슬롯을 'advice' 함수를 호출하는 래퍼로 교체한다.
					ns[fnName] = function() {
						return advice.call(this, {fn: fn,
												 fnName: fnName,
												 arguments: arguments});
					};
				})(ns[member], member, ns);
				isArounded = true;
			}
		}
	}
	return isArounded;
};

Aop.next = function(f) {
	return f.fn.apply(this, f.arguments);
};

Aop.before = function(pointcut, advice, namespaces) {
	Aop.around(pointcut,
			  function(f) {
					advice.apply(this, f.arguments);
					return Aop.next.call(this, f);
			  },
			  namespaces);
};

Aop.after = function(pointcut, advice, namespaces) {
	Aop.around(pointcut,
			  function(f) {
					var ret = Aop.next.call(this, f);
					advice.apply(this, f.arguments);
					return ret;
			  },
			  namespaces);
};

module.exports = Aop;