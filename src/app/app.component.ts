import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartMediatorService } from './core/cart-mediator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private cartMediator: CartMediatorService) {}

  ngOnInit() {
    this.cartMediator.init();
  }
}
