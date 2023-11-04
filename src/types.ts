export interface Example {
    id: number;
    example: string;
}

export interface Word {
    id: number;
    word: string;
    date_added: string;
    translation?: string;
    source?: string;
    examples: Example[];
}
