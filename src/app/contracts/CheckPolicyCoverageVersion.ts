import {InputData} from './InputData';
// import {ListData} from './ListData';
import {PairData} from './PairData';

export class CheckPolicyCoverageVersion {
    DecisionServiceId: number;
    DecisionServiceVersionId: number;
    InputData: InputData[];
    ListData: { [id: number]: string[] };
    Name: string;
    // outputData
    PairData: PairData[];
    // traceData
    VersionNumber: number;
}