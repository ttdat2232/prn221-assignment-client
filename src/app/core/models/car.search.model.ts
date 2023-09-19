export class CarSearch {
    constructor(
        private pageIndex: number = 0,
        private pageSize: number = 4,
        private name: string = "",
        private statuses: number[] = []
    ) {}
    

    toQueries() : string {
        let queries: string = "";
        let isFirst = true;
        for(const [key, value] of Object.entries(this)) {
            if(value) {
                if(isFirst) {
                    queries = queries + "?";
                    isFirst = !isFirst;
                }
                if(Array.isArray(value)) {
                    value.forEach(element => {
                        queries += `${key}=${element}&`;
                    });
                } else {
                    queries += `${key}=${value}&`;
                }
            }
        }
        return queries.substring(0, queries.length - 1);
    }
}