import MonacoEditor from '@monaco-editor/react';
import { memo } from 'react';
import classNames from 'classnames';
import styles from './CodeEditor.module.scss';
import { CodeEditorLanguage, CodeEditorTheme } from './CodeEditor.types';

interface EditorProps {
  theme: CodeEditorTheme;
  language: CodeEditorLanguage;
  onChange: (value: string) => void;
  disabled?: boolean;
}
function CodeEditorComponent({ theme, language, onChange, disabled = false }: EditorProps) {
  return (
    <>
      <MonacoEditor
        language={language}
        onChange={(value) => onChange(value ?? '')}
        className={classNames(styles.monacoEditor, disabled && styles.disabled)}
        theme={theme}
        options={{
          padding: {
            top: 20,
            bottom: 20,
          },
          readOnly: disabled,
        }}
      />
    </>
  );
}

export const CodeEditor = memo(CodeEditorComponent);
