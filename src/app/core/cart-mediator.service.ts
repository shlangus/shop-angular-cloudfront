import { Injectable, Injector } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ApiService } from './api.service';
import { pluck, map, switchMap, catchError, skipUntil } from 'rxjs/operators';
import { Product } from '../products/product.interface';
import { ProductsService } from '../products/products.service';
import { EMPTY, Subject } from 'rxjs';

interface CartItem {
  product: Product;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartMediatorService extends ApiService {
  private cartLoaded$ = new Subject();

  constructor(
    protected injector: Injector,
    private cartService: CartService,
    private productsService: ProductsService
  ) {
    super(injector);
  }

  public init() {
    this.cartService.cart$
      .pipe(
        skipUntil(this.cartLoaded$),
        switchMap((cart: Record<string, number>) =>
          this.productsService.getProducts().pipe(
            map((products) => this.cartToCartItems(cart, products)),
            catchError(() => EMPTY)
          )
        ),
        switchMap((cartItems) => this.syncCart(cartItems))
      )
      .subscribe(() => {});

    this.loadCart();
  }

  private loadCart() {
    const url = this.getUrl('cart', '');
    this.http
      .get<{ data: { cart: { items: CartItem[] } } }>(url)
      .pipe(
        pluck('data', 'cart', 'items'),
        map((items) =>
          items.reduce((result, { product, count }) => {
            result[product.id] = count;
            return result;
          }, {} as Record<string, number>)
        )
      )
      .subscribe((products) => {
        this.cartService.set(products);
        this.cartLoaded$.next();
      });
  }

  private syncCart(items: CartItem[]) {
    const url = this.getUrl('cart', '');
    return this.http.put(url, { items });
  }

  private cartToCartItems(
    cart: Record<string, number>,
    products: Product[]
  ): CartItem[] {
    return Object.entries(cart).reduce((result, [id, count]) => {
      // I don't usually do it this way, I swear!
      const foundProduct = products.find((product) => product.id === id);

      if (foundProduct) {
        result.push({ product: foundProduct, count });
      }

      return result;
    }, [] as CartItem[]);
  }
}
