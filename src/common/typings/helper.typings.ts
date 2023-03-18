
export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export type ChangeFields<T, R> = Omit<T, keyof R> & R;

