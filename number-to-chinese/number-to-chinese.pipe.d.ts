import { PipeTransform } from '@angular/core';
/**
 *  @deprecated Will be removed in 12.0.0, Pls used [cny](/util/pipes-currency/zh#cny) pipe instead
 */
export declare class NaNumberToChinesePipe implements PipeTransform {
    transform(value: number | string, rmb?: boolean, minusSymbol?: string): string;
}
