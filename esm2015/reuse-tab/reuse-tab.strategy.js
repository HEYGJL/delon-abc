export class ReuseTabStrategy {
    constructor(srv) {
        this.srv = srv;
    }
    shouldDetach(route) {
        return this.srv.shouldDetach(route);
    }
    store(route, handle) {
        this.srv.store(route, handle);
    }
    shouldAttach(route) {
        return this.srv.shouldAttach(route);
    }
    retrieve(route) {
        return this.srv.retrieve(route);
    }
    shouldReuseRoute(future, curr) {
        return this.srv.shouldReuseRoute(future, curr);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV1c2UtdGFiLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL3JldXNlLXRhYi9yZXVzZS10YWIuc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUFvQixHQUFvQjtRQUFwQixRQUFHLEdBQUgsR0FBRyxDQUFpQjtJQUFHLENBQUM7SUFFNUMsWUFBWSxDQUFDLEtBQTZCO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNELEtBQUssQ0FBQyxLQUE2QixFQUFFLE1BQVU7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxZQUFZLENBQUMsS0FBNkI7UUFDeEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQTZCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELGdCQUFnQixDQUFDLE1BQThCLEVBQUUsSUFBNEI7UUFDM0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZVJldXNlU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUmV1c2VUYWJTZXJ2aWNlIH0gZnJvbSAnLi9yZXVzZS10YWIuc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBSZXVzZVRhYlN0cmF0ZWd5IGltcGxlbWVudHMgUm91dGVSZXVzZVN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzcnY6IFJldXNlVGFiU2VydmljZSkge31cblxuICBzaG91bGREZXRhY2gocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zcnYuc2hvdWxkRGV0YWNoKHJvdXRlKTtcbiAgfVxuICBzdG9yZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgaGFuZGxlOiB7fSk6IHZvaWQge1xuICAgIHRoaXMuc3J2LnN0b3JlKHJvdXRlLCBoYW5kbGUpO1xuICB9XG4gIHNob3VsZEF0dGFjaChyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNydi5zaG91bGRBdHRhY2gocm91dGUpO1xuICB9XG4gIHJldHJpZXZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KToge30gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5zcnYucmV0cmlldmUocm91dGUpO1xuICB9XG4gIHNob3VsZFJldXNlUm91dGUoZnV0dXJlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBjdXJyOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3J2LnNob3VsZFJldXNlUm91dGUoZnV0dXJlLCBjdXJyKTtcbiAgfVxufVxuIl19