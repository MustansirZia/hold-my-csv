export type ConfigValues = {
    DATABASE_URI: string;
};

export interface Config {
    get(): ConfigValues;
}
