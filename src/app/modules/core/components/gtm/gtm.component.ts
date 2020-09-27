import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '@environment/environment';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { SubSink } from 'subsink';

declare let gtag: Function;

@Component({
  selector: 'app-gtm',
  template: '',
})
export class GTMComponent implements OnInit, OnDestroy {
  private subscriptions = new SubSink();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private readonly renderer: Renderer2,
    private router: Router
  ) {
    if (isPlatformBrowser(platformId)) {
      const head = document.getElementsByTagName('head')[0];

      const script = renderer.createElement('script') as HTMLScriptElement;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.GtmTrackingId}`;
      script.async = true;

      const script2 = renderer.createElement('script') as HTMLScriptElement;
      const scriptBody = renderer.createText(
        `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `
      );

      renderer.appendChild(head, script);
      renderer.appendChild(script2, scriptBody);
      renderer.appendChild(head, script2);

      this.subscriptions.sink = this.router.events
        .pipe(filter((value) => value instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          gtag('config', environment.GtmTrackingId, {
            page_path: event.urlAfterRedirects,
          });
        });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
