# Structure

- index.js : main function that simple test in here

- aop.js : aop functionality in here

# Usage

- Aop.before(
        pointcut: function_name(string) that want to calling,
        advice: want to attach function, like logger function,
        namespaes: array of object that include pointcut function
        );

ex) Aop.before('in_target_fn', logger_function, [target_obj]);

- Aop.after : same to Aop.before





