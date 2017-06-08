import { InputData } from './DecisionServiceVersionDescriptionDetails';
import { ListData } from './DecisionServiceVersionDescriptionDetails';
import { PairData } from './DecisionServiceVersionDescriptionDetails';

export class DecisionServiceVersionDescription {
    DecisionServiceId: number;
    Name: string;
    DecisionServiceVersionId: number;
    VersionNumber: number;
    InputData: InputData[];
    OutputData: InputData[];
    TraceData: InputData[];
    MetaData: InputData[];
    PairData: PairData[];
    ListData: ListData[];
}
