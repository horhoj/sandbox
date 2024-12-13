import { useMemo } from 'react';
import styles from './Select.module.scss';
import { SelectOption } from './Select.types';
import { getUUID } from '~/utils/getUUID';

interface SelectProps<T extends string = string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  labelPrefix: string;
  disabled?: boolean;
}
export function Select<T extends string = string>({
  onChange,
  options,
  value,
  labelPrefix,
  disabled = false,
}: SelectProps<T>) {
  const actualOptions = useMemo(() => options.map((el) => ({ id: getUUID(), ...el })), [options]);

  return (
    <select className={styles.Select} onChange={(e) => onChange(e.target.value as T)} value={value} disabled={disabled}>
      {actualOptions.map((el) => (
        <option value={el.value} key={el.id}>
          {`${labelPrefix}: ${el.label}`}
        </option>
      ))}
    </select>
  );
}
