// Interface that extends on the action type
import { AnyAction } from 'redux';

// Here, matchable is an extension on action creator
// that will attach to every action creator a match property.
// It'll reach into the AC and get the return type action(value)

// Matchable will take an AC(action creator) which is some function
// that return any action. AnyAction can have a type that is a string
// or something else. So it can have any number of fields.
// So this matchable is AC type and intersects with another type
//
type Matchable<AC extends () => AnyAction> = AC & {
	// Here we get the return type of AC, hence the action it's self
	// and of that value we get the type from relevant prop.
	type: ReturnType<AC>['type'];
	// Match method receives an action, and will narrow the type down,
	// and compare it with the action type. Action is here of the return
	// type of AC.
	match(action: AnyAction): action is ReturnType<AC>;
};

/** TYPE OVERLOADING FOR FUNCTION */

// withMatcher is a utility function that receives some actionCreator function
// and creates new matchable type out of that action creator.
export function withMatcher<AC extends () => AnyAction & { type: string }>(
	actionCreator: AC
): Matchable<AC>;

// For when AC is with some payload. With elipses we accumulate props
// as array.
export function withMatcher<
	AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// The actual withMatcher function that receives AC function
export function withMatcher(actionCreator: Function) {
	const type = actionCreator().type;
	// Creates a mappable object that will attach
	// on the actionCreator that will give it
	// the value and match fn.
	return Object.assign(actionCreator, {
		type,
		match(action: AnyAction) {
			return action.type === type;
		},
	});
}

export type ActionWithPayload<T, P> = {
	type: T;
	payload: P;
};

export type Action<T> = {
	type: T;
};

// Function overloading provides ability to make multiple function type
// definition of the same name. Allows function to receive multiple param types.
// Below is an example, where implementation is shown with two possible params

export function createAction<T extends string, P>(
	type: T,
	payload: P
): ActionWithPayload<T, P>;

// Overload functions should have identical types, if one param is not expected
// use void for that type
export function createAction<T extends string>(
	type: T,
	payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
	return { type, payload };
}
