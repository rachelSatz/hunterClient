import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

0
@Injectable()
export class BreadcrumbsService {
    breadcrumbsSubject = new Subject<{ link: string, label: string }[]>();

    setBreadcrumbs(breadcrumbs: { link: string, label: string }[]): void {
        this.breadcrumbsSubject.next(breadcrumbs);
    }
}