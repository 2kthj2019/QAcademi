interface SearchOptions {
    query?: string;
    filter?: string;
    fields?: string[];
    sort?: string[];
    start?: number;
    rows?: number;
}

export { SearchOptions };