export class Validation {
    static isAdmin(): boolean {
        let isAdmin = localStorage.getItem('isAdmin');
        if(!isAdmin)
            return false;
        return isAdmin == 'true';
    }
}