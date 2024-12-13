import { CodeRunnerError, CodeRunnerSuccess } from './codeRunnerFakeApi.types';
import { delay } from '~/utils/delay';

export const runCode = async (code: string, language: string, isError: boolean) => {
  // eslint-disable-next-line no-console
  console.log('runCodeFakeApi =>', 'language: ', language, '| isError: ', isError, '| code: ', code || 'empty code');

  await delay(1000);
  if (isError) {
    const error: CodeRunnerError = {
      status: 'error',
      error: 'SyntaxError: Unexpected token',
    };

    return error;
  }

  const successData: CodeRunnerSuccess = {
    status: 'success',
    output: 'Hello, world!\n',
  };

  return successData;
};
