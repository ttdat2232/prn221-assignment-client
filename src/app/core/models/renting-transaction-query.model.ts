export class RentingTransactionQuery {
    constructor(public userId: number, public transactionId: number) {}

    static extractDataFromUrl(url: string): RentingTransactionQuery{
        let params = url.substring(url.indexOf('?') + 1);
        let keyValue = params.split('&');
        let userId = Number.parseInt(keyValue[0].split('=')[1])
        let transactionId = Number.parseInt(keyValue[1].split('=')[1])
        return new RentingTransactionQuery(userId, transactionId);
      }
}