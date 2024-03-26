const useEnvVariables = (envVariableName: string): string => {
	if (!process.env[envVariableName]) {
		throw Error(`${envVariableName} not found !`);
	}

	return process.env[envVariableName]!;
};

export default useEnvVariables;
