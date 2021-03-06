import {Newable} from '../reflection';
import {Container, ServiceRequest} from './interfaces';
import {Injection} from './resolvers';

export interface NewableFactory<T> extends Newable<Factory<T>> {
  container: Container;
}

/**
 * Base class for factories.
 */
export abstract class Factory<T> {
  public static container: Container;

  protected inject: ServiceRequest<any>[];

  public constructor(...inject: ServiceRequest<any>[]) {
    this.inject = inject;
  }

  protected resolve(fn: (...args: any[]) => T) {
    const constructor = this.constructor as typeof Factory;
    return constructor.container.resolve<T>(Injection.of(fn, this.inject));
  }

  /**
   * Create an instance of T given a list of arguments.
   */
  public abstract create(...args: any[]): T;
}

export abstract class AsyncFactory<T> extends Factory<Promise<T>> {}
