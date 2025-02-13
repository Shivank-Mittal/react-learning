export default interface IClientService {
    databaseOperationHandler<T>(operation: () => Promise<T>, errorMessage: string): Promise<T>;
}