export class GetResult<T> {
    constructor(
        public values: T[] = [],
        public pageIndex: number = 0,
        public pageSize: number = 0,
        public totalCount: number = 0
    ){}
}