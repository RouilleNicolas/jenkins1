/**
 * The execution mode of the filter.
 * 
 * - `immediate`: The filter is registered and executed automatically and immediately.
 * - `deferred`: The filter is registered automatically but execution will be deferred until the user explicitly triggers it.
 * - `manual`: The filter is not registered nor executed automatically. The user has to manually register and execute it.	
 */
export type FilterExecutionMode = 'immediate' | 'deferred' | 'manual';