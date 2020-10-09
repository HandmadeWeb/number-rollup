import getTargets from "./get-targets";
import draw from "./draw";

export default (userOptions) => {
	const targets = getTargets(userOptions);
	targets.forEach((target) => {
		runForSingleTarget(target);
	});
};

const runForSingleTarget = (target) => {
	let currentNumber = target.startNumber;
	let lastIntegerWritten = 0;
	let lastRunTime = performance.now();

	const run = () => {
		const millisecondsElapsed = performance.now() - lastRunTime;

		if (millisecondsElapsed > 0) {
			currentNumber = getNewNumber(target.incrementPerMillisecond, millisecondsElapsed, currentNumber);
			const currentNumberRounded = Math.floor(currentNumber);

			if (currentNumberRounded != lastIntegerWritten) {
				draw(target, currentNumberRounded);
				lastIntegerWritten = currentNumberRounded;
			}
		}

		if (shouldAnimationContinue(currentNumber, target.direction, target.endNumber)) {
			lastRunTime = performance.now();
			requestAnimationFrame(run);
		}
	};

	run();
};

const getNewNumber = (incrementPerMillisecond, millisecondsElapsed, existingNumber) => {
	const numberToIncrement = incrementPerMillisecond * millisecondsElapsed;
	const newNumber = existingNumber + numberToIncrement;

	return newNumber;
};

const shouldAnimationContinue = (currentNumber, direction, endNumber) => {
	if (direction === "ascending") {
		return currentNumber < endNumber;
	} else {
		return currentNumber > endNumber;
	}
};

/**
 * Path: file:///C:/Work/number-rollup/test/index.html
 *
 * Note: we could pretty easily implement easing in/out using the formulas
 * presented here: http://gizma.com/easing/
 * It would involve changing the getNewNumer() function and, instead of
 * passing it a msElapsedSinceLastRun, we'd pass it a msElaspsedSinceStart.
 * The easing functions return the value we need for the current run.
 */