import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './App.module.scss';
import { CodeEditor } from '~/features/CodeEditor';
import { CodeEditorLanguage, codeEditorLanguageList, CodeEditorTheme } from '~/features/CodeEditor/CodeEditor.types';
import { Button } from '~/ui/Button';
import { SelectOption } from '~/ui/Select/Select.types';
import { Select } from '~/ui/Select';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { codeRunnerSlice } from '~/store/codeRunner';

const languageOptionList: SelectOption<CodeEditorLanguage>[] = codeEditorLanguageList.map((lang) => ({
  value: lang,
  label: lang,
}));

export function App() {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState<CodeEditorTheme>('light');
  const [lang, setLang] = useState<CodeEditorLanguage>('javascript');
  const code = useRef<string>('');
  const codeRunnerRequest = useAppSelector((state) => state.codeRunner.codeRunRequest);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') {
        return 'vs-dark';
      }
      return 'light';
    });
  };

  console.log('rerender');

  const handleChangeCode = useCallback((value: string) => {
    code.current = value;
  }, []);

  const handleCodeRun = () => {
    dispatch(codeRunnerSlice.thunks.fetchCommentsThunk({ code: code.current, language: lang, isError: false }));
  };

  const handleCodeRunWithError = () => {
    dispatch(codeRunnerSlice.thunks.fetchCommentsThunk({ code: code.current, language: lang, isError: true }));
  };

  const handleRunCodeResultClear = () => {
    dispatch(codeRunnerSlice.actions.clear());
  };

  return (
    <>
      <div className={styles.App}>
        <div className={classNames(styles.block, styles.editorOptions)}>
          <Button onClick={handleToggleTheme} disabled={codeRunnerRequest.isLoading}>
            Theme: {theme}
          </Button>
          <Select<CodeEditorLanguage>
            options={languageOptionList}
            value={lang}
            onChange={(val) => setLang(val)}
            labelPrefix={'language'}
            disabled={codeRunnerRequest.isLoading}
          />
        </div>
        <div className={styles.block}>
          <CodeEditor
            theme={theme}
            language={lang}
            onChange={handleChangeCode}
            disabled={codeRunnerRequest.isLoading}
          />
        </div>
        <div className={classNames(styles.block, styles.editorOptions)}>
          <Button onClick={handleCodeRun} disabled={codeRunnerRequest.isLoading}>
            Run code
          </Button>
          <Button onClick={handleCodeRunWithError} disabled={codeRunnerRequest.isLoading}>
            Run code with error
          </Button>
          <Button onClick={handleRunCodeResultClear} disabled={codeRunnerRequest.isLoading}>
            Run code result clear
          </Button>
        </div>
        {codeRunnerRequest.data && (
          <div className={classNames(styles.codeRunResultBlock, styles.codeRunSuccess)}>{codeRunnerRequest.data}</div>
        )}
        {codeRunnerRequest.error && (
          <div className={classNames(styles.codeRunResultBlock, styles.codeRunError)}>{codeRunnerRequest.error}</div>
        )}
        {codeRunnerRequest.isLoading && (
          <div className={classNames(styles.codeRunResultBlock, styles.codeIsRunning)}>code is running...</div>
        )}
      </div>
    </>
  );
}
