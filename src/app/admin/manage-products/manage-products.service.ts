import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(injector: Injector, private auth: AuthService) {
    super(injector);
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      switchMap((url) =>
        this.http.put(url, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv',
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<string> {
    const url = this.getUrl('import', 'import');

    const token = this.auth.getToken();

    return this.http.get<string>(url, {
      ...(token && {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${token}`,
        },
      }),
      params: {
        name: fileName,
      },
    });
  }
}
