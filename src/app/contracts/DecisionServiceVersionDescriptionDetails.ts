export class InputData {
    BusinessDataId: number;
    Version: number;
    Name: string;
    Type: string;
    Question: string;
    Properties: InputDataProperty[];
}

export class InputDataProperty {
    Name: string;
    Value: string;
}

export class ListData {
    ListId: number;
    Items: string[];
}

export class PairData {
    PairId: number;
    ValueForTrue: string;
    ValueForFalse: string;
}
