/**
 * @license Copyright (c) 2010-2011 Brian Cavalier
 * LICENSE: see the LICENSE.txt file. If file is missing, this file is subject
 * to the MIT License at: http://www.opensource.org/licenses/mit-license.php.
 */

/*
	Package: debug.js
	wire plugin that logs timing and debug information about wiring context and object
	lifecycle events (e.g. creation, properties set, initialized, etc.).
*/
define([], function() {
	var timer = createTimer();

	/*
		Function: time
		Builds a string with timing info and a message for debug output

		Params:
			text - String message
			contextTimer - per-context timer information
		
		Returns:
		A formatted string for output
	*/
	function time(text, contextTimer) {
		var all = timer(),
			timing = "(total: " + 
				(contextTimer
					? all.total + "ms, context: " + contextTimer()
					: all)
				+ "): ";
		return "DEBUG " + timing + text;
	}

	/*
		Function: createTimer
		Creates a timer function that, when called, returns an object containing
		the total elapsed time since the timer was created, and the split time
		since the last time the timer was called.  All times in milliseconds

		Returns:
		Timer function
	*/
	function createTimer() {
		var start = new Date().getTime(),
			split = start;

		/*
			Function: getTime
			Returns the total elapsed time since this timer was created, and the
			split time since this getTime was last called.

			Returns:
			Object containing total and split times in milliseconds, plus a
			toString() function that is useful in logging the time.
		*/
		return function getTime() {
			var now = new Date().getTime(),
				total = now - start,
				splitTime = now - split;
			split = now;

			return {
				total: total,
				split: splitTime,
				toString: function() {
					return '' + splitTime + 'ms / ' + total + 'ms';
				}
			};
		};
	}
	
	function logError(err, message) {
		console.error(time("Context ERROR: " + message));
		console.error(err);
	}
	
	/*
		Function: logProgress
		Logs progress info to the console
		
		Parameters:
			progress - progress Object with status, target, and spec
				- target - Object - object whose status is being reported
				- status - String - current status of object
				- spec - Any - wiring spec
	*/
	function logProgress(update, contextTimer) {
		function logUpdate(message) {
			return function(target) {
				console.log(time(message, contextTimer), target, update.spec);		
			};
		}

		function logError(message) {
			return function(err) {
				console.error(time(message, contextTimer), err, update.spec);
				console.error(err);
			};
		}
		
		update.created.then(logUpdate('Object created'), logError('Object create ERROR'));
		update.configured.then(logUpdate('Object configured'), logError('Object configure ERROR'));
		update.initialized.then(logUpdate('Object initialized'), logError('Object initialize ERROR'));
		update.destroyed.then(logUpdate('Object destroyed'), logError('Object destroy ERROR'));
	}

	return {
		/*
			Function: wire$wire
			Invoked when wiring starts and provides two promises: one for wiring the context,
			and one for destroying the context.  Plugins should register resolve, reject, and
			promise handlers as necessary to do their work.
			
			Parameters:
				ready - promise that will be resolved when the context has been wired, rejected
					if there is an error during the wiring process, and will receive progress
					events for object creation, property setting, and initialization.
				destroy - promise that will be resolved when the context has been destroyed,
					rejected if there is an error while destroying the context, and will
					receive progress events for objects being destroyed.
		*/
		wire$plugin: function debugPlugin(ready, destroyed, options) {
			var contextTimer = createTimer();
			
			function contextTime(msg) {
				return time(msg, contextTimer);
			}
			
			function logContextProgress(progress) {
				logProgress(progress, contextTimer);
			}
			
			console.log(contextTime("Context init"));
			
			ready.then(
				function onContextReady(context) {
					console.log(contextTime("Context ready"), context);
				},
				function onContextError(err) {
					console.error(contextTime("Context ERROR: "), err);
					console.error(err);
				},
				logContextProgress
			);
			
			destroyed.then(
				function onContextDestroyed() {
					console.log(contextTime("Context destroyed"));
				},
				function onContextDestroyError(err) {
					console.error(contextTime("Context destroy ERROR"), err);
				}
			);

			// Debug plugin doesn't provide any additional functionality,
			// so doesn't need to return anything
		}
	};

});