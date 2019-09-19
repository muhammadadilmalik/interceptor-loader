import { BehaviorSubject } from "rxjs";

export class loaderService {
    public isLoading = new BehaviorSubject(false);
}