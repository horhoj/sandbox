export type CodeRunnerSuccess = {
  status: 'success';
  output: string;
};

export type CodeRunnerError = {
  status: 'error';
  error: string;
};

// export const codeRunnerErrorTypeGuard = (data: unknown): data is CodeRunnerError => {
//   try {
//     const errorObj = JSON.parse(String(data)) as unknown;
//     if ((errorObj as CodeRunnerError)?.status === 'error') {
//       return true;
//     }
//     return false;
//   } catch {
//     return false;
//   }
// };
