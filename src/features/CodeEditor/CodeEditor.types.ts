export type CodeEditorTheme = 'light' | 'vs-dark';

export const codeEditorLanguageList = ['javascript', 'typescript'] as const satisfies string[];

export type CodeEditorLanguage = typeof codeEditorLanguageList extends (infer P)[] ? P : never;
