/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { createRootMachine } from '../state/state.machine';
import { InterpreterFrom } from 'xstate';

export const AppStateContext = createContext({
	rootService: {} as InterpreterFrom<typeof rootMachine>,
});
const rootMachine = createRootMachine();

export const AppStateProvider = (props) => {
	const rootService = useInterpret(rootMachine, {
		devTools: true,
	}).onTransition((state) => console.log(state.value));

	return (
		<AppStateContext.Provider value={{ rootService }}>
			{props.children}
		</AppStateContext.Provider>
	);
};
